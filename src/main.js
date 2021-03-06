
const THREE = require('three'); // older modules are imported like this. You shouldn't have to worry about this much
import Framework from './framework'
import Crumple from './crumple'

const MODELLING = true;
var redLambert = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: true});
var whiteLambert = new THREE.MeshLambertMaterial({color: 0xffffff});


  var box = new THREE.BoxGeometry(1, 1, 1);
  var boxMesh = new THREE.Mesh(box, whiteLambert);
  boxMesh.position.set(3, 0, 3);
  boxMesh.castShadow = true;
  boxMesh.receiveShadow = true;

// called after the scene loads
function onLoad(framework) {
  var scene = framework.scene;
  var camera = framework.camera;
  var renderer = framework.renderer;
  var gui = framework.gui;
  var stats = framework.stats;

  // Enable Shadows
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMapType = THREE.PCFSoftShadowMap;

  renderer.shadowCameraNear = 3;
  renderer.shadowCameraFar = 4000;
  renderer.shadowCameraFov = 100;

  renderer.shadowMapBias = 0.0039;
  renderer.shadowMapDarkness = 0.5;
  renderer.shadowMapWidth = 1024;
  renderer.shadowMapHeight = 1024;

  var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
  dirLight.color.setHSL( 0.1, 1, 0.95 );
  dirLight.position.set( -1, 1.75, 1 );
  dirLight.position.multiplyScalar( 500 );
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 512;
  dirLight.shadow.mapSize.height = 512;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 3000;
  scene.add( dirLight );

  // Hemisphere Light
  // var hemiLight = hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
  // hemiLight.color.setHSL( 0.6, 1, 0.6 );
  // hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
  // hemiLight.position.set( 0, 500, 0 );
  // hemiLight.castShadow = true;
  // scene.add( hemiLight );


  if (MODELLING) {
    // Guide Box ----------------------------/
    // Basically a box with side lengths 1, 2, 3, corresponding to directions x, y, z.
    // Useful for modelling since I get to understand where all the directions are while I tumble the scene
    var guideGeo = new THREE.BoxGeometry(1, 2, 3);
    var guideMesh = new THREE.Mesh(guideGeo, redLambert);
    scene.add(guideMesh);
  }

  // LOOK: the line below is synyatic sugar for the code above. Optional, but I sort of recommend it.
  // var {scene, camera, renderer, gui, stats} = framework; 

  // initialize a simple box and material
  var p = Crumple.drawPhoto('https://raw.githubusercontent.com/eldu/CrumpledPaper/master/adam.jpg', scene);
  // p.rotateX(-Math.PI / 4.0);
  // scene.add(p);

  var q = new THREE.PlaneGeometry(50, 50, 100, 100);
  var r = new THREE.Mesh(q, whiteLambert);
  r.rotateX(-Math.PI / 2.0);
  r.position.set(0, -1, 0);
  r.receiveShadow = true;
  scene.add(r);

  // var box = new THREE.BoxGeometry(1, 1, 1);
  // var boxMesh = new THREE.Mesh(box, whiteLambert);
  // boxMesh.position.set(3, 0, 3);
  // boxMesh.castShadow = true;
  // boxMesh.receiveShadow = true;
  scene.add(boxMesh);

  // set camera position
  camera.position.set(1, 1, 2);
  camera.lookAt(new THREE.Vector3(0,0,0));

  // edit params and listen to changes like this
  // more information here: https://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage
  gui.add(camera, 'fov', 0, 180).onChange(function(newVal) {
    camera.updateProjectionMatrix();
  });
}



// called on frame updates
function onUpdate(framework) {
  // console.log(`the time is ${new Date()}`);
  boxMesh.position.set(3, 3, 3 + 3 * Math.sin(Date.now()/1000));
}

// when the scene is done initializing, it will call onLoad, then on frame updates, call onUpdate
Framework.init(onLoad, onUpdate);

// console.log('hello world');

// console.log(Noise.generateNoise());

// Noise.whatever()

// console.log(other())