//circle indicating the status of the controller
const controllerStatus = document.querySelector("circle");

//flag to display the controller scheme or not
let isSchemeOn = false;

//Defines the deadzone for controller axes
const deadzone = 0.8;

//setInterval id (used in clearInterval())
let id= 0;

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

function pollGamepads() {
	let controller= navigator.getGamepads()[0];

	if(controller == undefined){
		clearInterval(id);
		return 
	}

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
        }
		else{
            let image = new Image();
			image.src = "../assets/svDriveGamepad.png"
			image.id = "controller-scheme"
	        xboxScheme.appendChild(image);

            isSchemeOn = true;
        }
	}
	if (controller.buttons[12].pressed) {
		console.log(`Button 12 pressed`);
	} 
	if (controller.buttons[13].pressed) {
		console.log(`Button 13 pressed`);
	} 
	if (controller.buttons[14].pressed) {
		console.log(`Button 14 pressed`);
	} 
	if (controller.buttons[15].pressed) {
		console.log(`Button 15 pressed`);
	}

	//AXES
	const leftStickXAxis = Math.abs(controller.axes[0]);
	const leftStickYAxis = Math.abs(controller.axes[1]);
	const rightStickXAxis = Math.abs(controller.axes[2]);
	const rightStickYAxis = Math.abs(controller.axes[3]);
    if(leftStickXAxis > deadzone){
		console.log(controller.axes[0])
    }
	if(leftStickYAxis > deadzone){
		console.log(controller.axes[1])
    }
	if(rightStickXAxis > deadzone){
		console.log(controller.axes[2])
    }
	if(rightStickYAxis > deadzone){
		console.log(controller.axes[3])
    }
}