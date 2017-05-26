const THREE = require('three')
import Toolbox from './toolbox'

var backMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.BackSide});

function drawPhoto(url, scene) {
  var texture = new THREE.TextureLoader().load(url, function(tex) {
    // Callback Image is loaded

    // Define plane
    var w = texture.image.width / texture.image.height;
    var h = 1;
    var plane = new THREE.PlaneGeometry(w, h, 20, 20);

    // Create photo material
    var frontMaterial = new THREE.ShaderMaterial({
      uniforms: {
        image: { // Check the Three.JS documentation for the different allowed types and values
          type: "t", 
          value: texture
        }
      },
      side: THREE.FrontSide,
      wireframe: true,
      vertexShader: require('./shaders/photo-vert.glsl'),
      fragmentShader: require('./shaders/photo-frag.glsl')
    });

    // TODO: Crumple
    // Step 1: Adjust vertices
    

    // Create Mesh
    var photo = THREE.SceneUtils.createMultiMaterialObject(plane, [frontMaterial, backMaterial]);
    
    // Add to scene
    scene.add(photo);
  });
}

export default {
	drawPhoto: drawPhoto
}