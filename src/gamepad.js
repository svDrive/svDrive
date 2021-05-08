//circle indicating the status of the controller
const controllerStatus = document.querySelector("circle");

//flag to display the controller scheme or not
let isSchemeOn = false;

//Defines the deadzone for controller axes
const deadzone = 0.8;

//setInterval id (used in clearInterval())
let pollControlsEventId = 0;

//stock functions to be binded to wheel or gamepad functions
function handleTurning(controller);
function handleThrottle(controller);
function lookHorizontal(controller);
function lookVertical(controller);

//MMD: Main Menu Drive!
let MM = document.getElementById("1");
let MMD = document.getElementById("MMD");
let MMS2 = document.getElementById("MMS2");
let API = document.getElementById("2");
let EK = document.getElementById("EK");
let AK = document.getElementById("AK");
let option;
let loadedMenu = false;
let path = getPath();
let botidx = 2001;
let preidx = 2001;
let hrefidx = 0;
let phrefidx = 0;
let botlen = 5;

let prebot;
let curbot;
let preurl;
let cururl;
let subMenulst = document.getElementsByClassName("subMenu");
let subMenuflag = 0;
let urllist = [];

window.addEventListener("gamepadconnected", (e) => {
	controllerStatus.setAttribute("fill", "green");
	// TODO: conditional logic for controller vs steering wheel
	// slurp the user input about controller
	//if (controller) pollControlsEventId = setInterval(pollControls, 150);
	//else if (steeringWheel)
	handleTurning = handleTurningSteeringWheel;
	handleThrottle = handleThrottleSteeringWheel;
	lookHorizontal = lookHorizontalSteeringWheel;

	pollControlsEventId = setInterval(pollControls, 150);
});

window.addEventListener("gamepaddisconnected", (event) => {
	controllerStatus.setAttribute("fill", "red");
	clearInterval(pollControlsEventId);
});

//** INPUT POLLING **//
function pollControls() {
	let controller = navigator.getGamepads()[0];
	if (controller === undefined) {
		clearInterval(pollControlsEventId);
		return;
	}

	if (path === "index") {
		menuControls(controller);
	}
	else if(path === "drive") {
		//svDriveController(controller);
		svDriveSteeringWheel(controller);
	}
}

function menuControls(controller) {
	if (loadedMenu === false) {
		option = MM;
		option.style.fontSize = "large";
		//close the accordian menu
		window.location.href = "#";
		loadedMenu = true;
	}

	//Dpad Down
	if (controller.buttons[13].pressed) {
		//set flag or Dpadchange function , 0 is go down
		if (subMenuflag === 1)
			Urlchange(0);
		else
			Dpadchange(0);
	}

	//Dpad UP
	else if (controller.buttons[12].pressed) {
		//set flag or Dpadchange function , 0 is go up
		if (subMenuflag === 1)
			Urlchange(1);
		else
			Dpadchange(1);
	}

	else if (controller.buttons[0].pressed) {
		var subMenuidx;
		subMenuidx = (Math.abs(botidx) - 1) % 5;
		if (subMenuflag === 1) {
			if (Math.abs(hrefidx) % urllist.length == urllist.length - 1)
				Backtomenu();
			else
				window.location.href = urllist[Math.abs(hrefidx) % urllist.length].href;
		}
		else
			if (subMenuflag === 0) {
				for (var i = 0; i < subMenulst[subMenuidx].childNodes.length; i++) {
					if (subMenulst[subMenuidx].childNodes[i].nodeType == 1) {
						urllist.push(subMenulst[subMenuidx].childNodes[i]);
					}
				}
				subMenuflag = 1;
				cururl = urllist[0];
				cururl.style.fontSize = "large";
				window.location.href = curbot.href;
				hrefidx += urllist.length * 200;
				phrefidx += urllist.length * 200;
			}
	}

	else if (controller.buttons[1].pressed) {
		Backtomenu();
	}

	//AXES
	const leftStickXAxis = Math.abs(controller.axes[0]);
	const leftStickYAxis = Math.abs(controller.axes[1]);
	const rightStickXAxis = Math.abs(controller.axes[2]);
	const rightStickYAxis = Math.abs(controller.axes[3]);
	if (leftStickXAxis > deadzone) {
		console.log(controller.axes[0]);
	}
	if (leftStickYAxis > deadzone) {
		console.log(controller.axes[1]);
	}
	if (rightStickXAxis > deadzone) {
		console.log(controller.axes[2]);
	}
	if (rightStickYAxis > deadzone) {
		console.log(controller.axes[3]);
	}
}

function svDriveSteeringWheel(controller) {
	if (controller.buttons[0]) {
		console.log('A button pressed')
	}
	if (controller.buttons[1]) {
		console.log('B button pressed')
	}
	if (controller.buttons[2]) {
		console.log('X button pressed')
	}
	if (controller.buttons[3]) {
		console.log('Y button pressed')
	}
	if (controller.buttons[4].pressed || controller.buttons[5].pressed) {
		console.log('Bumper pressed')
		lookHorizontalSteeringWheel(controller);
	}
	if (controller.buttons[6].pressed || controller.buttons[7].pressed) {
		let xboxScheme = document.getElementById("picture");
		if (isSchemeOn === true) {
			let image = document.getElementById("controller-scheme");
			xboxScheme.removeChild(image);
			isSchemeOn = false;
		} else {
			let image = new Image();
			image.src = "../assets/svDriveGamepad.png";
			image.id = "controller-scheme";
			xboxScheme.appendChild(image);
			isSchemeOn = true;
		}
	}
	if (controller.buttons[8]) {
		console.log('Right stick pressed')
	}
	if (controller.buttons[9]) {
		console.log('Left stick pressed')
	}
	if (controller.axes[0] !== 0) {
		console.log(`Wheel rotated: ${controller.axes[0]}`)
		handleTurningSteeringWheel(controller)
	}
	if (controller.axes[1] !== 0) {
		console.log(`Gas pedal pressed: ${controller.axes[1]}`)
		handleThrottleSteeringWheel(controller)
	}
	if (controller.axes[2] !== 0) {
		console.log(`Brake pedal pressed: ${controller.axes[2]}`)
		handleThrottleSteeringWheel(controller)
	}
}

//Do things if on the drive page
function svDriveController(controller) {
	if (controller.buttons[0].pressed) {
		console.log(`Button 0 pressed`);
	}

	if (controller.buttons[1].pressed) { //TODO: verify I work!
		if(window.confirm('Are you sure you would like to return to the menu?') === true) {
			window.location.href = "index.html";
		}
	}

	if (controller.buttons[8].pressed || controller.buttons[9].pressed) {
		let xboxScheme = document.getElementById("picture");
		if (isSchemeOn === true) {
			let image = document.getElementById("controller-scheme");
			xboxScheme.removeChild(image);
			isSchemeOn = false;
		} else {
			let image = new Image();
			image.src = "../assets/svDriveGamepad.png";
			image.id = "controller-scheme";
			xboxScheme.appendChild(image);

			isSchemeOn = true;
		}
	}

	//collect axes values, and then check their validity
	const leftStickXAxis = Math.abs(controller.axes[0]);
	const leftStickYAxis = Math.abs(controller.axes[1]);
	const rightStickXAxis = Math.abs(controller.axes[2]);
	const rightStickYAxis = Math.abs(controller.axes[3]);

	if (leftStickXAxis > deadzone) {
		handleTurning(controller);
	}
	if (leftStickYAxis > deadzone) {
		handleThrottle(controller);
	}
	if (rightStickXAxis > deadzone) {
		lookHorizontal(controller);
	}
	if (rightStickYAxis > deadzone) {
		lookVertical(controller);
	}
}

//** BUTTON HANDLERS **//

/*Controller Scheme Xbox/PS4 TODO: define these!
A/X = 0
B/Circle = 1
X/Square = 2
Y/Triangle = 3
R1 = 5
R2 = 7
RS = 11
L1 = 4
L2 = 6
LS = 10
Dpad L = 14
Dpad R = 15
Dpad U = 12
Dpad D = 13
Start = 9
Options = 8
*/

/* Steering Wheel Controller Scheme
A = 0
B = 1
X = 2
Y = 3
Right bumper = 4
Left bumper = 5
Start = 6
Select = 7
Right stick = 8
Left stick = 9
Home button = 10
Wheel = axis 0
Gas pedal = axis 1
Brake pedal = axis 2
*/

// controlller implementation
function LookVerticalController(controller) {
	let pitch = _display.pitch - controller.axes[3] * 10;

	//bound checks
	if (pitch > 90) pitch = 90;
	else if (pitch < -90) pitch = -90;

	_display.pitch = pitch;
	_panorama.setPov({ heading: _display.heading, pitch: _display.pitch });
}

function LookHorizontalController(controller) {
	_display.heading += controller.axes[2] * 10;
	_panorama.setPov({ heading: _display.heading, pitch: _display.pitch });
}

function HandleThrottleController(controller){
	let heading;
	let links = _panorama.getLinks();
	if (controller.axes[1] > 0) heading = _display.vehicleHeading - 180;
	else heading = _display.vehicleHeading;

	let minDifferenceIndex;
	let minDifference = 360;
	for (let i = 0; i < links.length; ++i) {
		let leftDiff = Math.abs(heading - links[i].heading);
		let rightDiff = 360 - leftDiff;
		let diff = Math.min(leftDiff, rightDiff);
		if (diff < minDifference && diff < 45) {
			minDifference = diff;
			minDifferenceIndex = i;
		}
	}

	if (minDifferenceIndex === undefined) return;
	_display.processSVData({ location: { pano: `${links[minDifferenceIndex].pano}`, } }, "OK");
}
function HandleTurningController(controller){
	let heading;
	let links = _panorama.getLinks();

	if (controller.axes[1] > 0) { //TODO: abstract these to their specific turns
		heading = _display.vehicleHeading + 90;
		if (heading > 360) heading = heading - 360;
	}
	else {
		heading = _display.vehicleHeading - 90;
		if (heading <= 0) heading = 360 + heading;
	}

	let minDifferenceIndex;
	let minDifference = 360;
	for (let i = 0; i < links.length; ++i) {
		let leftDiff = Math.abs(heading - links[i].heading);
		let rightDiff = 360 - leftDiff;
		let diff = Math.min(leftDiff, rightDiff);
		if (diff < minDifference && diff < 45) {
			minDifference = diff;
			minDifferenceIndex = i;
		}
	}
	if (minDifferenceIndex === undefined) return;

	if (controller.axes[1] > 0)
		_display.heading += minDifference;
	else
		_display.heading -= minDifference;

	_display.vehicleHeading = links[minDifferenceIndex].heading;
	_display.processSVData({ location: { pano: `${links[minDifferenceIndex].pano}`, } }, "OK");
}

// steering wheel implementation
function lookHorizontalSteeringWheel(controller) {
	if (controller.buttons[4].pressed) _display.heading += 15;
	else if (controller.buttons[5].pressed) _display.heading -= 15;
	_panorama.setPov({ heading: _display.heading, pitch: _display.pitch });
}

function handleThrottleSteeringWheel(controller) {
	console.log("throttle pressed! ", controller.axis[1]);
}

function handleTurningSteeringWheel(controller) {
	console.log("steering wheel value: ", controller.axis[0]);

}

// menu implementation
function getPath() {
	if (window.location.pathname === "/html/index.html" || window.location.pathname === "/svDrive/html/index.html") {
		return "index";
	} else if (window.location.pathname === "/html/drive.html" || window.location.pathname === "/svDrive/html/drive.html") {
		return "drive";
	} else {
		alert("unknow path");
		return "unknown";
	}
}

function Dpadchange(flag) {
	//preidx: indx of prenode 
	preidx = botidx;
	if (flag == 1)
		botidx -= 1;
	else
		botidx += 1;
	prebot = document.getElementById((Math.abs(preidx) % botlen).toString());
	curbot = document.getElementById((Math.abs(botidx) % botlen).toString());
	prebot.style.fontSize = "medium";
	curbot.style.fontSize = "large";
}

function Urlchange(flag) {
	//preidx: indx of prenode 
	phrefidx = hrefidx;
	if (flag == 1)
		hrefidx -= 1;
	else
		hrefidx += 1;
	preurl = urllist[Math.abs(phrefidx) % urllist.length];
	cururl = urllist[Math.abs(hrefidx) % urllist.length];
	preurl.style.fontSize = "medium";
	cururl.style.fontSize = "large";
}

function Backtomenu() {
	urllist.length = 0;
	subMenuflag = 0;
	window.location.href = "#";
	cururl.style.fontSize = "medium";
	hrefidx = 0;
	phrefidx = 0;
}
