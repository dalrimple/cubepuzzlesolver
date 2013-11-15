var cubes = [];
$(document).ready(function() {

	//Display config values
	var cubegutter = 100;
	var cubewidth = 200;
	var hexValues = { //Colour display values
		P: "#8d06ff",
		Y: "#f0e242",
		G: "#40ac4f",
		B: "#2372d4"
	};

	// Configurtion of colours for the cube faces:
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

	//The three possible sequences of faces that orbit the X axis in different cube orientation
	var faceSequences = {
		A: ["top", "front", "bottom", "back"],
		B: ["top", "right", "bottom", "left"],
		C: ["left", "front", "right", "back"]
	};

	//Initialize each cube
	$(".cube").each(function(index) {
		var $this = $(this);
		var def = {}; //Create object that will hold all data for a cube
		var i;
		def.$cube = $this;
		//Get the color configuration and set the faces to display these
		def.colours = cubeColours[index];
		for (i in def.colours) {
			// Set the colours of the cube faces with the colours from the cubeColours definition
			def.$cube.find(".face." + i).css("background-color", hexValues[def.colours[i]]);
		}
		//Setup cube orientation values
		def.tX = index * cubewidth + index * cubegutter;
		def.rX = 0;
		def.rY = 0;
		def.rZ = 0;

		//Put the cube definition into the cubes array
		cubes.push(def);

		//Set the orientation of the DOM to reflect the data
		transformCube(def);
	});

	// turnRow(180);
});

function moveToSequence(def, sequence, direction, index) {
	if (sequence == "A") {
		if (direction == "F") {
			def.rY = 0;
			def.rZ = 0;
		} else if (direction == "R") {
			def.rY = 180;
			def.rZ = 0;
		}
	} else if (sequence == "B") {
		if (direction == "F") {
			def.rY = -90;
			def.rZ = 0;
		} else if (direction == "R") {
			def.rY = 90;
			def.rZ = 90;
		}
	} else if (sequence == "C") {
		if (direction == "F") {
			def.rY = 0;
			def.rZ = 90;
		} else if (direction == "R") {
			def.rY = 180;
			def.rZ = 90;
		}
	}
	def.rX = index * 90;
	transformCube(def);
}

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