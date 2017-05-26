
const THREE = require('three'); // older modules are imported like this. You shouldn't have to worry about this much
import Framework from './framework'
import Noise from './noise'
import {other} from './noise'

// called after the scene loads
function onLoad(framework) {
  var scene = framework.scene;
  var camera = framework.camera;
  var renderer = framework.renderer;
  var gui = framework.gui;
  var stats = framework.stats;

  var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
  dirLight.color.setHSL( 0.1, 1, 0.95 );
  dirLight.position.set( -1, 1.75, 1 );
  dirLight.position.multiplyScalar( 50 );
  scene.add( dirLight );

  // Hemisphere Light
  var hemiLight = hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
  hemiLight.color.setHSL( 0.6, 1, 0.6 );
  hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
  hemiLight.position.set( 0, 500, 0 );
  scene.add( hemiLight );

  // LOOK: the line below is synyatic sugar for the code above. Optional, but I sort of recommend it.
  // var {scene, camera, renderer, gui, stats} = framework; 

  // initialize a simple box and material
  
  var p = drawPhoto('https://raw.githubusercontent.com/eldu/CrumpledPaper/master/adam.jpg');
  scene.add(p);

  // set camera position
  camera.position.set(1, 1, 2);
  camera.lookAt(new THREE.Vector3(0,0,0));

  // edit params and listen to changes like this
  // more information here: https://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage
  gui.add(camera, 'fov', 0, 180).onChange(function(newVal) {
    camera.updateProjectionMatrix();
  });
}

// Returns 
function drawPhoto(url) {
  // initialize a simple box and material
  var plane = new THREE.PlaneGeometry(1, 1, 20, 20);

  var frontMaterial = new THREE.ShaderMaterial({
    uniforms: {
      image: { // Check the Three.JS documentation for the different allowed types and values
        type: "t", 
        value: THREE.ImageUtils.loadTexture(url)
      }
    },
    side: THREE.FrontSide,
    wireframe: true,
    vertexShader: require('./shaders/photo-vert.glsl'),
    fragmentShader: require('./shaders/photo-frag.glsl')
  });
  var backMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.BackSide});

  var photo = THREE.SceneUtils.createMultiMaterialObject(plane, [frontMaterial, backMaterial]);
  return photo;
}

function randomRange(min, max) { //  Generates a random number in range [min, max]
  return Math.random() * (max - min) + min;
}

function randomMax(max) { // Generates random number in range [0, max]
  return Math.random() * max;
}

// called on frame updates
function onUpdate(framework) {
  // console.log(`the time is ${new Date()}`);
}

// when the scene is done initializing, it will call onLoad, then on frame updates, call onUpdate
Framework.init(onLoad, onUpdate);

// console.log('hello world');

// console.log(Noise.generateNoise());

// Noise.whatever()

// console.log(other())