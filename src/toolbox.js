const THREE = require('three');

// a = min, b = max
function clamp(x, a, b) {
	return Math.min(Math.max(a, x), b);
}

function step(edge0, x) {
	return clamp(Math.sign(x - edge0), 0.0, 1.0);
}

function smoothstep(edge0, edge1, x) {
	var y = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
	return y * y * (3.0 - 2.0 * y);
}

function smootherstep(edge0, edge1, x) {
	var y = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
	return y * y * y * (y * 6.0 - 15.0) + 10.0;
}

function randomRange(min, max) { //  Generates a random number in range [min, max]
  return Math.random() * (max - min) + min;
}

function randomMax(max) { // Generates random number in range [0, max]
  return Math.random() * max;
}

export default {
	clamp: clamp,
	step: step,
	smoothstep: smoothstep,
	smootherstep: smootherstep,
	randomRange: randomRange,
	randomMax: randomMax
}