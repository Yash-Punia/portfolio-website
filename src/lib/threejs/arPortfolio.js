import * as THREE from 'three';
import { ARButton } from './ARButton.js';

export default class App {
    constructor() {
        this.init();

        this.setupXR();

        this.generateBalls();

        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    generateBalls() {

        const gradientTexture = new THREE.TextureLoader().load('gradient.png');

        for (let i = 0; i < 10; i++) {
            const ball = new THREE.Mesh(
                new THREE.SphereBufferGeometry(Math.random() * 0.2, 20, 20),
                new THREE.MeshBasicMaterial({ map: gradientTexture })
            );
            const x = (Math.random() * 4) - 2;
            const y = (Math.random()) + 0.5;
            const z = -(Math.random() * 4) - 1;
            ball.position.set(x, y, z);
            this.scene.add(ball);
        }
    }

    onSelect(e) {
        console.log(e);
    }

    async onSessionStarted(session) {
        this.renderer.xr.setReferenceSpaceType('local');
        await this.renderer.xr.setSession(session);
        this.currentSession = session;
    }

    setupXR() {
        this.currentSession = null;
        this.renderer.xr.enabled = true;
        const self = this;
        navigator.xr.requestSession('immersive-ar').then(this.onSessionStarted.bind(this));

        const controller = this.renderer.xr.getController(0);
        controller.addEventListener('select', () => {
            alert('tapped!')
        });
        this.scene.add(controller);
        this.controller = controller;

    }

    init() {
        this.scene = new THREE.Scene();

        //Set up light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(0, 0, 200);
        this.scene.add(dirLight);

        //Set up camera
        const aspectRatio = window.innerWidth / window.innerHeight;
        const cameraWidth = 960;
        const cameraHeight = cameraWidth / aspectRatio;

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.camera.position.set(0, 0, 0);
        this.camera.lookAt(0, 0, 0);

        //Set up Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setAnimationLoop(this.animate.bind(this));
        document.body.appendChild(this.renderer.domElement)

    }

    animate() {
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    createText(message, height) {

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        let metrics = null;
        const textHeight = 100;
        context.font = 'normal ' + textHeight + 'px Arial';
        metrics = context.measureText(message);
        const textWidth = metrics.width;
        canvas.width = textWidth;
        canvas.height = textHeight;
        context.font = 'normal ' + textHeight + 'px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#ffffff';
        context.fillText(message, textWidth / 2, textHeight / 2);

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        //var spriteAlignment = new THREE.Vector2(0,0) ;
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            map: texture,
            transparent: true,
        });
        const geometry = new THREE.PlaneGeometry(
            (height * textWidth) / textHeight,
            height
        );
        const plane = new THREE.Mesh(geometry, material);
        return plane;
    }
}