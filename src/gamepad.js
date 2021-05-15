//TODO: move ME!
let isGamepad = false;

//circle indicating the status of the controller
const controllerStatus = document.querySelector("circle");

//flag to display the controller scheme or not
let isSchemeOn = false;

//Defines the deadzone for controller axes
const deadzone = 0.8;

//setInterval id (used in clearInterval())
let chooseControlsEventId = 0;

//flag to engage or disengage throttle
let isThrottleOn = false;

//button indeces dependent on wheel or gamepad
let a;
let b; 
let x;
let y;
let r1;
let rsB;
let l1;
let lsB;
let start;
let options;
let dpadUp;
let dpadDown;
let dpadLeft;
let dpadRight;

//axes indeces dependent on wheel or gamepad
let r2;
let rsX;
let rsY;
let l2;
let lsX;
let lsY;

//stock functions to be binded to wheel or gamepad functions
function handleDirection(controller) {};
function handleXMovement(controller) {};
function handleYMovement(controller) {};
function lookHorizontal(controller) {};
function lookVertical(controller) {};

// Upon controller detection assign abstracted variables and functions appropriately
window.addEventListener("gamepadconnected", (e) => {
	//TODO: sort out Dpad for steering wheel
	controllerStatus.setAttribute("fill", "green");
	if(isGamepad) {
		//button indeces
		a = 0;
		b = 1;
		x = 2;
		y = 3;
		r1 = 5;
		rsB = 11;
		l1 = 4;
		lsB = 10;
		dpadLeft = 14;
		dpadRight= 15;
		dpadUp = 12;
		dpadDown = 13;
		start = 9;
		options = 8;

		//axis indeces
		lsX = 0;
		lsY = 1;
		rsX = 2;
		rsY = 3;
		l2 = 6;
		r2 = 7;

		// handleDirection = handleDirectionGamepad;
		handleXMovement = handleXMovementGamepad;
		handleYMovement = handleYMovementGamepad;
		handleDirection = handleDirectionGamepad;
		lookHorizontal = lookHorizontalGamepad;
		lookVertical = lookVerticalGamepad;
	} 
	else if(!isGamepad) {
		//button indeces
		a = 0;
		b = 1;
		x = 2;
		y = 3;
		r1 = 4;
		rsB = 8;
		l1 = 5;
		lsB = 9;
		start = 6;
		options = 7;

		//axis indeces
		lsX = 0;
		r2 = 1;
		l2 = 2;

		handleDirection = handleDirectionSteeringWheel;
		lookHorizontal = lookHorizontalSteeringWheel;
	}

	chooseControlsEventId = setInterval(chooseControls, 750);
});

window.addEventListener("gamepaddisconnected", (event) => {
	controllerStatus.setAttribute("fill", "red");
	clearInterval(chooseControlsEventId);
});

// Determine which control scheme to use based on page and controller type
function chooseControls() {
	let controller = navigator.getGamepads()[0];
	if (controller === undefined) {
		clearInterval(chooseControlsEventId);
		return;
	}

	if (path === "index") {
		menuControls(controller);
	}
	else if(path === "drive") {
		if (isGamepad) svDriveGamepad(controller);
		else if (!isGamepad) svDriveSteeringWheel(controller);
		// TODO: decide if button assignment should be here instead of gamepadConnected
	}
}

//** INPUT POLLING **//

//variables for navigating menu
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

function menuControls(controller) {
	if (loadedMenu === false) {
		option = MM;
		option.style.fontSize = "large";
		//close the accordian menu
		window.location.href = "#";
		loadedMenu = true;
	}
	if (controller.buttons[dpadDown].pressed) {
		//set flag or DpadChange function , 0 is go down
		if (subMenuflag === 1)
			urlChange(0);
		else
			DpadChange(0);
	}
	else if (controller.buttons[dpadUp].pressed) {
		//set flag or DpadChange function , 0 is go up
		if (subMenuflag === 1)
			urlChange(1);
		else
			DpadChange(1);
	}
	else if (controller.buttons[a].pressed) {
		var subMenuidx;
		subMenuidx = (Math.abs(botidx) - 1) % 5;
		if (subMenuflag === 1) {
			if (Math.abs(hrefidx) % urllist.length == urllist.length - 1)
				backToMenu();
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
	else if(controller.buttons[b].pressed) {
		backToMenu();
	}
}

function svDriveSteeringWheel(controller) {
	if (controller.buttons[b].pressed) {
		if(window.confirm('Are you sure you would like to return to the menu?') === true) {
			backToMenu();
		}
	}
	if (controller.buttons[l1].pressed || controller.buttons[r1].pressed) {
		lookHorizontal(controller);
	}
	if (controller.buttons[options].pressed || controller.buttons[start].pressed) {
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
	if (controller.axes[r2] < 0) {
		isThrottleOn = true;
	}
	if (controller.axes[l2] < 0.5) {
		isThrottleOn = false;
	}
	if(isThrottleOn) {
		handleDirection(controller);
	}
}

function svDriveGamepad(controller) {
	if (controller.buttons[b].pressed) {
		if(window.confirm('Are you sure you would like to return to the menu?') === true) {
			window.location.href = "index.html";
		}
	}
	if (controller.buttons[options].pressed || controller.buttons[start].pressed) {
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
	const leftStickXAxis = Math.abs(controller.axes[lsX]);
	const leftStickYAxis = Math.abs(controller.axes[lsY]);
	const rightStickXAxis = Math.abs(controller.axes[rsX]);
	const rightStickYAxis = Math.abs(controller.axes[rsY]);

	if (rightStickXAxis > deadzone) {
		lookHorizontal(controller);
	}
	if(rightStickYAxis > deadzone) {
		lookVertical(controller);
	}
	if(leftStickXAxis > deadzone) {
		handleXMovement(controller);
	}
	if(leftStickYAxis > deadzone) {
		handleYMovement(controller);
	}
	if (controller.buttons[r2].touched === true) {
		isThrottleOn = true;
	}
	if (controller.buttons[l2].touched === true) {
		isThrottleOn = false;
	}
	if(isThrottleOn) {
		handleDirection(controller);
	}

}

//** BUTTON HANDLERS **//

// gamepad implementation
function lookVerticalGamepad(controller) {
	let pitch = _display.pitch - controller.axes[rsY] * 10;

	//bound checks
	if (pitch > 90) pitch = 90;
	else if (pitch < -90) pitch = -90;

	_display.pitch = pitch;
	_panorama.setPov({ heading: _display.heading, pitch: _display.pitch });
}

function lookHorizontalGamepad(controller) {
	_display.heading += controller.axes[rsX] * 10;
	_panorama.setPov({ heading: _display.heading, pitch: _display.pitch });
}

function handleYMovementGamepad(controller){
	let heading;
	let links = _panorama.getLinks();
	if (controller.axes[lsY] > 0) heading = _display.vehicleHeading - 180;
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
function handleXMovementGamepad(controller){
	let heading;
	let links = _panorama.getLinks();

	if (controller.axes[lsX] > 0) {
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

	if (controller.axes[lsX] > 0)
		_display.heading += minDifference;
	else
		_display.heading -= minDifference;

	_display.vehicleHeading = links[minDifferenceIndex].heading;
	_display.processSVData({ location: { pano: `${links[minDifferenceIndex].pano}`, } }, "OK");
}

function handleDirectionGamepad(controller) {
	let links = _panorama.getLinks();
	let wheelDiff = controller.axes[lsX] * 90;
	let newHeading = _display.heading + wheelDiff;
	if(newHeading <= 0) newHeading += 360;
	else if(newHeading > 360) newHeading -= 360;
	

	let minDifferenceIndex;
	let minDifference = 360;
	for (let i = 0; i < links.length; ++i) {
		let leftDiff = Math.abs(newHeading - links[i].heading);
		let rightDiff = 360 - leftDiff;
		let diff = Math.min(leftDiff, rightDiff);
		if (diff < minDifference && diff < 90) {
			minDifference = diff;
			minDifferenceIndex = i;
		}
	}

	if (minDifferenceIndex === undefined) return;
	_display.vehicleHeading = links[minDifferenceIndex].heading;
	_display.heading = _display.vehicleHeading;
	_display.processSVData({ location: { pano: `${links[minDifferenceIndex].pano}`, } }, "OK");

}

// steering wheel implementation
function lookHorizontalSteeringWheel(controller) {
	if (controller.buttons[r1].pressed) _display.heading += 15;
	else if (controller.buttons[l1].pressed) _display.heading -= 15;
	_panorama.setPov({ heading: _display.heading, pitch: _display.pitch });
}

function handleDirectionSteeringWheel(controller) {
	let links = _panorama.getLinks();
	let wheelDiff = controller.axes[lsX] * 90;
	let newHeading = _display.heading + wheelDiff;
	if(newHeading <= 0) newHeading += 360;
	else if(newHeading > 360) newHeading -= 360;
	

	let minDifferenceIndex;
	let minDifference = 360;
	for (let i = 0; i < links.length; ++i) {
		let leftDiff = Math.abs(newHeading - links[i].heading);
		let rightDiff = 360 - leftDiff;
		let diff = Math.min(leftDiff, rightDiff);
		if (diff < minDifference && diff < 90) {
			minDifference = diff;
			minDifferenceIndex = i;
		}
	}

	if (minDifferenceIndex === undefined) return;
	_display.vehicleHeading = links[minDifferenceIndex].heading;
	_display.heading = _display.vehicleHeading;
	_display.processSVData({ location: { pano: `${links[minDifferenceIndex].pano}`, } }, "OK");

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

function DpadChange(flag) {
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

function urlChange(flag) {
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

function backToMenu() {
	urllist.length = 0;
	subMenuflag = 0;
	window.location.href = "#";
	cururl.style.fontSize = "medium";
	hrefidx = 0;
	phrefidx = 0;
}
