var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// .svelte-kit/netlify/entry.js
__export(exports, {
  handler: () => handler
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var { Readable } = import_stream.default;
var wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
var Blob = class {
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const { size } = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob([], { type: String(type).toLowerCase() });
    Object.assign(wm.get(blob), { size: span, parts: blobParts });
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
var fetchBlob = Blob;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (err) => {
        const error3 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error3;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new fetchBlob([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true }
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error3) {
    if (error3 instanceof FetchBaseError) {
      throw error3;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error3.message}`, "system", error3);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error3) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error3.message}`, "system", error3);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({ highWaterMark });
    p2 = new import_stream.PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw err;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_CHAR" });
    throw err;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name of this.keys()) {
      callback(this.get(name), name);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = { enumerable: true };
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response2 = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status || 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response2(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response2(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response2.prototype, {
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch2(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = src(request.url);
      const response2 = new Response2(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error3 = new AbortError("The operation was aborted.");
      reject(error3);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error3);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error3);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error3) {
                reject(error3);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch2(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
        reject(error3);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error3) => {
          reject(error3);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
          reject(error3);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error3) => {
              reject(error3);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error3) => {
              reject(error3);
            });
          }
          response = new Response2(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error3) => {
          reject(error3);
        });
        response = new Response2(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response2(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
globalThis.fetch = fetch2;
globalThis.Response = Response2;
globalThis.Request = Request;
globalThis.Headers = Headers;

// node_modules/@sveltejs/kit/dist/ssr.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  options: options2,
  $session,
  page_config,
  status,
  error: error3,
  branch,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error3) {
    error3.stack = options2.get_stack(error3);
  }
  if (branch) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error4) => {
      throw new Error(`Failed to serialize session data: ${error4.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error3)},
					nodes: [
						${branch.map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page.path)},
						query: new URLSearchParams(${s$1(page.query.toString())}),
						params: ${s$1(page.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    return body2 ? `<script type="svelte-data" url="${url}" body="${hash(body2)}">${json}<\/script>` : `<script type="svelte-data" url="${url}">${json}<\/script>`;
  }).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error3) {
  if (!error3)
    return null;
  let serialized = try_serialize(error3);
  if (!serialized) {
    const { name, message, stack } = error3;
    serialized = try_serialize({ name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  if (loaded.error) {
    const error3 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    const status = loaded.status;
    if (!(error3 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error3}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error3 };
    }
    return { status, error: error3 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
function resolve(base, path) {
  const baseparts = path[0] === "/" ? [] : base.slice(1).split("/");
  const pathparts = path[0] === "/" ? path.slice(1).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  return `/${baseparts.join("/")}`;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  is_leaf,
  is_error,
  status,
  error: error3
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  if (module2.load) {
    const load_input = {
      page,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        if (options2.read && url.startsWith(options2.paths.assets)) {
          url = url.replace(options2.paths.assets, "");
        }
        if (url.startsWith("//")) {
          throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
        }
        let response;
        if (/^[a-zA-Z]+:/.test(url)) {
          response = await fetch(url, opts);
        } else {
          const [path, search] = url.split("?");
          const resolved = resolve(request.path, path);
          const filename = resolved.slice(1);
          const filename_html = `${filename}/index.html`;
          const asset = options2.manifest.assets.find((d2) => d2.file === filename || d2.file === filename_html);
          if (asset) {
            if (options2.read) {
              response = new Response(options2.read(asset.file), {
                headers: {
                  "content-type": asset.type
                }
              });
            } else {
              response = await fetch(`http://${page.host}/${asset.file}`, opts);
            }
          }
          if (!response) {
            const headers = { ...opts.headers };
            if (opts.credentials !== "omit") {
              uses_credentials = true;
              headers.cookie = request.headers.cookie;
              if (!headers.authorization) {
                headers.authorization = request.headers.authorization;
              }
            }
            if (opts.body && typeof opts.body !== "string") {
              throw new Error("Request body must be a string");
            }
            const rendered = await respond({
              host: request.host,
              method: opts.method || "GET",
              headers,
              path: resolved,
              rawBody: opts.body,
              query: new URLSearchParams(search)
            }, options2, {
              fetched: url,
              initiator: route
            });
            if (rendered) {
              if (state.prerender) {
                state.prerender.dependencies.set(resolved, rendered);
              }
              response = new Response(rendered.body, {
                status: rendered.status,
                headers: rendered.headers
              });
            }
          }
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: { ...context }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error3;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error3 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded.context,
      is_leaf: false,
      is_error: true,
      status,
      error: error3
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error3,
      branch,
      page
    });
  } catch (error4) {
    options2.handle_error(error4);
    return {
      status: 500,
      headers: {},
      body: error4.stack
    };
  }
}
async function respond$1({ request, options: options2, state, $session, route }) {
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id && options2.load_component(id)));
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  const page_config = {
    ssr: "ssr" in leaf ? leaf.ssr : options2.ssr,
    router: "router" in leaf ? leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? leaf.hydrate : options2.hydrate
  };
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: null
    };
  }
  let branch;
  let status = 200;
  let error3;
  ssr:
    if (page_config.ssr) {
      let context = {};
      branch = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              request,
              options: options2,
              state,
              route,
              page,
              node,
              $session,
              context,
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({ status, error: error3 } = loaded.loaded);
            }
          } catch (e) {
            options2.handle_error(e);
            status = 500;
            error3 = e;
          }
          if (error3) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let error_loaded;
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  error_loaded = await load_node({
                    request,
                    options: options2,
                    state,
                    route,
                    page,
                    node: error_node,
                    $session,
                    context: node_loaded.context,
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error3
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (e) {
                  options2.handle_error(e);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error3
            });
          }
        }
        branch.push(loaded);
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      options: options2,
      $session,
      page_config,
      status,
      error: error3,
      branch: branch && branch.filter(Boolean),
      page
    });
  } catch (error4) {
    options2.handle_error(error4);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
}
async function render_page(request, route, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options2.hooks.getSession(request);
  if (route) {
    const response = await respond$1({
      request,
      options: options2,
      state,
      $session,
      route
    });
    if (response) {
      return response;
    }
    if (state.fetched) {
      return {
        status: 500,
        headers: {},
        body: `Bad request in load function: failed to fetch ${state.fetched}`
      };
    }
  } else {
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 404,
      error: new Error(`Not found: ${request.path}`)
    });
  }
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler2 = mod[request.method.toLowerCase().replace("delete", "del")];
  if (handler2) {
    const match = route.pattern.exec(request.path);
    const params = route.params(match);
    const response = await handler2({ ...request, params });
    if (response) {
      if (typeof response !== "object") {
        return error(`Invalid response from route ${request.path}: expected an object, got ${typeof response}`);
      }
      let { status = 200, body, headers = {} } = response;
      headers = lowercase_keys(headers);
      const type = headers["content-type"];
      if (type === "application/octet-stream" && !(body instanceof Uint8Array)) {
        return error(`Invalid response from route ${request.path}: body must be an instance of Uint8Array if content type is application/octet-stream`);
      }
      if (body instanceof Uint8Array && type !== "application/octet-stream") {
        return error(`Invalid response from route ${request.path}: Uint8Array body must be accompanied by content-type: application/octet-stream header`);
      }
      let normalized_body;
      if (typeof body === "object" && (!type || type === "application/json")) {
        headers = { ...headers, "content-type": "application/json" };
        normalized_body = JSON.stringify(body);
      } else {
        normalized_body = body;
      }
      return { status, body: normalized_body, headers };
    }
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        map.get(key).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  #map;
  constructor(map) {
    this.#map = map;
  }
  get(key) {
    const value = this.#map.get(key);
    return value && value[0];
  }
  getAll(key) {
    return this.#map.get(key);
  }
  has(key) {
    return this.#map.has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield key;
      }
    }
  }
  *values() {
    for (const [, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield value;
      }
    }
  }
};
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const [type, ...directives] = headers["content-type"].split(/;\s*/);
  if (typeof raw === "string") {
    switch (type) {
      case "text/plain":
        return raw;
      case "application/json":
        return JSON.parse(raw);
      case "application/x-www-form-urlencoded":
        return get_urlencoded(raw);
      case "multipart/form-data": {
        const boundary = directives.find((directive) => directive.startsWith("boundary="));
        if (!boundary)
          throw new Error("Missing boundary");
        return get_multipart(raw, boundary.slice("boundary=".length));
      }
      default:
        throw new Error(`Invalid Content-Type ${type}`);
    }
  }
  return raw;
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  const nope = () => {
    throw new Error("Malformed form data");
  };
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    nope();
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          nope();
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      nope();
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !incoming.path.split("/").pop().includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: encodeURI(path + (q ? `?${q}` : ""))
        }
      };
    }
  }
  try {
    const headers = lowercase_keys(incoming.headers);
    return await options2.hooks.handle({
      request: {
        ...incoming,
        headers,
        body: parse_body(incoming.rawBody, headers),
        params: null,
        locals: {}
      },
      resolve: async (request) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            error: null,
            branch: [],
            page: null
          });
        }
        for (const route of options2.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body)}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: null
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        return await render_page(request, null, options2, state);
      }
    });
  } catch (e) {
    options2.handle_error(e);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}

// node_modules/svelte/internal/index.mjs
function noop2() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop2;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
var tasks = new Set();
var active_docs = new Set();
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
var resolved_promise = Promise.resolve();
var seen_callbacks = new Set();
var outroing = new Set();
var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : global;
var boolean_attributes = new Set([
  "allowfullscreen",
  "allowpaymentrequest",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "selected"
]);
var escaped2 = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape2(value)) : `"${value}"`}`}`;
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      const { on_mount } = this.$$;
      this.$$.on_disconnect = on_mount.map(run).filter(is_function);
      for (const key in this.$$.slotted) {
        this.appendChild(this.$$.slotted[key]);
      }
    }
    attributeChangedCallback(attr, _oldValue, newValue) {
      this[attr] = newValue;
    }
    disconnectedCallback() {
      run_all(this.$$.on_disconnect);
    }
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop2;
    }
    $on(type, callback) {
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index2 = callbacks.indexOf(callback);
        if (index2 !== -1)
          callbacks.splice(index2, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  };
}

// node_modules/svelte/store/index.mjs
var subscriber_queue2 = [];
function writable2(value, start = noop2) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue2.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue2.length; i += 2) {
            subscriber_queue2[i][0](subscriber_queue2[i + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}

// .svelte-kit/output/server/app.js
var css$6 = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title = document.title || "untitled page";
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$6);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1j55zn5"}">${navigated ? `${escape2(title)}` : ``}</div>` : ``}`;
});
function set_paths(paths) {
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body }) => '<!DOCTYPE html>\r\n<html lang="en">\r\n	<head>\r\n		<meta charset="utf-8" />\r\n		<link rel="icon" href="/favicon.png" />\r\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\r\n		' + head + '\r\n	</head>\r\n	<body>\r\n		<div id="svelte">' + body + "</div>\r\n	</body>\r\n</html>\r\n";
var options = null;
function init(settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-bf8e2876.js",
      css: ["/./_app/assets/start-a8cd1609.css"],
      js: ["/./_app/start-bf8e2876.js", "/./_app/chunks/vendor-0e1c2071.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error22) => String(error22),
    handle_error: (error22) => {
      console.error(error22.stack);
      error22.stack = options.get_stack(error22);
    },
    hooks: get_hooks(user_hooks),
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    read: settings.read,
    root: Root,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var d = decodeURIComponent;
var empty = () => ({});
var manifest = {
  assets: [{ "file": "favicon.png", "size": 56365, "type": "image/png" }, { "file": "Profile1.png", "size": 2983038, "type": "image/png" }],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/blogs\/([^/]+?)\/?$/,
      params: (m) => ({ id: d(m[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/blogs/[id].svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/bg-1\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return bg1$1;
      })
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request))
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error2;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/blogs/[id].svelte": () => Promise.resolve().then(function() {
    return _id_;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "/./_app/pages/__layout.svelte-90035815.js", "css": ["/./_app/assets/pages/__layout.svelte-7d9c3112.css"], "js": ["/./_app/pages/__layout.svelte-90035815.js", "/./_app/chunks/vendor-0e1c2071.js"], "styles": null }, ".svelte-kit/build/components/error.svelte": { "entry": "/./_app/error.svelte-58728661.js", "css": [], "js": ["/./_app/error.svelte-58728661.js", "/./_app/chunks/vendor-0e1c2071.js"], "styles": null }, "src/routes/index.svelte": { "entry": "/./_app/pages/index.svelte-00de8b98.js", "css": ["/./_app/assets/pages/index.svelte-93ac37e3.css"], "js": ["/./_app/pages/index.svelte-00de8b98.js", "/./_app/chunks/vendor-0e1c2071.js"], "styles": null }, "src/routes/blogs/[id].svelte": { "entry": "/./_app/pages/blogs/[id].svelte-87a3ff90.js", "css": ["/./_app/assets/pages/blogs/[id].svelte-543ccab8.css"], "js": ["/./_app/pages/blogs/[id].svelte-87a3ff90.js", "/./_app/chunks/vendor-0e1c2071.js"], "styles": null } };
async function load_component(file) {
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
init({ paths: { "base": "", "assets": "/." } });
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
var bg1 = "/_app/assets/bg-1.48f0c85b.png";
var bg1$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": bg1
});
var css$5 = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;900&display=swap');@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap');@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap');*{margin:0;padding:0}html,body{overflow-x:hidden}body{overflow:hidden;font-family:'Source Sans Pro';background:url('bg-1.png');background-position:center;background-repeat:no-repeat;background-size:125%;background-attachment:fixed}.glass-element{border:1px solid rgba(255, 255, 255, 0.7);background:rgba(255, 255, 255, 0.5);border-radius:1rem;backdrop-filter:blur(24px);box-shadow:0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)}@media only screen and (max-width: 768px){body{background-size:cover}}",
  map: `{"version":3,"file":"__layout.svelte","sources":["__layout.svelte"],"sourcesContent":["<script>\\r\\n\\timport { onMount } from 'svelte';\\r\\n\\tonMount(() => {\\r\\n\\t\\tif (document.documentElement.clientWidth > 768) {\\r\\n\\t\\t\\tdocument.addEventListener('mousemove', parallax);\\r\\n\\t\\t\\tfunction parallax(e) {\\r\\n\\t\\t\\t\\tconst body = document.body;\\r\\n\\t\\t\\t\\tconst x = (e.clientX * 2)/100;\\r\\n\\t\\t\\t\\tconst y = (e.clientY * 2)/100;\\r\\n\\t\\t\\t\\tbody.style.backgroundPosition = \`-\${x}px -\${y}px\`;\\r\\n\\t\\t\\t}\\r\\n\\t\\t}\\r\\n\\t});\\r\\n<\/script>\\r\\n\\r\\n<slot />\\r\\n\\r\\n<style>\\r\\n\\t@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;900&display=swap');\\r\\n\\t@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap');\\r\\n\\t@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;700&family=Source+Sans+Pro:wght@300;400;600;700&display=swap');\\r\\n\\r\\n\\t:global(*) {\\r\\n\\t\\tmargin: 0;\\r\\n\\t\\tpadding: 0;\\r\\n\\t}\\r\\n\\r\\n\\t:global(html),\\r\\n\\t:global(body) {\\r\\n\\t\\toverflow-x: hidden;\\r\\n\\t}\\r\\n\\r\\n\\t:global(body) {\\r\\n\\t\\toverflow: hidden;\\r\\n\\t\\tfont-family: 'Source Sans Pro';\\r\\n\\t\\tbackground: url('bg-1.png');\\r\\n\\t\\tbackground-position: center;\\r\\n\\t\\tbackground-repeat: no-repeat;\\r\\n\\t\\tbackground-size: 125%;\\r\\n\\t\\tbackground-attachment: fixed;\\r\\n\\t}\\r\\n\\r\\n\\t:global(.glass-element) {\\r\\n\\t\\tborder: 1px solid rgba(255, 255, 255, 0.7);\\r\\n\\t\\tbackground: rgba(255, 255, 255, 0.5);\\r\\n\\t\\tborder-radius: 1rem;\\r\\n\\t\\tbackdrop-filter: blur(24px);\\r\\n\\t\\tbox-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\\r\\n\\t}\\r\\n\\r\\n\\t@media only screen and (max-width: 768px) {\\r\\n\\t\\t:global(body) {\\r\\n\\t\\t\\tbackground-size: cover;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAkBC,QAAQ,IAAI,mFAAmF,CAAC,CAAC,AACjG,QAAQ,IAAI,4FAA4F,CAAC,CAAC,AAC1G,QAAQ,IAAI,mIAAmI,CAAC,CAAC,AAEzI,CAAC,AAAE,CAAC,AACX,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACX,CAAC,AAEO,IAAI,AAAC,CACL,IAAI,AAAE,CAAC,AACd,UAAU,CAAE,MAAM,AACnB,CAAC,AAEO,IAAI,AAAE,CAAC,AACd,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,iBAAiB,CAC9B,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,mBAAmB,CAAE,MAAM,CAC3B,iBAAiB,CAAE,SAAS,CAC5B,eAAe,CAAE,IAAI,CACrB,qBAAqB,CAAE,KAAK,AAC7B,CAAC,AAEO,cAAc,AAAE,CAAC,AACxB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC1C,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACpC,aAAa,CAAE,IAAI,CACnB,eAAe,CAAE,KAAK,IAAI,CAAC,CAC3B,UAAU,CAAE,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,AACtF,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAClC,IAAI,AAAE,CAAC,AACd,eAAe,CAAE,KAAK,AACvB,CAAC,AACF,CAAC"}`
};
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  onMount(() => {
    if (document.documentElement.clientWidth > 768) {
      let parallax = function(e) {
        const body = document.body;
        const x = e.clientX * 2 / 100;
        const y = e.clientY * 2 / 100;
        body.style.backgroundPosition = `-${x}px -${y}px`;
      };
      document.addEventListener("mousemove", parallax);
    }
  });
  $$result.css.add(css$5);
  return `${slots.default ? slots.default({}) : ``}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load$1({ error: error22, status }) {
  return { props: { error: error22, status } };
}
var Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error22 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error22 !== void 0)
    $$bindings.error(error22);
  return `<h1>${escape2(status)}</h1>

<p>${escape2(error22.message)}</p>


${error22.stack ? `<pre>${escape2(error22.stack)}</pre>` : ``}`;
});
var error2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error2,
  load: load$1
});
var css$4 = {
  code: ".intro-container.svelte-1sjomrq.svelte-1sjomrq{min-height:100vh;display:flex;flex-direction:row-reverse;align-items:center;justify-content:center;color:#fff}.profile-image.svelte-1sjomrq.svelte-1sjomrq{width:25%}.profile-image.svelte-1sjomrq img.svelte-1sjomrq{border-radius:1rem;margin:0 auto;box-shadow:0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);width:100%}.intro-text.svelte-1sjomrq.svelte-1sjomrq{margin-left:5rem;bottom:2.5rem}.name.svelte-1sjomrq.svelte-1sjomrq{text-shadow:0 0 16px rgba(0, 0, 0, 0.2);font-size:6rem;line-height:1;font-weight:700;margin:1rem 0;opacity:0.8}.subheading.svelte-1sjomrq.svelte-1sjomrq{text-shadow:0 0 4px rgba(0, 0, 0, 0.2);letter-spacing:0.2em;font-size:2.25rem}@media only screen and (max-width: 768px){.intro-text.svelte-1sjomrq.svelte-1sjomrq{color:#000;border:1px solid rgba(255, 255, 255, 0.7);width:70%;padding:2rem 1rem;background:rgba(255, 255, 255, 0.5);border-radius:1rem;backdrop-filter:blur(24px);box-shadow:0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);margin-left:0;bottom:0}.name.svelte-1sjomrq.svelte-1sjomrq{font-size:3rem;text-align:center;font-weight:700}.subheading.svelte-1sjomrq.svelte-1sjomrq{text-align:center;letter-spacing:0;font-size:2rem;font-weight:200}.intro-container.svelte-1sjomrq.svelte-1sjomrq{flex-direction:column-reverse}.profile-image.svelte-1sjomrq.svelte-1sjomrq{position:relative;bottom:-2rem;width:50%}}",
  map: '{"version":3,"file":"intro.svelte","sources":["intro.svelte"],"sourcesContent":["<script>\\r\\n\\tconst profileUrl = \'Profile1.png\';\\r\\n\\tlet y;\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<svelte:window bind:scrollY={y} />\\r\\n\\r\\n<div class=\\"intro-container\\">\\r\\n\\t<div style={`transform: translateX(${y / 2}px)`} class=\\"intro-text\\">\\r\\n\\t\\t<h1 class=\\"name\\">Yash Punia</h1>\\r\\n\\t\\t<h3 class=\\"subheading\\">\\r\\n\\t\\t\\tXR Developer | GameDev Enthusiast\\r\\n\\t\\t</h3>\\r\\n\\t</div>\\r\\n\\t<div class=\\"profile-image\\">\\r\\n\\t\\t<img\\r\\n\\t\\t\\tstyle={`transform: translateX(-${y / 2}px)`}\\r\\n\\t\\t\\tsrc={profileUrl}\\r\\n\\t\\t\\talt=\\"my-profile\\"\\r\\n\\t\\t\\taria-hidden=\\"true\\"\\r\\n\\t\\t/>\\r\\n\\t</div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t.intro-container {\\r\\n\\t\\tmin-height: 100vh;\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: row-reverse;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t\\tcolor: #fff;\\r\\n\\t}\\r\\n\\r\\n\\t.profile-image {\\r\\n\\t\\twidth: 25%;\\r\\n\\t}\\r\\n\\r\\n\\t.profile-image img {\\r\\n\\t\\tborder-radius: 1rem;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tbox-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\\r\\n\\t\\twidth: 100%;\\r\\n\\t}\\r\\n\\r\\n\\t.intro-text {\\r\\n\\t\\tmargin-left: 5rem;\\r\\n\\t\\tbottom: 2.5rem;\\r\\n\\t}\\r\\n\\r\\n\\t.name {\\r\\n\\t\\ttext-shadow: 0 0 16px rgba(0, 0, 0, 0.2);\\r\\n\\t\\tfont-size: 6rem;\\r\\n\\t\\tline-height: 1;\\r\\n\\t\\tfont-weight: 700;\\r\\n\\t\\tmargin: 1rem 0;\\r\\n\\t\\topacity: 0.8;\\r\\n\\t}\\r\\n\\r\\n\\t.subheading {\\r\\n\\t\\ttext-shadow: 0 0 4px rgba(0, 0, 0, 0.2);\\r\\n\\t\\tletter-spacing: 0.2em;\\r\\n\\t\\tfont-size: 2.25rem;\\r\\n\\t}\\r\\n\\r\\n\\t@media only screen and (max-width: 768px) {\\r\\n\\t\\t.intro-text {\\r\\n\\t\\t\\tcolor: #000;\\r\\n\\t\\t\\tborder: 1px solid rgba(255, 255, 255, 0.7);\\r\\n\\t\\t\\twidth: 70%;\\r\\n\\t\\t\\tpadding: 2rem 1rem;\\r\\n\\t\\t\\tbackground: rgba(255, 255, 255, 0.5);\\r\\n\\t\\t\\tborder-radius: 1rem;\\r\\n\\t\\t\\tbackdrop-filter: blur(24px);\\r\\n\\t\\t\\tbox-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\\r\\n\\t\\t\\tmargin-left: 0;\\r\\n\\t\\t\\tbottom: 0;\\r\\n\\t\\t}\\r\\n\\t\\t.name {\\r\\n\\t\\t\\tfont-size: 3rem;\\r\\n\\t\\t\\ttext-align: center;\\r\\n\\t\\t\\tfont-weight: 700;\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\t.subheading {\\r\\n\\t\\t\\ttext-align: center;\\r\\n\\t\\t\\tletter-spacing: 0;\\r\\n\\t\\t\\tfont-size: 2rem;\\r\\n\\t\\t\\tfont-weight: 200;\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\t.intro-container {\\r\\n\\t\\t\\tflex-direction: column-reverse;\\r\\n\\t\\t}\\r\\n\\t\\t.profile-image {\\r\\n\\t\\t\\tposition: relative;\\r\\n\\t\\t\\tbottom: -2rem;\\r\\n\\t\\t\\twidth: 50%;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"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"}'
};
var profileUrl = "Profile1.png";
var Intro = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let y;
  $$result.css.add(css$4);
  return `

<div class="${"intro-container svelte-1sjomrq"}"><div${add_attribute("style", `transform: translateX(${y / 2}px)`, 0)} class="${"intro-text svelte-1sjomrq"}"><h1 class="${"name svelte-1sjomrq"}">Yash Punia</h1>
		<h3 class="${"subheading svelte-1sjomrq"}">XR Developer | GameDev Enthusiast
		</h3></div>
	<div class="${"profile-image svelte-1sjomrq"}"><img${add_attribute("style", `transform: translateX(-${y / 2}px)`, 0)}${add_attribute("src", profileUrl, 0)} alt="${"my-profile"}" aria-hidden="${"true"}" class="${"svelte-1sjomrq"}"></div>
</div>`;
});
var blogPosts = writable2([]);
var fetchBlogPosts = async () => {
  const refUrl = "https://yashpunia.cdn.prismic.io/api/v2";
  const refResponse = await fetch(refUrl);
  const refResponseJson = await refResponse.json();
  const masterRef = refResponseJson.refs[0].ref;
  const docUrl = "https://yashpunia.cdn.prismic.io/api/v2/documents/search?ref=" + masterRef;
  const docResponse = await fetch(docUrl);
  const docResponseJson = await docResponse.json();
  let blogPostsFetched = [];
  docResponseJson.results.map((element, index2) => {
    if (element.type === "blog_posts")
      blogPostsFetched.push(element);
  });
  blogPosts.set(blogPostsFetched);
};
fetchBlogPosts();
var css$3 = {
  code: ".blogs-container.svelte-69ybex.svelte-69ybex{width:80%;margin:0 auto}.heading.svelte-69ybex.svelte-69ybex{color:#222;opacity:0.8;text-shadow:0 0 16px rgba(0, 0, 0, 0.2);font-size:6rem;font-weight:600}.blog-list-text.svelte-69ybex.svelte-69ybex{margin:2rem auto;padding:2.5rem 2rem}.blog-list-item.svelte-69ybex.svelte-69ybex{cursor:pointer;text-decoration:none;color:#000}.blog-list-item.svelte-69ybex>img.svelte-69ybex{z-index:1;height:100px;position:relative;bottom:-5rem;transition:all 0.3s}.blog-list-holder.svelte-69ybex.svelte-69ybex{display:grid;place-items:center;grid-template-columns:1fr 1fr;gap:1rem 1rem}.blog-list-item.svelte-69ybex:hover>img.svelte-69ybex{transform:translateY(-1em)}@media only screen and (max-width: 768px){.blogs-container.svelte-69ybex.svelte-69ybex{width:80%;margin:0 auto}.blog-list-holder.svelte-69ybex.svelte-69ybex{grid-template-columns:1fr}}",
  map: '{"version":3,"file":"blogs.svelte","sources":["blogs.svelte"],"sourcesContent":["<script>\\r\\n\\timport { blogPosts } from \'$lib/stores/blogStores\';\\r\\n\\r\\n\\t// $: console.log($blogPosts);\\r\\n\\r\\n\\tlet y;\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<svelte:window bind:scrollY={y} />\\r\\n\\r\\n<div class=\\"blogs-container\\">\\r\\n\\t<h1 class=\\"heading\\">Blogs</h1>\\r\\n\\t<div class=\\"blog-list-holder\\">\\r\\n\\t\\t{#each $blogPosts as post}\\r\\n\\t\\t\\t<a class=\\"blog-list-item\\" href={`/blogs/${post.id}`}>\\r\\n\\t\\t\\t\\t<img src={post.data.image.url} alt={post.data.image.alt} />\\r\\n\\t\\t\\t\\t<div class=\\"glass-element blog-list-text\\">\\r\\n\\t\\t\\t\\t\\t<h1>{post.data.title[0].text}</h1>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t</a>\\r\\n\\t\\t{/each}\\r\\n\\t</div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t.blogs-container {\\r\\n\\t\\twidth: 80%;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t}\\r\\n\\r\\n\\t.heading {\\r\\n\\t\\tcolor: #222;\\r\\n\\t\\topacity: 0.8;\\r\\n\\t\\ttext-shadow: 0 0 16px rgba(0, 0, 0, 0.2);\\r\\n\\t\\tfont-size: 6rem;\\r\\n\\t\\tfont-weight: 600;\\r\\n\\t}\\r\\n\\r\\n\\t.blog-list-text {\\r\\n\\t\\tmargin: 2rem auto;\\r\\n\\t\\tpadding: 2.5rem 2rem;\\r\\n\\t}\\r\\n\\r\\n\\t.blog-list-item {\\r\\n\\t\\tcursor: pointer;\\r\\n\\t\\ttext-decoration: none;\\r\\n\\t\\tcolor: #000;\\r\\n\\t}\\r\\n\\r\\n\\t.blog-list-item > img {\\r\\n\\t\\tz-index: 1;\\r\\n\\t\\theight: 100px;\\r\\n\\t\\tposition: relative;\\r\\n\\t\\tbottom: -5rem;\\r\\n\\t\\ttransition: all 0.3s;\\r\\n\\t}\\r\\n\\r\\n\\t.blog-list-holder {\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\tplace-items: center;\\r\\n\\t\\tgrid-template-columns: 1fr 1fr;\\r\\n\\t\\tgap: 1rem 1rem;\\r\\n\\t}\\r\\n\\r\\n\\t.blog-list-item:hover > img {\\r\\n\\t\\ttransform: translateY(-1em);\\r\\n\\t}\\r\\n\\t@media only screen and (max-width: 768px) {\\r\\n\\t\\t.blogs-container {\\r\\n\\t\\t\\twidth: 80%;\\r\\n\\t\\t\\tmargin: 0 auto;\\r\\n\\t\\t}\\r\\n\\t\\t.blog-list-holder {\\r\\n\\t\\t\\tgrid-template-columns: 1fr;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA0BC,gBAAgB,4BAAC,CAAC,AACjB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,QAAQ,4BAAC,CAAC,AACT,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,GAAG,CACZ,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACxC,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,eAAe,4BAAC,CAAC,AAChB,MAAM,CAAE,IAAI,CAAC,IAAI,CACjB,OAAO,CAAE,MAAM,CAAC,IAAI,AACrB,CAAC,AAED,eAAe,4BAAC,CAAC,AAChB,MAAM,CAAE,OAAO,CACf,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,IAAI,AACZ,CAAC,AAED,6BAAe,CAAG,GAAG,cAAC,CAAC,AACtB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,GAAG,CAAC,IAAI,AACrB,CAAC,AAED,iBAAiB,4BAAC,CAAC,AAClB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAC9B,GAAG,CAAE,IAAI,CAAC,IAAI,AACf,CAAC,AAED,6BAAe,MAAM,CAAG,GAAG,cAAC,CAAC,AAC5B,SAAS,CAAE,WAAW,IAAI,CAAC,AAC5B,CAAC,AACD,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1C,gBAAgB,4BAAC,CAAC,AACjB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AACD,iBAAiB,4BAAC,CAAC,AAClB,qBAAqB,CAAE,GAAG,AAC3B,CAAC,AACF,CAAC"}'
};
var Blogs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $blogPosts, $$unsubscribe_blogPosts;
  $$unsubscribe_blogPosts = subscribe(blogPosts, (value) => $blogPosts = value);
  $$result.css.add(css$3);
  $$unsubscribe_blogPosts();
  return `

<div class="${"blogs-container svelte-69ybex"}"><h1 class="${"heading svelte-69ybex"}">Blogs</h1>
	<div class="${"blog-list-holder svelte-69ybex"}">${each($blogPosts, (post) => `<a class="${"blog-list-item svelte-69ybex"}"${add_attribute("href", `/blogs/${post.id}`, 0)}><img${add_attribute("src", post.data.image.url, 0)}${add_attribute("alt", post.data.image.alt, 0)} class="${"svelte-69ybex"}">
				<div class="${"glass-element blog-list-text svelte-69ybex"}"><h1>${escape2(post.data.title[0].text)}</h1></div>
			</a>`)}</div>
</div>`;
});
var projects = writable2([]);
var fetchProjects = async () => {
  const refUrl = "https://yashpunia.cdn.prismic.io/api/v2";
  const refResponse = await fetch(refUrl);
  const refResponseJson = await refResponse.json();
  const masterRef = refResponseJson.refs[0].ref;
  const docUrl = "https://yashpunia.cdn.prismic.io/api/v2/documents/search?ref=" + masterRef;
  const docResponse = await fetch(docUrl);
  const docResponseJson = await docResponse.json();
  let projectsFetched = [];
  docResponseJson.results.map((element, index2) => {
    if (element.type === "projects")
      projectsFetched.push(element);
  });
  projects.set(projectsFetched);
};
fetchProjects();
var css$2 = {
  code: ".heading.svelte-nwzo4z.svelte-nwzo4z{width:80%;margin:0 auto;margin-top:6rem;color:#222;opacity:0.8;text-shadow:0 0 16px rgba(0, 0, 0, 0.2);font-size:6rem;font-weight:600}.projects-container.svelte-nwzo4z.svelte-nwzo4z{width:80%;margin:10rem auto;display:grid;grid-template-columns:1fr;gap:2rem}.project-list-item.svelte-nwzo4z.svelte-nwzo4z{display:grid;place-items:center;grid-template-columns:1fr 1fr;grid-auto-rows:minmax(200px, 400px);place-items:center}.project-list-item.svelte-nwzo4z>img.svelte-nwzo4z{max-height:100%;min-width:80%;max-width:80%;border-radius:1rem;box-shadow:0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)}.project-item-content.svelte-nwzo4z.svelte-nwzo4z{display:flex;flex-direction:column}.project-item-content.svelte-nwzo4z>h3.svelte-nwzo4z{z-index:1;position:relative;bottom:-1.5rem;left:3rem;font-size:3rem;text-shadow:0 0 16px rgba(0, 0, 0, 0.2);color:#000;font-weight:700;opacity:0.8;transition:bottom 0.3s}.project-item-content.svelte-nwzo4z:hover>h3.svelte-nwzo4z{bottom:-1rem}.project-item-content.svelte-nwzo4z:hover>.project-item-links.svelte-nwzo4z{top:-0.5rem}.project-item-desc.svelte-nwzo4z.svelte-nwzo4z{height:fit-content;padding:2rem 1rem;font-size:1.5rem}.project-item-links.svelte-nwzo4z.svelte-nwzo4z{position:relative;right:1rem;top:-1rem;display:flex;align-self:flex-end;transition:top 0.3s}.project-source-link.svelte-nwzo4z.svelte-nwzo4z,.project-live-link.svelte-nwzo4z.svelte-nwzo4z{padding:1rem;text-decoration:none;margin:0 1rem;opacity:0.9;font-size:1.4rem;color:#000;font-weight:600;transition:all 0.3s}.project-source-link.svelte-nwzo4z.svelte-nwzo4z:hover,.project-live-link.svelte-nwzo4z.svelte-nwzo4z:hover{background:#fff;opacity:1}@media only screen and (max-width: 768px){.project-list-item.svelte-nwzo4z.svelte-nwzo4z{grid-template-columns:1fr}.project-item-content.svelte-nwzo4z>h3.svelte-nwzo4z{bottom:-1.5rem;left:0;color:#fff;text-align:center;transition:none}.project-item-content.svelte-nwzo4z:hover>h3.svelte-nwzo4z{bottom:-1.5rem}.project-item-links.svelte-nwzo4z.svelte-nwzo4z{width:100%;position:relative;right:0;top:1rem;display:flex;justify-content:center;transition:top 0.3s}.project-source-link.svelte-nwzo4z.svelte-nwzo4z,.project-live-link.svelte-nwzo4z.svelte-nwzo4z{text-align:center;min-width:30%;padding:1rem;text-decoration:none;margin:0 1rem;opacity:0.9;font-size:1rem;color:#000;font-weight:600;transition:none}.project-item-content.svelte-nwzo4z:hover>.project-item-links.svelte-nwzo4z{top:1rem}.project-list-item.svelte-nwzo4z>img.svelte-nwzo4z{max-height:90%;min-width:80%;max-width:90%;border-radius:1rem;box-shadow:0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)}}",
  map: `{"version":3,"file":"projects.svelte","sources":["projects.svelte"],"sourcesContent":["<script>\\r\\n\\timport { projects } from '$lib/stores/projectStores';\\r\\n\\r\\n\\t// $: console.log($projects);\\r\\n\\r\\n\\tlet y;\\r\\n<\/script>\\r\\n\\r\\n<svelte:window bind:scrollY={y} />\\r\\n\\r\\n<h1 class=\\"heading\\">Projects</h1>\\r\\n{#if $projects.length > 0}\\r\\n\\t<div class=\\"projects-container\\">\\r\\n\\t\\t{#each $projects as project}\\r\\n\\t\\t\\t<div class=\\"project-list-item\\">\\r\\n\\t\\t\\t\\t<div class=\\"project-item-content\\">\\r\\n\\t\\t\\t\\t\\t<h3>{project.data.project_name[0].text}</h3>\\r\\n\\t\\t\\t\\t\\t<div class=\\"glass-element project-item-desc\\">\\r\\n\\t\\t\\t\\t\\t\\t{#each project.data.project_description as desc}\\r\\n\\t\\t\\t\\t\\t\\t\\t<p>{desc.text}</p>\\r\\n\\t\\t\\t\\t\\t\\t{/each}\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t<div class=\\"project-item-links\\">\\r\\n\\t\\t\\t\\t\\t\\t{#if project.data.github_link.url !== undefined}\\r\\n\\t\\t\\t\\t\\t\\t\\t<a\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"project-source-link glass-element\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\thref={project.data.github_link.url}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\ttarget=\\"__blank\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tSource Code\\r\\n\\t\\t\\t\\t\\t\\t\\t</a>\\r\\n\\t\\t\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t\\t\\t\\t{#if project.data.hosted_link.url !== undefined}\\r\\n\\t\\t\\t\\t\\t\\t\\t<a\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"project-live-link glass-element\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t\\thref={project.data.hosted_link.url}\\r\\n\\t\\t\\t\\t\\t\\t\\t\\ttarget=\\"__blank\\"\\r\\n\\t\\t\\t\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t\\t\\t\\tSee Live\\r\\n\\t\\t\\t\\t\\t\\t\\t</a>\\r\\n\\t\\t\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t<img src={project.data.project_image.url} alt={project.data.project_image.alt} />\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t{/each}\\r\\n\\t</div>\\r\\n{/if}\\r\\n\\r\\n<style>\\r\\n\\t.heading {\\r\\n\\t\\twidth: 80%;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tmargin-top: 6rem;\\r\\n\\t\\tcolor: #222;\\r\\n\\t\\topacity: 0.8;\\r\\n\\t\\ttext-shadow: 0 0 16px rgba(0, 0, 0, 0.2);\\r\\n\\t\\tfont-size: 6rem;\\r\\n\\t\\tfont-weight: 600;\\r\\n\\t}\\r\\n\\r\\n\\t.projects-container {\\r\\n\\t\\twidth: 80%;\\r\\n\\t\\tmargin: 10rem auto;\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\tgrid-template-columns: 1fr;\\r\\n\\t\\tgap: 2rem;\\r\\n\\t}\\r\\n\\r\\n\\t.project-list-item {\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\tplace-items: center;\\r\\n\\t\\tgrid-template-columns: 1fr 1fr;\\r\\n\\t\\tgrid-auto-rows: minmax(200px, 400px);\\r\\n\\t\\tplace-items: center;\\r\\n\\t}\\r\\n\\r\\n\\t.project-list-item > img {\\r\\n\\t\\tmax-height: 100%;\\r\\n\\t\\tmin-width: 80%;\\r\\n\\t\\tmax-width: 80%;\\r\\n\\t\\tborder-radius: 1rem;\\r\\n\\t\\tbox-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\\r\\n\\t}\\r\\n\\r\\n\\t.project-item-content {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: column;\\r\\n\\t}\\r\\n\\r\\n\\t.project-item-content > h3 {\\r\\n\\t\\tz-index: 1;\\r\\n\\t\\tposition: relative;\\r\\n\\t\\tbottom: -1.5rem;\\r\\n\\t\\tleft: 3rem;\\r\\n\\t\\tfont-size: 3rem;\\r\\n\\t\\ttext-shadow: 0 0 16px rgba(0, 0, 0, 0.2);\\r\\n\\t\\tcolor: #000;\\r\\n\\t\\tfont-weight: 700;\\r\\n\\t\\topacity: 0.8;\\r\\n\\t\\ttransition: bottom 0.3s;\\r\\n\\t}\\r\\n\\r\\n\\t.project-item-content:hover > h3 {\\r\\n\\t\\tbottom: -1rem;\\r\\n\\t}\\r\\n\\r\\n\\t.project-item-content:hover > .project-item-links {\\r\\n\\t\\ttop: -0.5rem;\\r\\n\\t}\\r\\n\\r\\n\\t.project-item-desc {\\r\\n\\t\\theight: fit-content;\\r\\n\\t\\tpadding: 2rem 1rem;\\r\\n\\t\\tfont-size: 1.5rem;\\r\\n\\t}\\r\\n\\r\\n\\t.project-item-links {\\r\\n\\t\\tposition: relative;\\r\\n\\t\\tright: 1rem;\\r\\n\\t\\ttop: -1rem;\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\talign-self: flex-end;\\r\\n\\t\\ttransition: top 0.3s;\\r\\n\\t}\\r\\n\\r\\n\\t.project-source-link,\\r\\n\\t.project-live-link {\\r\\n\\t\\tpadding: 1rem;\\r\\n\\t\\ttext-decoration: none;\\r\\n\\t\\tmargin: 0 1rem;\\r\\n\\t\\topacity: 0.9;\\r\\n\\t\\tfont-size: 1.4rem;\\r\\n\\t\\tcolor: #000;\\r\\n\\t\\tfont-weight: 600;\\r\\n\\t\\ttransition: all 0.3s;\\r\\n\\t}\\r\\n\\r\\n\\t.project-source-link:hover,\\r\\n\\t.project-live-link:hover {\\r\\n\\t\\tbackground: #fff;\\r\\n\\t\\topacity: 1;\\r\\n\\t}\\r\\n\\r\\n\\t@media only screen and (max-width: 768px) {\\r\\n\\t\\t.project-list-item {\\r\\n\\t\\t\\tgrid-template-columns: 1fr;\\r\\n\\t\\t}\\r\\n\\r\\n\\t\\t.project-item-content > h3 {\\r\\n\\t\\t\\tbottom: -1.5rem;\\r\\n\\t\\t\\tleft: 0;\\r\\n\\t\\t\\tcolor: #fff;\\r\\n\\t\\t\\ttext-align: center;\\r\\n\\t\\t\\ttransition: none;\\r\\n\\t\\t}\\r\\n\\t\\t.project-item-content:hover > h3 {\\r\\n\\t\\t\\tbottom: -1.5rem;\\r\\n\\t\\t}\\r\\n\\t\\t.project-item-links {\\r\\n\\t\\t\\twidth: 100%;\\r\\n\\t\\t\\tposition: relative;\\r\\n\\t\\t\\tright: 0;\\r\\n\\t\\t\\ttop: 1rem;\\r\\n\\t\\t\\tdisplay: flex;\\r\\n\\t\\t\\tjustify-content: center;\\r\\n\\t\\t\\ttransition: top 0.3s;\\r\\n\\t\\t}\\r\\n\\t\\t.project-source-link,\\r\\n\\t\\t.project-live-link {\\r\\n\\t\\t\\ttext-align: center;\\r\\n\\t\\t\\tmin-width: 30%;\\r\\n\\t\\t\\tpadding: 1rem;\\r\\n\\t\\t\\ttext-decoration: none;\\r\\n\\t\\t\\tmargin: 0 1rem;\\r\\n\\t\\t\\topacity: 0.9;\\r\\n\\t\\t\\tfont-size: 1rem;\\r\\n\\t\\t\\tcolor: #000;\\r\\n\\t\\t\\tfont-weight: 600;\\r\\n\\t\\t\\ttransition: none;\\r\\n\\t\\t}\\r\\n\\t\\t.project-item-content:hover > .project-item-links {\\r\\n\\t\\t\\ttop: 1rem;\\r\\n\\t\\t}\\r\\n\\t\\t.project-list-item > img {\\r\\n\\t\\t\\tmax-height: 90%;\\r\\n\\t\\t\\tmin-width: 80%;\\r\\n\\t\\t\\tmax-width: 90%;\\r\\n\\t\\t\\tborder-radius: 1rem;\\r\\n\\t\\t\\tbox-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"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"}`
};
var Projects = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $projects, $$unsubscribe_projects;
  $$unsubscribe_projects = subscribe(projects, (value) => $projects = value);
  $$result.css.add(css$2);
  $$unsubscribe_projects();
  return `

<h1 class="${"heading svelte-nwzo4z"}">Projects</h1>
${$projects.length > 0 ? `<div class="${"projects-container svelte-nwzo4z"}">${each($projects, (project) => `<div class="${"project-list-item svelte-nwzo4z"}"><div class="${"project-item-content svelte-nwzo4z"}"><h3 class="${"svelte-nwzo4z"}">${escape2(project.data.project_name[0].text)}</h3>
					<div class="${"glass-element project-item-desc svelte-nwzo4z"}">${each(project.data.project_description, (desc) => `<p>${escape2(desc.text)}</p>`)}</div>
					<div class="${"project-item-links svelte-nwzo4z"}">${project.data.github_link.url !== void 0 ? `<a class="${"project-source-link glass-element svelte-nwzo4z"}"${add_attribute("href", project.data.github_link.url, 0)} target="${"__blank"}">Source Code
							</a>` : ``}
						${project.data.hosted_link.url !== void 0 ? `<a class="${"project-live-link glass-element svelte-nwzo4z"}"${add_attribute("href", project.data.hosted_link.url, 0)} target="${"__blank"}">See Live
							</a>` : ``}
					</div></div>
				<img${add_attribute("src", project.data.project_image.url, 0)}${add_attribute("alt", project.data.project_image.alt, 0)} class="${"svelte-nwzo4z"}">
			</div>`)}</div>` : ``}`;
});
var css$1 = {
  code: ".form-container.svelte-jyz25o.svelte-jyz25o{width:40%;margin:3rem auto}.form-container.svelte-jyz25o form.svelte-jyz25o{padding:2rem 1rem}h1.svelte-jyz25o.svelte-jyz25o{z-index:1;position:relative;bottom:-4.5rem;width:60%;margin:0 auto;text-align:center;font-size:3rem;text-shadow:0 0 16px rgba(0, 0, 0, 0.2);color:#000;font-weight:700;opacity:0.8}form.svelte-jyz25o.svelte-jyz25o{display:flex;flex-direction:column}.input-fields.svelte-jyz25o.svelte-jyz25o{display:grid;grid-template-columns:1fr 1fr;gap:1rem}input.svelte-jyz25o.svelte-jyz25o,textarea.svelte-jyz25o.svelte-jyz25o,button.svelte-jyz25o.svelte-jyz25o{font-size:1.2rem;font-family:'Roboto';padding:1rem;border-radius:1rem;outline:none;border:none;margin:1rem 0}textarea.svelte-jyz25o.svelte-jyz25o{resize:vertical}button.svelte-jyz25o.svelte-jyz25o{width:30%;margin:1rem auto;cursor:pointer;transition:all 0.3s}button.svelte-jyz25o.svelte-jyz25o:hover{background:white}@media only screen and (max-width: 768px){.form-container.svelte-jyz25o.svelte-jyz25o{width:80%;margin:3rem auto}h1.svelte-jyz25o.svelte-jyz25o{bottom:0rem;width:100%}.input-fields.svelte-jyz25o.svelte-jyz25o{grid-template-columns:1fr}}",
  map: `{"version":3,"file":"feedback.svelte","sources":["feedback.svelte"],"sourcesContent":["<script>\\r\\n<\/script>\\r\\n\\r\\n<h1>I would love to hear from you!</h1>\\r\\n<div class=\\"form-container\\">\\r\\n\\t<form class=\\"glass-element\\" action=\\"https://formspree.io/f/xvodrzel\\" method=\\"POST\\">\\r\\n\\t\\t<div class=\\"input-fields\\">\\r\\n\\t\\t\\t<input type=\\"text\\" namee=\\"_name\\" placeholder=\\"Your Name\\" />\\r\\n\\t\\t\\t<input type=\\"email\\" name=\\"_replyto\\" placeholder=\\"Your Email ID\\" />\\r\\n\\t\\t</div>\\r\\n\\t\\t<textarea name=\\"message\\" placeholder=\\"Enter message here\\" />\\r\\n\\t\\t<button class=\\"glass-element\\" type=\\"submit\\">Send</button>\\r\\n\\t</form>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t.form-container {\\r\\n\\t\\twidth: 40%;\\r\\n\\t\\tmargin: 3rem auto;\\r\\n\\t}\\r\\n\\r\\n\\t.form-container form {\\r\\n\\t\\tpadding: 2rem 1rem;\\r\\n\\t}\\r\\n\\r\\n\\th1 {\\r\\n\\t\\tz-index: 1;\\r\\n\\t\\tposition: relative;\\r\\n\\t\\tbottom: -4.5rem;\\r\\n\\t\\twidth: 60%;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\ttext-align: center;\\r\\n\\t\\tfont-size: 3rem;\\r\\n\\t\\ttext-shadow: 0 0 16px rgba(0, 0, 0, 0.2);\\r\\n\\t\\tcolor: #000;\\r\\n\\t\\tfont-weight: 700;\\r\\n\\t\\topacity: 0.8;\\r\\n\\t}\\r\\n\\r\\n\\tform {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: column;\\r\\n\\t}\\r\\n\\r\\n\\t.input-fields {\\r\\n\\t\\tdisplay: grid;\\r\\n\\t\\tgrid-template-columns: 1fr 1fr;\\r\\n\\t\\tgap: 1rem;\\r\\n\\t}\\r\\n\\r\\n\\tinput,\\r\\n\\ttextarea,\\r\\n\\tbutton {\\r\\n\\t\\tfont-size: 1.2rem;\\r\\n\\t\\tfont-family: 'Roboto';\\r\\n\\t\\tpadding: 1rem;\\r\\n\\t\\tborder-radius: 1rem;\\r\\n\\t\\toutline: none;\\r\\n\\t\\tborder: none;\\r\\n\\t\\tmargin: 1rem 0;\\r\\n\\t}\\r\\n\\r\\n\\ttextarea {\\r\\n\\t\\tresize: vertical;\\r\\n\\t}\\r\\n\\r\\n\\tbutton {\\r\\n\\t\\twidth: 30%;\\r\\n\\t\\tmargin: 1rem auto;\\r\\n\\t\\tcursor: pointer;\\r\\n\\t\\ttransition: all 0.3s;\\r\\n\\t}\\r\\n\\r\\n\\tbutton:hover {\\r\\n\\t\\tbackground: white;\\r\\n\\t}\\r\\n\\r\\n\\t@media only screen and (max-width: 768px) {\\r\\n\\t\\t.form-container {\\r\\n\\t\\t\\twidth: 80%;\\r\\n\\t\\t\\tmargin: 3rem auto;\\r\\n\\t\\t}\\r\\n\\t\\th1 {\\r\\n\\t\\t\\tbottom: 0rem;\\r\\n\\t\\t\\twidth: 100%;\\r\\n\\t\\t}\\r\\n\\t\\t.input-fields {\\r\\n\\t\\t\\tgrid-template-columns: 1fr;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAgBC,eAAe,4BAAC,CAAC,AAChB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,IAAI,CAAC,IAAI,AAClB,CAAC,AAED,6BAAe,CAAC,IAAI,cAAC,CAAC,AACrB,OAAO,CAAE,IAAI,CAAC,IAAI,AACnB,CAAC,AAED,EAAE,4BAAC,CAAC,AACH,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACxC,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,GAAG,AACb,CAAC,AAED,IAAI,4BAAC,CAAC,AACL,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,AACvB,CAAC,AAED,aAAa,4BAAC,CAAC,AACd,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAC9B,GAAG,CAAE,IAAI,AACV,CAAC,AAED,iCAAK,CACL,oCAAQ,CACR,MAAM,4BAAC,CAAC,AACP,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,QAAQ,CACrB,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,IAAI,CAAC,CAAC,AACf,CAAC,AAED,QAAQ,4BAAC,CAAC,AACT,MAAM,CAAE,QAAQ,AACjB,CAAC,AAED,MAAM,4BAAC,CAAC,AACP,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,IAAI,CAAC,IAAI,CACjB,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,GAAG,CAAC,IAAI,AACrB,CAAC,AAED,kCAAM,MAAM,AAAC,CAAC,AACb,UAAU,CAAE,KAAK,AAClB,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1C,eAAe,4BAAC,CAAC,AAChB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,IAAI,CAAC,IAAI,AAClB,CAAC,AACD,EAAE,4BAAC,CAAC,AACH,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,aAAa,4BAAC,CAAC,AACd,qBAAqB,CAAE,GAAG,AAC3B,CAAC,AACF,CAAC"}`
};
var Feedback = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<h1 class="${"svelte-jyz25o"}">I would love to hear from you!</h1>
<div class="${"form-container svelte-jyz25o"}"><form class="${"glass-element svelte-jyz25o"}" action="${"https://formspree.io/f/xvodrzel"}" method="${"POST"}"><div class="${"input-fields svelte-jyz25o"}"><input type="${"text"}" namee="${"_name"}" placeholder="${"Your Name"}" class="${"svelte-jyz25o"}">
			<input type="${"email"}" name="${"_replyto"}" placeholder="${"Your Email ID"}" class="${"svelte-jyz25o"}"></div>
		<textarea name="${"message"}" placeholder="${"Enter message here"}" class="${"svelte-jyz25o"}"></textarea>
		<button class="${"glass-element svelte-jyz25o"}" type="${"submit"}">Send</button></form>
</div>`;
});
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>Yash Punia</title>`, ""}`, ""}

${validate_component(Intro, "Introduction").$$render($$result, {}, {}, {})}
${validate_component(Blogs, "BlogPosts").$$render($$result, {}, {}, {})}
${validate_component(Projects, "Projects").$$render($$result, {}, {}, {})}
${validate_component(Feedback, "Feeback").$$render($$result, {}, {}, {})}`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});
var css = {
  code: ".blog-container.svelte-dd6v1o.svelte-dd6v1o{width:80%;margin:3rem auto}.body.svelte-dd6v1o.svelte-dd6v1o{margin-top:6rem;font-size:2rem;border:1px solid rgba(255, 255, 255, 0.7);background:rgba(255, 255, 255, 0.5);border-radius:1rem;backdrop-filter:blur(24px);box-shadow:0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);padding:2rem 1rem}.body.svelte-dd6v1o .svelte-dd6v1o{margin:1rem 0}.heading.svelte-dd6v1o.svelte-dd6v1o{color:#222;opacity:0.8;text-shadow:0 0 16px rgba(0, 0, 0, 0.2);font-size:3rem;font-weight:600}",
  map: `{"version":3,"file":"[id].svelte","sources":["[id].svelte"],"sourcesContent":["<script context=\\"module\\">\\r\\n\\texport async function load({ page }) {\\r\\n\\t\\tlet blog;\\r\\n\\r\\n\\t\\tconst blogIdQuery = \`&q=[[at(document.id,\\"\${page.params.id}\\")]]\`;\\r\\n\\t\\t//get latest master ref\\r\\n\\t\\tconst refUrl = 'https://yashpunia.cdn.prismic.io/api/v2';\\r\\n\\t\\tconst refResponse = await fetch(refUrl);\\r\\n\\t\\tconst refResponseJson = await refResponse.json();\\r\\n\\t\\tconst masterRef = refResponseJson.refs[0].ref;\\r\\n\\r\\n\\t\\t//get the blogs\\r\\n\\t\\tconst docUrl =\\r\\n\\t\\t\\t'https://yashpunia.cdn.prismic.io/api/v2/documents/search?ref=' + masterRef + blogIdQuery;\\r\\n\\t\\tconst docResponse = await fetch(docUrl);\\r\\n\\t\\tconst docResponseJson = await docResponse.json();\\r\\n\\r\\n\\t\\tblog = docResponseJson.results[0].data;\\r\\n\\r\\n\\t\\tconsole.log(blog);\\r\\n\\r\\n\\t\\treturn {\\r\\n\\t\\t\\tprops: {\\r\\n\\t\\t\\t\\tblog\\r\\n\\t\\t\\t}\\r\\n\\t\\t};\\r\\n\\t}\\r\\n<\/script>\\r\\n\\r\\n<script>\\r\\n\\texport let blog;\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"blog-container\\">\\r\\n\\t<div class=\\"heading\\">\\r\\n\\t\\t<h1>{blog.title[0].text}</h1>\\r\\n\\t</div>\\r\\n\\t<div class=\\"body\\">\\r\\n\\t\\t{#each blog.body as item}\\r\\n\\t\\t\\t{#if item.type == 'paragraph'}\\r\\n\\t\\t\\t\\t<p>{item.text}</p>\\r\\n\\t\\t\\t{:else if item.type == 'heading3'}\\r\\n\\t\\t\\t\\t<h3>{item.text}</h3>\\r\\n\\t\\t\\t{/if}\\r\\n\\t\\t{/each}\\r\\n\\t</div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t.blog-container {\\r\\n\\t\\twidth: 80%;\\r\\n\\t\\tmargin: 3rem auto;\\r\\n\\t}\\r\\n\\r\\n\\t.body {\\r\\n\\t\\tmargin-top: 6rem;\\r\\n\\t\\tfont-size: 2rem;\\r\\n\\t\\tborder: 1px solid rgba(255, 255, 255, 0.7);\\r\\n\\t\\tbackground: rgba(255, 255, 255, 0.5);\\r\\n\\t\\tborder-radius: 1rem;\\r\\n\\t\\tbackdrop-filter: blur(24px);\\r\\n\\t\\tbox-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\\r\\n        padding: 2rem 1rem;\\r\\n\\t}\\r\\n\\r\\n\\t.body * {\\r\\n\\t\\tmargin: 1rem 0;\\r\\n\\t}\\r\\n\\r\\n\\t.heading {\\r\\n\\t\\tcolor: #222;\\r\\n\\t\\topacity: 0.8;\\r\\n\\t\\ttext-shadow: 0 0 16px rgba(0, 0, 0, 0.2);\\r\\n\\t\\tfont-size: 3rem;\\r\\n\\t\\tfont-weight: 600;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAiDC,eAAe,4BAAC,CAAC,AAChB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,IAAI,CAAC,IAAI,AAClB,CAAC,AAED,KAAK,4BAAC,CAAC,AACN,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC1C,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACpC,aAAa,CAAE,IAAI,CACnB,eAAe,CAAE,KAAK,IAAI,CAAC,CAC3B,UAAU,CAAE,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAC/E,OAAO,CAAE,IAAI,CAAC,IAAI,AACzB,CAAC,AAED,mBAAK,CAAC,cAAE,CAAC,AACR,MAAM,CAAE,IAAI,CAAC,CAAC,AACf,CAAC,AAED,QAAQ,4BAAC,CAAC,AACT,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,GAAG,CACZ,WAAW,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACxC,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,AACjB,CAAC"}`
};
async function load({ page }) {
  let blog;
  const blogIdQuery = `&q=[[at(document.id,"${page.params.id}")]]`;
  const refUrl = "https://yashpunia.cdn.prismic.io/api/v2";
  const refResponse = await fetch(refUrl);
  const refResponseJson = await refResponse.json();
  const masterRef = refResponseJson.refs[0].ref;
  const docUrl = "https://yashpunia.cdn.prismic.io/api/v2/documents/search?ref=" + masterRef + blogIdQuery;
  const docResponse = await fetch(docUrl);
  const docResponseJson = await docResponse.json();
  blog = docResponseJson.results[0].data;
  console.log(blog);
  return { props: { blog } };
}
var U5Bidu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { blog } = $$props;
  if ($$props.blog === void 0 && $$bindings.blog && blog !== void 0)
    $$bindings.blog(blog);
  $$result.css.add(css);
  return `<div class="${"blog-container svelte-dd6v1o"}"><div class="${"heading svelte-dd6v1o"}"><h1>${escape2(blog.title[0].text)}</h1></div>
	<div class="${"body svelte-dd6v1o"}">${each(blog.body, (item) => `${item.type == "paragraph" ? `<p class="${"svelte-dd6v1o"}">${escape2(item.text)}</p>` : `${item.type == "heading3" ? `<h3 class="${"svelte-dd6v1o"}">${escape2(item.text)}</h3>` : ``}`}`)}</div>
</div>`;
});
var _id_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Bidu5D,
  load
});

// .svelte-kit/netlify/entry.js
async function handler(event) {
  const { path, httpMethod, headers, rawQuery, body, isBase64Encoded } = event;
  const query = new URLSearchParams(rawQuery);
  const rawBody = headers["content-type"] === "application/octet-stream" ? new TextEncoder("base64").encode(body) : isBase64Encoded ? Buffer.from(body, "base64").toString() : body;
  const rendered = await render({
    method: httpMethod,
    headers,
    path,
    query,
    rawBody
  });
  if (rendered) {
    return {
      isBase64Encoded: false,
      statusCode: rendered.status,
      headers: rendered.headers,
      body: rendered.body
    };
  }
  return {
    statusCode: 404,
    body: "Not found"
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
