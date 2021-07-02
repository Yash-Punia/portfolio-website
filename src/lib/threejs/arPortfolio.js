import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

export default class App {
    constructor() {
        this.setupXR();
    }

    setupXR() {
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

        //Set up Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.render(this.scene, this.camera);
        document.body.appendChild(this.renderer.domElement)
    }
}