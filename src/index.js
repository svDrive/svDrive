const statusButton = document.querySelector("circle");

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

var controller = {};
var buttons = [];
var axis = [];

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
			if (controller.axes[i] > 0.5 || controller.axes[i] < -0.5) {
				console.log(controller.axes[i]);
                console.log(axis);
                if(axis.length === 0){
				    axis.push(controller.axes);
                }
                else{
                    axis.splice(0, 1, controller.axes);   
                }
			}
		}
}}

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
	for (var i = 0; i < axis.length; ++i) {
		if (axis[i] == axis) {
			touched = true;
		}
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
	if (buttonPressHandler(0)) {
		console.log(`Button 0 pressed`);
		updateHandler();
	}

    else if (buttonPressHandler(1)) {
		console.log(`Button 1 pressed`);
		updateHandler();
	} 
   
    else if(axesPressHandler(0)){
		console.log('axis is ' +axis);
		updateHandler();
    }
    else updateHandler();
}
