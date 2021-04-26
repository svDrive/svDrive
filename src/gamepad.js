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
	if (window.location.pathname === "/html/index.html") {
		return "index";
	} else if (window.location.pathname === "/html/drive.html") {
		return "drive";
	} else {
		alert("unknow path");
		return "unknown";
	}
}

//MMD: Main Menu Drive!
//
let MM = document.getElementById("1");
let MMD = document.getElementById("MMD");
let MMS2 = document.getElementById("MMS2");
let API = document.getElementById("2");
let EK = document.getElementById("EK");
let AK = document.getElementById("AK");
let option;
let loadedMenu = false;
let path = getPath();
let botidx=2001;
var preidx=2001;
let hrefidx=0;
let phrefidx=0;
let botlen=5;

let prebot;
let curbot;
let preurl;
let cururl;
let subMenulst=document.getElementsByClassName("subMenu");
let subMenuflag=0;
let urllist=[];
function pollGamepads() {
	let controller = navigator.getGamepads()[0];


	if (controller == undefined) {
		clearInterval(id);
		return;
	}

	//Do things if on the index page
	if (path === "index") {
		if (loadedMenu === false) {
			alert("Dpad up and Dpad down to move, x/a is select, and circle/b closes the accordian");
			console.log("option changed to MM");
			option = MM;
			option.style.fontSize = "large";
			//close the accordian menu
			window.location.href = "#";
			loadedMenu = true;
		}

		//Dpad Down
		if (controller.buttons[13].pressed) {
			//set flag or Dpadchange function , 0 is go down
			if(subMenuflag==1)
				Urlchange(0);
			else
				Dpadchange(0);
			//came from Main Menu
			/*
			if (option === MM) {
				option.style.fontSize = "medium";

				console.log("option changed to API");
				option = API;
				option.style.fontSize = "large";
			}

			//we know we came from Main Menu Drive button
			if (option === MMD) {
				option.style.fontSize = "medium";

				console.log("option changed to MMS2");
				option = MMS2;
				option.style.fontSize = "large";
			}

			//Came From Enter Key
			if (option === EK) {
				option.style.fontSize = "medium";

				console.log("option changed to AK");
				option = AK;
				option.style.fontSize = "large";
			}*/
		}

		//Dpad UP
		else if (controller.buttons[12].pressed) {
			//set flag or Dpadchange function , 0 is go up
			if(subMenuflag==1)
				Urlchange(1);
			else
				Dpadchange(1);
			//came from API option
			/*
			if (option === API) {
				option.style.fontSize = "medium";

				console.log("option changed to MM");
				option = MM;
				option.style.fontSize = "large";
			}

			//we came from Main Menu Selection 2
			if (option === MMS2) {
				option.style.fontSize = "medium";

				console.log("option changed to MMD");
				option = MMD;
				option.style.fontSize = "large";
			}

			//Came from AK
			if (option === AK) {
				option.style.fontSize = "medium";

				console.log("option changed to EK");
				option = EK;
				option.style.fontSize = "large";
			}*/
		}

		
		else if(controller.buttons[0].pressed){
			var subMenuidx;
			subMenuidx=(Math.abs(botidx)-1)%5;			
			//console.log(subMenulst[subMenuidx]);
			//console.log(subMenulst[subMenuidx].childNodes.length);
			if(subMenuflag==1)
				window.location.href=urllist[Math.abs(hrefidx)%urllist.length].href;
			else
			if(subMenuflag==0){
				for(var i=0;i<subMenulst[subMenuidx].childNodes.length;i++){
					if(subMenulst[subMenuidx].childNodes[i].nodeType==1){
						urllist.push(subMenulst[subMenuidx].childNodes[i]);
						//console.log(subMenulst[subMenuidx].childNodes[i]);
					}
				}
				subMenuflag=1;
				cururl=urllist[0];
				cururl.style.fontSize = "large";
				window.location.href=curbot.href;
				hrefidx+=urllist.length*200;
				phrefidx+=urllist.length*200;	
			}
			
			//console.log(subMenulst.length);
			
			
			
		}
		else if (controller.buttons[1].pressed) {
			urllist.length=0;
			subMenuflag=0;
			window.location.href="#";
			cururl.style.fontSize = "medium";
			hrefidx=0;
			phrefidx=0;		
			/*
			if (option === MMD || option === MMS2) {
				MMD.style.fontSize = "medium";
				MMS2.style.fontSize = "medium";
				console.log("option changed to MM");
				option = MM;
				option.style.fontSize = "large";
				window.location.href = "#";
			}

			if (option === EK || option === AK) {
				EK.style.fontSize = "medium";
				AK.style.fontSize = "medium";
				console.log("option changed to API");
				option = API;
				option.style.fontSize = "large";
				window.location.href = "#";
			}*/
		}
		/*
		//Open Main Menu
		else if (controller.buttons[0].pressed && option === MM) {
			path = getPath();
			window.location.href = "#mainMenu";
			console.log("option changed to MMD");
			option = MMD;
			option.style.fontSize = "large";
		}

		//Open API Menu
		else if (controller.buttons[0].pressed && option === API) {
		 	path = getPath();
			window.location.href = "#apiKey";
			console.log("option changed to API");
			option = EK;
			option.style.fontSize = "large";
		}

		//open the drive page
		else if (controller.buttons[0].pressed && option === MMD) {
			window.location.href = "drive.html";
			console.log("option changed to MMD");
			option = MMD;
			option.style.fontSize = "large";
		}*/

		//Close the menu when circle is pressed
		/*
		else if (controller.buttons[1].pressed) {
			if (option === MMD || option === MMS2) {
				MMD.style.fontSize = "medium";
				MMS2.style.fontSize = "medium";
				console.log("option changed to MM");
				option = MM;
				option.style.fontSize = "large";
				window.location.href = "#";
			}

			if (option === EK || option === AK) {
				EK.style.fontSize = "medium";
				AK.style.fontSize = "medium";
				console.log("option changed to API");
				option = API;
				option.style.fontSize = "large";
				window.location.href = "#";
			}
		}
		*/
		//BUTTONS
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

	//Do things if on the drive page
	if (path === "drive") {
		console.log("in drive path");
		//BUTTONS
		if (controller.buttons[0].pressed) {
			console.log(`Button 0 pressed`);
		}

		if (controller.buttons[1].pressed) {
			console.log(`Button 1 pressed`);
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
}

function Dpadchange(flag){
	//preidx: indx of prenode 
	preidx=botidx;
	if(flag==1)
		botidx-=1;
	else
		botidx+=1;
	prebot=document.getElementById((Math.abs(preidx)%botlen).toString());
	curbot=document.getElementById((Math.abs(botidx)%botlen).toString());
	prebot.style.fontSize ="medium";
	curbot.style.fontSize = "large";
}

function Urlchange(flag){
	//preidx: indx of prenode 
	phrefidx=hrefidx;
	if(flag==1)
		hrefidx-=1;
	else
		hrefidx+=1;
	//console.log("prehref:"+phrefidx);
	//console.log("curhref:"+hrefidx);
	preurl=urllist[Math.abs(phrefidx)%urllist.length];
	cururl=urllist[Math.abs(hrefidx)%urllist.length];
	preurl.style.fontSize ="medium";
	cururl.style.fontSize = "large";
}


