import * as THREE from 'three';
import { getLineMarkings, getLeftIsland, getMiddleIsland, getOuterField, getRightIsland, trackRadius, arcCenterX } from './track.js';
import { Car } from './car.js';

export default class App {
    constructor() {
        this.initThree();

        this.scoreElement = document.getElementById('score');
        this.resetElement = document.getElementById('reset');
        this.otherVehicles = [];

        this.reset();

        this.accelerate = false;
        this.decelerate = false;
    }

    animation(timestamp) {
        if (!this.lastTimeStamp) {
            this.lastTimeStamp = timestamp;
            return;
        }

        const timeDelta = timestamp - this.lastTimeStamp;

        this.movePlayerCar(timeDelta);

        const laps = Math.floor(Math.abs(this.playerAngleMoved) / (Math.PI * 2));

        // Update score
        if (laps != this.score) {
            this.score = laps;
            this.scoreElement.innerText = this.score;
        }

        // Add a new vehicle at every 5th lap
        if (this.otherVehicles.length <= (laps + 1) / 5) this.addVehicle();

        this.moveOtherVehicles(timeDelta);

        this.hitDetection();

        this.renderer.render(this.scene, this.camera);
        this.lastTimeStamp = timestamp;
    }

    movePlayerCar(timeDelta) {
        this.baseSpeed = 0.0017;
        this.playerSpeed = this.getPlayerSpeed();
        this.playerAngleMoved -= this.playerSpeed * timeDelta;


        const totalPlayerAngle = this.playerAngleInitial + this.playerAngleMoved;

        const playerX = Math.cos(totalPlayerAngle) * trackRadius - arcCenterX;
        const playerY = Math.sin(totalPlayerAngle) * trackRadius;

        this.playerCar.position.x = playerX;
        this.playerCar.position.y = playerY;

        this.playerCar.rotation.z = totalPlayerAngle - Math.PI / 2;
    }

    getPlayerSpeed() {
        if (this.accelerate) return this.baseSpeed * 2;
        if (this.decelerate) return this.baseSpeed * 0.5;
        return this.baseSpeed;
    }

    addVehicle() {
        const mesh = Car();
        this.scene.add(mesh);

        const clockwise = Math.random() >= 0.5;
        const angle = clockwise ? Math.PI / 2 : -Math.PI / 2;
        let minSpeed = 1;
        let maxSpeed = 2;
        const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
        this.otherVehicles.push({ mesh, clockwise, angle, speed });
        // console.log(this.otherVehicles);
    }

    moveOtherVehicles(timeDelta) {
        const baseSpeed = 0.0017;
        this.otherVehicles.forEach(vehicle => {
            // console.log(vehicle);
            if (vehicle.clockwise) {
                vehicle.angle -= baseSpeed * timeDelta * vehicle.speed;
            } else {
                vehicle.angle += baseSpeed * timeDelta * vehicle.speed;
            }

            const vehicleX = Math.cos(vehicle.angle) * trackRadius + arcCenterX;
            const vehicleY = Math.sin(vehicle.angle) * trackRadius;
            const rotation = vehicle.angle + (vehicle.clockwise ? -Math.PI / 2 : Math.PI / 2);

            vehicle.mesh.position.x = vehicleX;
            vehicle.mesh.position.y = vehicleY;
            vehicle.mesh.rotation.z = rotation;
        });
    }

    getHitZonePosition(center, angle, clockwise, distance) {
        const directionAngle = angle + clockwise ? -Math.PI / 2 : Math.PI / 2;
        return {
            x: center.x + Math.cos(directionAngle) * distance,
            y: center.y + Math.sin(directionAngle) * distance,
        };
    }

    getDistance(a, b) {
        return Math.sqrt(
            (a.x - b.x) ** 2 + (a.y - b.y) ** 2
        );
    }

    hitDetection() {
        const playerHitZone1 = this.getHitZonePosition(
            this.playerCar.position,
            this.playerAngleInitial + this.playerAngleMoved,
            true,
            15
        );

        const playerHitZone2 = this.getHitZonePosition(
            this.playerCar.position,
            this.playerAngleInitial + this.playerAngleMoved,
            true,
            -15
        );

        const hit = this.otherVehicles.some(vehicle => {
            const vehicleHitZone1 = this.getHitZonePosition(
                vehicle.mesh.position,
                vehicle.angle,
                vehicle.clockwise,
                15
            );

            const vehicleHitZone2 = this.getHitZonePosition(
                vehicle.mesh.position,
                vehicle.angle,
                vehicle.clockwise,
                -15
            );

            //player hits a vehicle
            if (this.getDistance(playerHitZone1, vehicleHitZone1) < 40) return true;
            if (this.getDistance(playerHitZone2, vehicleHitZone2) < 40) return true;

            //another vehicle hits the player
            if (this.getDistance(playerHitZone2, vehicleHitZone1) < 40) return true;
        });

        if (hit) {
            this.resetElement.style.display = 'block';
            this.renderer.setAnimationLoop(null) // stop animation loop!
            window.removeEventListener('keydown')
        }
    }

    startGame() {
        if (this.ready) {
            this.ready = false;
            // console.log(this);
            this.renderer.setAnimationLoop(this.animation.bind(this));
        }
    }

    reset() {
        //keyboard event listeners
        window.addEventListener("keydown", e => {
            if (e.key == "ArrowUp") {
                this.startGame();
                this.accelerate = true;
                return;
            }

            if (e.key == "ArrowDown") {
                this.decelerate = true;
                return;
            }

            if (e.key == "R" || e.key == "r") {
                this.reset();
                this.resetElement.style.display = 'none';
                return;
            }
        });

        window.addEventListener("keyup", e => {
            if (e.key == "ArrowUp") {
                this.accelerate = false;
                return;
            }

            if (e.key == "ArrowDown") {
                this.decelerate = false;
                return;
            }
        });


        //Reset position and score
        this.playerAngleMoved = 0;
        this.playerAngleInitial = Math.PI;
        this.playerSpeed = 0.0017;
        this.movePlayerCar(0);
        this.score = 0;
        this.scoreElement.innerText = this.score;
        this.lastTimeStamp = undefined;

        //Remove Other Vehicles
        this.otherVehicles.forEach(vehicle => {
            this.scene.remove(vehicle.mesh);
        });
        this.otherVehicles = [];
        
        this.renderer.render(this.scene, this.camera);
        this.ready = true;
    }

    renderMap(mapWidth, mapHeight) {
        //plane with line markings
        const lineMarkingsTexture = getLineMarkings(mapWidth, mapHeight);
        const planeGeometry = new THREE.PlaneBufferGeometry(mapWidth, mapHeight);
        const planeMaterial = new THREE.MeshLambertMaterial({
            color: 0x546e90,
            map: lineMarkingsTexture,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        this.scene.add(plane);

        //extruded geometry
        const islandLeft = getLeftIsland();
        const islandRight = getRightIsland();
        const islandMiddle = getMiddleIsland();
        const outerField = getOuterField(mapWidth, mapHeight);

        const fieldGeometry = new THREE.ExtrudeBufferGeometry(
            [islandLeft, islandMiddle, islandRight, outerField],
            { depth: 6, bevelEnabled: false }
        );

        const fieldMesh = new THREE.Mesh(fieldGeometry, [
            new THREE.MeshLambertMaterial({ color: 0x67c240 }),
            new THREE.MeshLambertMaterial({ color: 0x23311c }),
        ]);

        this.scene.add(fieldMesh);
    }

    initThree() {
        // Set up scene
        this.scene = new THREE.Scene();
        this.playerCar = Car();
        this.scene.add(this.playerCar);

        // //Set up light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(0, 0, 200);
        this.scene.add(dirLight);

        //Set up camera
        const aspectRatio = window.innerWidth / window.innerHeight;
        const cameraWidth = 960;
        const cameraHeight = cameraWidth / aspectRatio;

        this.camera = new THREE.OrthographicCamera(
            cameraWidth / -2,
            cameraWidth / 2,
            cameraHeight / 2,
            cameraHeight / -2,
            0,
            1000
        );


        this.camera.position.set(0, -210, 300);
        this.camera.lookAt(0, 0, 0);

        this.renderMap(cameraWidth, cameraHeight * 2);

        //Set up Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
        document.body.appendChild(this.renderer.domElement)
    }
}