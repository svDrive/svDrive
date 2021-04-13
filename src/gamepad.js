/*NOTES:
in Chrome Navigator. getGamepads needs a webkit prefix and the button values are stored
 as an array of double values, whereas in Firefox Navigator.getGamepads doesn't need a prefix, i
 and the button values are stored as an array of GamepadButton objects; it is the GamepadButton.
 value or GamepadButton.pressed properties of these we need to access, depending on what type 
 of buttons they are.
*/

//deadzone for axis controls
let deadzone = 0.8;

//getting the cirlce svg
const controllerStatus = document.querySelector("circle");

//flag to display the controller scheme or not
let schemeFlag = 0;

//setInterval id (used to clear interval in clearInterval())
let id= 0;

window.addEventListener("gamepadconnected", (e) => {
	//fills the circle with green on controller connect
	controllerStatus.setAttribute("fill", "green");
	id = setInterval(pollGamepads, 150);
});

window.addEventListener("gamepaddisconnected", (event) => {
	//fills the circle with red on controller disconnect
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

//TODO: Fix this experiment

function pollGamepads() {
	let controller= navigator.getGamepads()[0];

	if(controller == undefined){
		clearInterval(id);
		return 
	}

	if (controller.buttons[0].pressed) {
		console.log(`Button 0 pressed`);
	} 
    if (controller.buttons[1].pressed) {
		console.log(`Button 1 pressed`);
	}
	if (controller.buttons[8].pressed || controller.buttons[9].pressed) {
		let xboxScheme = document.getElementById("picture");
		if (schemeFlag === 1) {
			let image = document.getElementById("controller-scheme");
	        xboxScheme.removeChild(image);
            schemeFlag = 0;
        }
		else{
            let image = new Image();
			image.src = "../assets/svDriveGamepad.png"
			image.id = "controller-scheme"
	        xboxScheme.appendChild(image);

            schemeFlag = 1;
        }
	}
	//D-Pad
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
	//Axes
    if(Math.abs(controller.axes[0]) > deadzone){ //left stick X axis
		console.log(controller.axes[0])
    }
	if(Math.abs(controller.axes[1]) > deadzone){ //left stick Y axis
		console.log(controller.axes[1])
    }
	if(Math.abs(controller.axes[2]) > deadzone){ //right stick X axis
		console.log(controller.axes[2])
    }
	if(Math.abs(controller.axes[3]) > deadzone){ //right stick Y axis
		console.log(controller.axes[3])
    }
}