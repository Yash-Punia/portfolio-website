import * as THREE from 'three';
import { ARButton } from './ARButton.js';

export default class App {
    constructor() {
        this.init();

        this.setupXR();

        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    setupXR() {
        this.renderer.xr.enabled = true;
        document.body.appendChild( ARButton.createButton(this.renderer) );
    }

    init() {
        this.scene = new THREE.Scene();
        this.mesh = new THREE.Mesh(
            new THREE.BoxBufferGeometry(3,3,3,3,3,3),
            new THREE.MeshLambertMaterial({color: 0xff0066})
        );
        this.scene.add(this.mesh);

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

        this.camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1,1000);

        this.camera.position.set(0, 5, 10);
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
}