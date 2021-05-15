//circle indicating the status of the controller
const controllerStatus = document.querySelector("circle");

//flag to display the controller scheme or not
let isSchemeOn = false;

//Defines the deadzone for controller axes
const deadzone = 0.8;

//setInterval id (used in clearInterval())
let id = 0;

window.addEventListener("gamepadconnected", (e) => {
	controllerStatus.setAttribute("fill", "green");
	id = setInterval(pollGamepads, 150);
});

window.addEventListener("gamepaddisconnected", (event) => {
	controllerStatus.setAttribute("fill", "red");
	clearInterval(id);
});

/*Controller Scheme Xbox/PS4
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

//Determine html page we're on
function getPath() {
	if (window.location.pathname.search("index") >= 0) {
		return "index";
	} else if (window.location.pathname.search("drive") >= 0) {
		return "drive";
	} else {
		alert("unknow path");
		return "unknown";
	}
}

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
let modallist;
let modalcontent=[]
let urllist = [];
let modal=document.getElementById('exampleModal');
function pollGamepads() {
	let controller = navigator.getGamepads()[0];

	if (controller == undefined) {
		clearInterval(id);
		return;
	}

	//Do things if on the index page
	if (path === "index") {
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
			//when the user is in the aipkey submenu, user only can move after closed the modal or firsttime enter the submenu
			if(subMenuflag === 1 && urllist[Math.abs(hrefidx) % urllist.length].id === "EK"  ){
				if (subMenuflag === 1 && modal.style.display =="none" || modal.style.display.length === 0)
					Urlchange(0);
			}
			else{
				if (subMenuflag === 1)
					Urlchange(0);
				if (subMenuflag ===0)
					Dpadchange(0);
			}
			
		}

		//Dpad UP
		else if (controller.buttons[12].pressed) {
			//set flag or Dpadchange function , 0 is go up
			if(subMenuflag === 1 && urllist[Math.abs(hrefidx) % urllist.length].id === "EK" ){
				if (subMenuflag === 1 && modal.style.display =="none" || modal.style.display.length === 0)
					Urlchange(1);
			}
			else{
				if (subMenuflag === 1)
					Urlchange(1);
				if (subMenuflag ===0)
					Dpadchange(1);
			}
		}
		
		else if (controller.buttons[0].pressed) {
			var subMenuidx;
			subMenuidx = (Math.abs(botidx) - 1) % 5;
			if (subMenuflag === 1) {
				//If user is in apikey submenu, open modal
				if (urllist[Math.abs(hrefidx) % urllist.length].id === "EK") {
					
					if(apiInput.value.length != 0){
						setAPIKey(apiInput.value);
						apiInput.value = "";
					}
					else
						urllist[Math.abs(hrefidx) % urllist.length].click();						
				}
				//If user is in the end of each submenu
				else if (Math.abs(hrefidx) % urllist.length == urllist.length - 1)
					Backtomenu();
				//If user is in other submenus, access the href
				else
					window.location.href = urllist[Math.abs(hrefidx) % urllist.length].href;
			}
			else
				if (subMenuflag === 0) {
					for (var i = 0; i < subMenulst[subMenuidx].childNodes.length; i++) {
						if (subMenulst[subMenuidx].childNodes[i].nodeType == 1) {
							if(subMenulst[subMenuidx].childNodes[i].id != "exampleModal")
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
			if (urllist[Math.abs(hrefidx) % urllist.length].id === "EK") {
				modal.style.display = "none";
			}
			else
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

	//If not in menu path, press 'b' to goback to menu page
	if (path != "index") {
		if (controller.buttons[1].pressed) {
			window.location.href = "index.html";
		}
	}

	//Do things if on the drive page
	if (path === "drive") {
		//BUTTONS
		if (controller.buttons[0].pressed) {
			console.log(`Button 0 pressed`);
		}

		if (controller.buttons[1].pressed) {
			console.log(`Button 1 pressed`);
		}

		if (controller.buttons[8].pressed) {
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

		//AXES
		const leftStickXAxis = Math.abs(controller.axes[0]);
		const leftStickYAxis = Math.abs(controller.axes[1]);
		const rightStickXAxis = Math.abs(controller.axes[2]);
		const rightStickYAxis = Math.abs(controller.axes[3]);
		if (leftStickXAxis > deadzone) {
			let heading;
			let links = _panorama.getLinks();

			if (controller.axes[1] > 0) {
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
		if (leftStickYAxis > deadzone) {
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
		if (rightStickXAxis > deadzone) {
			_display.heading += controller.axes[2] * 10;
			_panorama.setPov({ heading: _display.heading, pitch: _display.pitch })
		}
		if (rightStickYAxis > deadzone) {
			let pitch = _display.pitch - controller.axes[3] * 10;
			if (pitch > 90) {
				pitch = 90
			}
			if (pitch < -90) {
				pitch = -90
			}
			_display.pitch = pitch;
			_panorama.setPov({ heading: _display.heading, pitch: _display.pitch })
		}
	}
} // End pollGamepads

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
