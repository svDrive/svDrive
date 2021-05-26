// Sets a sanitized copy of the input string as the current API-Key.
function setAPIKey(unsanitizedInput) {
  let sanitizedInput = sanitizeGMapKey(unsanitizedInput);
  localStorage.setItem("API-KEY", sanitizedInput);
}
// Sets a deviceflag to swtich between controller or steeringwheel.
function setDeviceflag(flag) {
  if (flag === 1) localStorage.setItem("CONTROLLER-TYPE", "gamepad");
  else localStorage.setItem("CONTROLLER-TYPE", "wheel");
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

const welcomeModal = document.getElementById("welcomeModal");
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
function startDrive() {
  let startInput = document.getElementById("start-Point");

  getGeoCodeInfo(startInput.value);
  startInput.value = "";
  $("#apiKeyModal").modal("hide");
}

// Pass user entered starting address as single argument
// Save formatted starting address into local storage
// This function usage Google geocode api.
// More information can be found here: https://developers.google.com/maps/documentation/geocoding/overview
let getGeoCodeInfo = function (address) {
  let apikey = localStorage.getItem("API-KEY");

  if (address === "") {
    window.alert("!!! REQUIRE !!!\n\nStarting address require");
  } else {
    const request = new Request(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address +
        "&key=" +
        apikey
    );

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          let split = data.results[0].geometry;
          let lat = split.location.lat;

          let lng = split.location.lng;

          let formatedAddress = data.results[0].formatted_address;

          localStorage.setItem("LATITUDE", lat);
          localStorage.setItem("LONGITUDE", lng);
          localStorage.setItem("START-ADDRESS", formatedAddress);

          // Call nearstRoadcoordinate
          getNearestRoadCoordinate();
        } else if (data.status === "ZERO_RESULTS") {
          window.alert(
            "!!! WARNING !!!\n\nStatus code: ZERO_RESULTS\n\n\u2022Geocode was successful but returned no results"
          );
        } else if (data.status === "OVER_DAILY_LIMIT") {
          window.alert(
            "!!! WARNING !!!\n\nStatus code: OVER_DAILY_LIMIT\n\n\u2022The API key is missing or invalid.\n\u2022Billing has not been enabled on your account.\n\u2022A self-imposed usage cap has been exceeded.\n\u2022The provided method of payment is no longer valid (for example, a credit card has expired)."
          );
        }
      })

      .catch((err) => window.alert("!!! WARNING !!!\n\n" + err.message));
  }
};

// This function usage Google Nearest Roads api.
// More information can be found here: https://developers.google.com/maps/documentation/roads/nearest
let getNearestRoadCoordinate = function () {
  let lat = parseFloat(localStorage.getItem("LATITUDE"));
  let lon = parseFloat(localStorage.getItem("LONGITUDE"));
  let apiKey = localStorage.getItem("API-KEY");

  if (lat && lon && apiKey) {
    const request = new Request(
      "https://roads.googleapis.com/v1/nearestRoads?points=" +
        lat +
        "," +
        lon +
        "&key=" +
        apiKey
    );

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        let split = data.snappedPoints;
        let lat = split[0].location.latitude;
        let lon = split[0].location.longitude;

        // Modify latitude and longitude in local storage
        localStorage.setItem("LATITUDE", lat);
        localStorage.setItem("LONGITUDE", lon);

        // Load drive.html page with new starting location
        loadDriveHTML();
      })
      .catch((err) => window.alert("!!! WARNING !!!\n\n" + err.message));
  } else {
    window.alert(
      "!!! WARNING !!!\n\nLatitude, Longitude, or Google API key not available in local storage"
    );
  }
};

let loadDriveHTML = function () {
  window.location = "drive.html";
};
