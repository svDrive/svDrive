/*NOTES:
in Chrome Navigator. getGamepads needs a webkit prefix and the button values are stored
 as an array of double values, whereas in Firefox Navigator.getGamepads doesn't need a prefix, i
 and the button values are stored as an array of GamepadButton objects; it is the GamepadButton.
 value or GamepadButton.pressed properties of these we need to access, depending on what type 
 of buttons they are.
*/

var controller = {};
var buttons = [];
var axis = [];

//deadzone for axis, handler doesn't trip unless input > or < deadzone 
var posDeadzone = 0.8;
var negDeadzone = -0.8;

//getting the cirlce svg
const statusButton = document.querySelector("circle");

//axis directions
var lsL = 0;
var lsR = 0;
var lsU = 0;
var lsD = 0;
var rsL = 0;
var rsR = 0;
var rsU = 0;
var rsD = 0;

var flag = 0;

window.addEventListener("gamepadconnected", (e) => {
	controller = e.gamepad;
	console.log(e.gamepad);
	gp = e.gamepad;
	console.log(
		"Gamepad connected at index %d\nName: %s\nNumber of Buttons: %d\nAvailable axes: %d",
		gp.index,
		gp.id,
		gp.buttons.length,
		gp.axes.length
	);

	//fills the circle with green on controller connect
	statusButton.setAttribute("fill", "green");
	pollGamepads();
});

window.addEventListener("gamepaddisconnected", (event) => {
	gp = event.gamepad;
	console.log("Gamepad %s disconnected from index %d", gp.id, gp.index);

	//fills the circle with red on controller disconnect
	statusButton.setAttribute("fill", "red");
});

function updateHandler() {
	buttons = [];
	if (controller.buttons) {
		for (var b = 0; b < controller.buttons.length; ++b) {
			if (controller.buttons[b].pressed) {
				console.log(b);
				buttons.push(b);
			}
		}
	}

	if (controller.axes) {
		for (var i = 0; i < controller.axes.length; ++i) {
			if (
				controller.axes[i] > posDeadzone ||
				controller.axes[i] < negDeadzone
			) {
				console.log(controller.axes[i]);
                axis.splice(0, 1, controller.axes);
                lsR = axis[0][0];
                lsL = axis[0][0];
                lsU = axis[0][1];
                lsD = axis[0][1];
                rsR = axis[0][2];
                rsL = axis[0][2];
                rsU = axis[0][3];
                rsD = axis[0][3];

				console.log("axis[0][0] " + axis[0][0]);
				console.log("axis[0][1] " + axis[0][1]);
				console.log("axis[0][2] " + axis[0][2]);
				console.log("axis[0][3] " + axis[0][3]);
                return axis;
			}
		}
	}
}

function buttonPressHandler(button) {
	var press = false;
	for (var i = 0; i < buttons.length; ++i) {
		if (buttons[i] == button) {
			press = true;
		}
	}
	return press;
}

function axesPressHandler(axis) {
	var touched = false;
	if (axis > posDeadzone || axis < negDeadzone) {
		touched = true;
	}
	return touched;
}

if (!("ongamepadconnected" in window)) {
	setInterval(pollGamepads, 150);
}

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

//do something with the presses
function pollGamepads() {

    //when button 0 is pressed...
	if (buttonPressHandler(0)) {
		console.log(`Button 0 pressed`);
		updateHandler();
	} 
    
    else if (buttonPressHandler(1)) {
		console.log(`Button 1 pressed`);
		updateHandler();
	}
		
	else if (buttonPressHandler(12)) {
        var xboxScheme = document.getElementById("picture");
		if (flag === 1) {
			var image = document.getElementById("controller-scheme");
	        xboxScheme.removeChild(image);
            flag = 0;
        }
		updateHandler();
	}
		
    else if (buttonPressHandler(13)) {
        var xboxScheme = document.getElementById("picture");

        if(flag === 0){
            var image = new Image();
			image.src = "../assets/svDriveGamepad.png"
			image.id = "controller-scheme"
	        xboxScheme.appendChild(image);

            flag = 1;
        }

		updateHandler();
	}
		


    //when left axis stick moves right...
    else if(axesPressHandler(lsR > posDeadzone)){
		console.log('lsR moved ' +axis);
        lsR = 0;
		updateHandler();
    }

    else if(axesPressHandler(lsL < negDeadzone)){
		console.log('lsL moved ' +axis);
        lsL = 0;
		updateHandler();
    }

    else if(axesPressHandler(lsU < negDeadzone)){
		console.log('lsU moved ' +axis);
        lsU = 0;
		updateHandler();
    }

    else if(axesPressHandler(lsD > posDeadzone)){
		console.log('lsD moved ' +axis);
        lsD = 0;
		updateHandler();
    }

    else if(axesPressHandler(rsR > posDeadzone)){
		console.log('rsR moved ' +axis);
        rsR = 0;
		updateHandler();
    }

    else if(axesPressHandler(rsL < negDeadzone)){
		console.log('rsL moved ' +axis);
        rsL = 0;
		updateHandler();
    }

    else if(axesPressHandler(rsU < negDeadzone)){
		console.log('rsU moved ' +axis);
        rsU = 0;
		updateHandler();
    }

    else if(axesPressHandler(rsD > posDeadzone)){
		console.log('rsD moved ' +axis);
        rsD = 0;
		updateHandler();
    }


	else updateHandler();
}
