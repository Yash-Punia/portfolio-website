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

        const getRandomColor = () => {
            let colors = [0x25e0ba, 0x7a88d8, 0xc362f6];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        for(let i=0;i<10;i++) {
            const ball = new THREE.Mesh(
                new THREE.SphereBufferGeometry(0.2,7,7),
                new THREE.MeshLambertMaterial({color: getRandomColor()})
            );
            const x = (Math.random() * 4) - 2;
            const y = (Math.random()) + 1;
            const z = -(Math.random() * 4);
            ball.position.set(x,y,z);
            this.scene.add(ball);
        }
    }

    setupXR() {
        this.renderer.xr.enabled = true;
        document.body.appendChild( ARButton.createButton(this.renderer) );
    }

    init() {
        this.scene = new THREE.Scene();
        // this.mesh = new THREE.Mesh(
        //     new THREE.BoxBufferGeometry(3,3,3,3,3,3),
        //     new THREE.MeshLambertMaterial({color: 0xff0066})
        // );
        this.mesh = this.createText(`Hi! I'm Yash Punia`, 1);
        this.mesh.position.set(0,0,-5);
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

    createText( message, height ) {

        const canvas = document.createElement( 'canvas' );
        const context = canvas.getContext( '2d' );
        let metrics = null;
        const textHeight = 100;
        context.font = 'normal ' + textHeight + 'px Arial';
        metrics = context.measureText( message );
        const textWidth = metrics.width;
        canvas.width = textWidth;
        canvas.height = textHeight;
        context.font = 'normal ' + textHeight + 'px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#ffffff';
        context.fillText( message, textWidth / 2, textHeight / 2 );
    
        const texture = new THREE.Texture( canvas );
        texture.needsUpdate = true;
        //var spriteAlignment = new THREE.Vector2(0,0) ;
        const material = new THREE.MeshBasicMaterial( {
            color: 0xffffff,
            side: THREE.DoubleSide,
            map: texture,
            transparent: true,
        } );
        const geometry = new THREE.PlaneGeometry(
            ( height * textWidth ) / textHeight,
            height
        );
        const plane = new THREE.Mesh( geometry, material );
        return plane;
    }
}