/* 
    This function is a callback that triggers when there is an error authenticating the Google Maps API.
    The error can be one of many things, so refer to the authentication errors reference in the Google Maps API.
    https://developers.google.com/maps/documentation/javascript/error-messages
*/
function gm_authFailure() { 
    alert("Invalid API key!")
    window.location.replace("index.html")
};

/*
    Dynamically load the Google Maps API.
*/
function loadMapsScript() {
    var script = document.createElement('script');
    var apiKey = localStorage.getItem("API-KEY")
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=run';
    script.async = true;
    document.head.appendChild(script);
}

/*
    This function is supplied as a callback to the dynmically loaded Google Maps Script.
    This is the entry point of the 'Game'.
    
*/
function run() {
    let fourthAveBuilding = { lat: 45.5095048, lng: -122.681455 };
    _display = new Display(fourthAveBuilding);
}

window.addEventListener("load", loadMapsScript())