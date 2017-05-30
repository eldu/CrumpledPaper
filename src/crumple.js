const THREE = require('three')
import Toolbox from './toolbox'

var backMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, side: THREE.BackSide});
var granularity = 20;

function drawPhoto(url, scene) {
  var texture = new THREE.TextureLoader().load(url, function(tex) {
    // Callback Image is loaded

    // Define plane
    var w = texture.image.width / texture.image.height;
    var h = 1;
    var maxw = Math.floor(granularity * w); // Cells in width
    var maxh = granularity; // Cells in height
    var halfcellsize = (h / maxh) / 3;
    var plane = new THREE.PlaneGeometry(w, h, maxw - 1, maxh - 1);

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
    // Adjust vertices
    console.log (maxw * maxh);
    console.log ('maxw: ' + maxw + ' maxh: ' + maxh);
    var offset = new THREE.Vector3(0, 0, 0);
    for (var i = 1; i < maxh - 1; i++) { // Row
    	// First 
    	//j = 0

    	// Middle
    	for (var j = 1; j < maxw - 1; j++) { // Column
    		offset.set(Toolbox.randomRange(-halfcellsize, halfcellsize), Toolbox.randomRange(-halfcellsize, halfcellsize), 0);
    		var idx = getIdx(i, j, maxw, maxh);

    		console.log(idx);
    		plane.vertices[idx].add(offset);
    	}
    	console.log('next row');

    	// Last
    	// j = maxh - 1


    }

    // Create Mesh
    var photo = THREE.SceneUtils.createMultiMaterialObject(plane, [frontMaterial, backMaterial]);
    
    // Add to scene
    scene.add(photo);
  });
}

var getIdx = function(i, j, maxw, maxh) {
	return j + maxw * i;
}

export default {
	drawPhoto: drawPhoto
}