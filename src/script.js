
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
    }
}

window.ThreeApp = ThreeApp;

