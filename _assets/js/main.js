var cubes = [];
$(document).ready(function() {

	// Cube colors:
	//  P 
	// YGB
	//  B 
	//  G 

	//  Y 
	// BYP
	//  P 
	//  G 

	//  Y 
	// GYP
	//  G 
	//  B 

	//  P 
	// PBG
	//  P 
	//  Y 
	var cubeColours = [
		{
			top: "P",
			left: "Y",
			front: "G",
			right: "B",
			bottom: "G",
			back: "G"
		},
		{
			top: "Y",
			left: "B",
			front: "Y",
			right: "P",
			bottom: "P",
			back: "G"
		},
		{
			top: "Y",
			left: "G",
			front: "Y",
			right: "P",
			bottom: "G",
			back: "B"
		},
		{
			top: "P",
			left: "P",
			front: "B",
			right: "G",
			bottom: "P",
			back: "Y"
		}
	];
	var hexValues = {
		P: "#8d06ff",
		Y: "#f0e242",
		G: "#40ac4f",
		B: "#2372d4"
	};
	var faceSequences = [
		["top", "front", "bottom", "back"],
		["top", "right", "bottom", "left"],
		["front", "right", "back", "left"]
	]
	var cubegutter = 100;
	var cubewidth = 200;
	$(".cube").each(function(index) {
		var $this = $(this);
		var def = {};
		var i;
		def.$cube = $this;
		def.colours = cubeColours[index];
		for (i in def.colours) {
			// Set the colours of the cube faces with the colours from the cubeColours definition
			def.$cube.find(".face." + i).css("background-color", hexValues[def.colours[i]]);
		}
		def.tX = index * cubewidth + index * cubegutter;
		def.rX = 0;
		def.rY = 0;
		def.rZ = 0;
		transformCube(def);
		cubes.push(def);
	});

	turnRow(180);
});

function rotateXto(def, deg) {
	def.rX = deg;
	transformCube(def);
}
function rotateXby(def, deg) {
	def.rX += deg;
	transformCube(def);
}
function rotateYto(def, deg) {
	def.rY = deg;
	transformCube(def);
}
function rotateYby(def, deg) {
	def.rY += deg;
	transformCube(def);
}
function rotateZto(def, deg) {
	def.rZ = deg;
	transformCube(def);
}
function rotateZby(def, deg) {
	def.rZ += deg;
	transformCube(def);
}
function transformCube(def) {
	def.$cube.css("-webkit-transform", "translateX(" + def.tX + "px) rotateX(" + def.rX + "deg) rotateY(" + def.rY + "deg) rotateZ(" + def.rZ + "deg)");
}

function turnRow(deg) {
	for (var i = 0; i < cubes.length; i++) {
		rotateXby(cubes[i], deg);
	}
}