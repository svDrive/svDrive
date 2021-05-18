// Sets a sanitized copy of the input string as the current API-Key.
function setAPIKey(unsanitizedInput) {
  let sanitizedInput = sanitizeGMapKey(unsanitizedInput);
  localStorage.setItem("API-KEY", sanitizedInput);
}
// Sets a deviceflag to swtich between controller or steeringwheel.
function setDeviceflag(flag){
  localStorage.setItem("Deviceflag",flag);
}
// Removes all charcaters which are invalid for a Google Maps API Key from the input string.
// Aggressively eleminates XXS attempts, as nearly every special character is removed.
function sanitizeGMapKey(unsanitizedInput) {
  let cleanInput = String();
  let testChar = "";
  for (var pos = 0; pos < unsanitizedInput.length; pos++) {
    testChar = unsanitizedInput.charAt(pos);
    if (_validCharacterSet.includes(testChar)) cleanInput += testChar;
  }
  return cleanInput;
}

function drive() {
  window.location.replace("drive.html");
}

/*****************************
Welcome configuration modal
*****************************/
window.addEventListener("load", function () {
  //Keeps modal from closing by clicking outside it
  $("#welcomeModal").modal({
    backdrop: "static",
    keyboard: false,
  });
  if (
    localStorage.getItem("API-KEY") == undefined ||
    localStorage.getItem("CONTROLLER-TYPE") == undefined
  ) {
    $("#welcomeModal").modal("show");
  }
});

const welcomeApiInput = document.querySelector("#API-Key1");
const welcomeControllerInput = document.getElementsByName("controllerType1");
const welcomeSetButton = document.querySelector("#welcomeSet");
welcomeSetButton.addEventListener("click", function () {
  if (welcomeApiInput.value != "") {
    setAPIKey(welcomeApiInput.value);
  } else {
    window.alert("Must enter an API Key!");
    return;
  }
  for (let i = 0; i < welcomeControllerInput.length; i++) {
    if (welcomeControllerInput[i].checked) {
      localStorage.setItem("CONTROLLER-TYPE", welcomeControllerInput[i].value);
    }
  }
  $("#welcomeModal").modal("hide");
});

/*****************************
API KEY configuration modal
*****************************/

const apiInput = document.getElementById("API-Key2");
const apiSetButton = document.querySelector("#apiSet");
apiSetButton.addEventListener("click", function (event) {
  if (apiInput.value != "") {
    setAPIKey(apiInput.value);
    apiInput.value = "";
    $("#apiKeyModal").modal("hide");
  } else {
    window.alert("API Key input is blank");
  }
});

/*****************************
Controller configuration modal
*****************************/

const controllerInput = document.getElementsByName("controllerType2");
const controllerSetButton = document.querySelector("#controllerSet");

controllerSetButton.addEventListener("click", function () {
  for (let i = 0; i < controllerInput.length; i++) {
    if (controllerInput[i].checked) {
      localStorage.setItem("CONTROLLER-TYPE", controllerInput[i].value);
    }
  }
  $("#controllerModal").modal("hide");
});


/*********************************
 Starting Location modal 
 *********************************/
function startDrive(){

  const startInput = document.getElementById("start-Point"); 

  if(startInput.value){
    setStartingLocation(startInput.value);
    startInput.value = "";
    $("#apiKeyModal").modal("hide"); 
  }


  // TO-DO: work in-progess Dynamically load the address panaroma frame on the drive.html page. 

}


// Santize the starting address string.
function setStartingLocation(unsanitizedInput) {
  let sanitizedInput = sanitizeAddress(unsanitizedInput);
  localStorage.setItem("STARTING-ADDRESS", sanitizedInput);
}

// Removes all charcaters which are invalid for starting address from the input string.
// Aggressively eleminates XXS attempts, as nearly every special character is removed.
function sanitizeAddress(unsanitizedInput) {
  let cleanInput = String();
  let testChar = "";
  for (var pos = 0; pos < unsanitizedInput.length; pos++) {
    testChar = unsanitizedInput.charAt(pos);
    if (_validAddress.includes(testChar)) cleanInput += testChar;
  }
  return cleanInput;
}