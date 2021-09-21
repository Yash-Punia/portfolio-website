import{ab as e,M as t,ac as n,ad as s,L as i,N as a,O as r,ae as o,W as d,af as c,ag as h,P as l,S as w,i as m,s as p,e as u,c as f,a as v,d as x,b as g,f as S,r as R,u as A,v as b,z as E,B as $,t as y,g as W,X as z,Y as M,Z as B,ah as C,R as H,ai as X,j as L,m as P,o as T,w as j}from"../chunks/vendor-641194f2.js";class k{constructor(){this.init(),this.generateBalls(),this.setupXR(),window.addEventListener("resize",this.onWindowResize.bind(this),!1)}startAR(){navigator.xr.requestSession("immersive-ar").then(this.onSessionStarted.bind(this)),document.body.appendChild(this.renderer.domElement)}generateBalls(){const i=(new e).load("gradient.png");for(let e=0;e<10;e++){const e=new t(new n(.2*Math.random(),20,20),new s({map:i})),a=4*Math.random()-2,r=Math.random()+.5,o=-4*Math.random()-1;e.position.set(a,r,o),this.scene.add(e)}}async onSessionStarted(e){this.renderer.xr.setReferenceSpaceType("local"),await this.renderer.xr.setSession(e),this.currentSession=e}setupXR(){this.currentSession=null,this.renderer.xr.enabled=!0;const e=this.renderer.xr.getController(0);e.addEventListener("select",(()=>{alert("tapped!")})),this.scene.add(e),this.controller=e}init(){this.scene=new i;const e=new a(16777215,.6);this.scene.add(e);const t=new r(16777215,.6);t.position.set(0,0,200),this.scene.add(t);const n=window.innerWidth/window.innerHeight;this.camera=new o(60,n,.1,1e3),this.camera.position.set(0,0,0),this.camera.lookAt(0,0,0),this.renderer=new d({antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setAnimationLoop(this.animate.bind(this))}animate(){this.renderer.render(this.scene,this.camera)}onWindowResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}createText(e,n){const i=document.createElement("canvas"),a=i.getContext("2d");let r=null;const o=100;a.font="normal 100px Arial",r=a.measureText(e);const d=r.width;i.width=d,i.height=o,a.font="normal 100px Arial",a.textAlign="center",a.textBaseline="middle",a.fillStyle="#ffffff",a.fillText(e,d/2,50);const w=new c(i);w.needsUpdate=!0;const m=new s({color:16777215,side:h,map:w,transparent:!0}),p=new l(n*d/o,n);return new t(p,m)}}function D(e){let t,n,s;return{c(){t=u("div"),n=u("h1"),s=y("XR is not available on this device. Kindly switch to Chrome for AR experience"),this.h()},l(e){t=f(e,"DIV",{});var i=v(t);n=f(i,"H1",{class:!0});var a=v(n);s=W(a,"XR is not available on this device. Kindly switch to Chrome for AR experience"),a.forEach(x),i.forEach(x),this.h()},h(){g(n,"class","svelte-1t730xc")},m(e,i){S(e,t,i),z(t,n),z(n,s)},p:M,i:M,o:M,d(e){e&&x(t)}}}function I(e){let t,n,s,i;return{c(){t=u("div"),n=y("See AR Portfolio"),this.h()},l(e){t=f(e,"DIV",{class:!0});var s=v(t);n=W(s,"See AR Portfolio"),s.forEach(x),this.h()},h(){g(t,"class","xrButton svelte-1t730xc")},m(a,r){S(a,t,r),z(t,n),s||(i=B(t,"click",(function(){C(e[1].startAR())&&e[1].startAR().apply(this,arguments)})),s=!0)},p(t,n){e=t},i:M,o:M,d(e){e&&x(t),s=!1,i()}}}function V(e){let t,n;return t=new H({props:{data:X,spin:!0}}),{c(){L(t.$$.fragment)},l(e){P(t.$$.fragment,e)},m(e,s){T(t,e,s),n=!0},p:M,i(e){n||(b(t.$$.fragment,e),n=!0)},o(e){R(t.$$.fragment,e),n=!1},d(e){j(t,e)}}}function K(e){let t,n,s,i;const a=[V,I,D],r=[];function o(e,t){return null==e[0]?0:1==e[0]?1:2}return n=o(e),s=r[n]=a[n](e),{c(){t=u("div"),s.c(),this.h()},l(e){t=f(e,"DIV",{class:!0});var n=v(t);s.l(n),n.forEach(x),this.h()},h(){g(t,"class","container svelte-1t730xc")},m(e,s){S(e,t,s),r[n].m(t,null),i=!0},p(e,[i]){let d=n;n=o(e),n===d?r[n].p(e,i):($(),R(r[d],1,1,(()=>{r[d]=null})),A(),s=r[n],s?s.p(e,i):(s=r[n]=a[n](e),s.c()),b(s,1),s.m(t,null))},i(e){i||(b(s),i=!0)},o(e){R(s),i=!1},d(e){e&&x(t),r[n].d()}}}function q(e,t,n){let s,i=null;return E((()=>{"xr"in navigator&&navigator.xr.isSessionSupported("immersive-ar").then((e=>{n(0,i=e),i&&(window.focus(),n(1,s=new k),window.app=s)}))})),[i,s]}export default class extends w{constructor(e){super(),m(this,e,q,K,p,{})}}
