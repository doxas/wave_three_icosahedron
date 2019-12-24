
import 'whatwg-fetch';
import Promise from 'promise-polyfill';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import Emitter from './emitter.js';
import baseVs from './shader/base.vert';
import baseFs from './shader/base.frag';

class ThreeApp extends Emitter {
    constructor(){
        super();
        console.log('⚡ : construct three app');

        this.eventSetting();
        this.initialize();
        this.startTime = Date.now();

        this.resize = this.resize.bind(this);
        this.render = this.render.bind(this);
    }
    initialize(){
        this.wrapper = document.getElementById('wrap');
        // gen scene
        this.scene = new THREE.Scene();
        // gen camera
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1.0, 20.0);
        this.camera.position.z = 10.0;
        this.camera.target = new THREE.Vector3(0, 0, 0);
        this.scene.add(this.camera);
        // gen material
        this.shaderMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time:   {type: "f", value: 0},
                weight: {type: "f", value: 0},
                wave:   {type: "f", value: 0}
            },
            vertexShader: baseVs,
            fragmentShader: baseFs,
            transparent: true,
        });
        // gen mesh
        this.mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(2.0, 5), this.shaderMaterial);
        this.scene.add(this.mesh);
        // renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 0.0);
        this.wrapper.appendChild(this.renderer.domElement);
        // controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // finish
        this.resize();
    }
    eventSetting(){
        window.addEventListener('resize', this.resize, false);
    }
    resize(){
        const b = this.renderer.domElement.parentNode.getBoundingClientRect();
        this.renderer.setSize(b.width, b.height);
        this.camera.aspect = b.width / b.height;
        this.camera.updateProjectionMatrix();
    }
    render(){
        this.controls.update();
        let nowTime = (Date.now() - this.startTime) / 1000;
        this.shaderMaterial.uniforms['time'].value = nowTime * 0.75;
        this.shaderMaterial.uniforms['weight'].value = 4.0 * (.5 + .5 * Math.sin(.00025));
        this.shaderMaterial.uniforms['wave'].value = 1.0;
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.render);
    }
}

window.ThreeApp = ThreeApp;

