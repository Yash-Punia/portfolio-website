import * as THREE from 'three';

const vehicleColors = [0xff0066, 0x00ff66, 0xff6600];

export function Car() {
    const car = new THREE.Group();
    //backwheels
    const backWheel = Wheel();
    backWheel.position.x = -18;
    car.add(backWheel);

    //frontwheels
    const frontWheel = Wheel();
    frontWheel.position.z = 6;
    frontWheel.position.x = 18;
    car.add(frontWheel);

    //main body
    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(60,30,15),
        new THREE.MeshLambertMaterial({color: pickRandom(vehicleColors)})
    );
    main.position.z = 12;
    car.add(main);

    //cabin textures
    const carFrontTexture = getCarFrontTexture();
    carFrontTexture.center = new THREE.Vector2(0.5,0.5);
    carFrontTexture.rotation = -Math.PI / 2;

    const carBackTexture = getCarFrontTexture();
    carBackTexture.center = new THREE.Vector2(0.5,0.5);
    carFrontTexture.rotation = Math.PI / 2;

    const carRightSideTexture = getCarSideTexture();

    const carLeftSideTexture = getCarSideTexture();
    carLeftSideTexture.flipY = false;

    //cabin of car
    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(33, 24, 12),
        [
            new THREE.MeshLambertMaterial({map: carFrontTexture}),
            new THREE.MeshLambertMaterial({map: carBackTexture}),
            new THREE.MeshLambertMaterial({map: carLeftSideTexture}),
            new THREE.MeshLambertMaterial({map: carRightSideTexture}),
            new THREE.MeshLambertMaterial({color: 0xffffff}),
            new THREE.MeshLambertMaterial({color: 0xffffff}),
        ]
    );
    cabin.position.x = -6;
    cabin.position.z = 25.5;
    car.add(cabin);

    return car;
}

function Wheel() {
    const wheel = new THREE.Mesh(
        new THREE.BoxBufferGeometry(12,33,12),
        new THREE.MeshLambertMaterial({color: 0x333333})    
    );
    wheel.position.z = 6;
    return wheel;
}

function pickRandom(array) {
    return array[Math.floor(Math.random()*array.length)];
}

function getCarFrontTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 32;

    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0,0,64,32);
    context.fillStyle = "#666666";
    context.fillRect(8,8,48,24);

    return new THREE.CanvasTexture(canvas);
}

function getCarSideTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 32;

    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0,0,128,32);
    context.fillStyle = "#666666";
    context.fillRect(10,8,38,24);
    context.fillRect(58,8,60,24);

    return new THREE.CanvasTexture(canvas);
}