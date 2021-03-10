let panorama;
let panoDiv = document.getElementById("pano");

// The Entry point function that get's called after the 'async' Google Map API script tag is loaded
function initMap() {
  const location = { lat: 45.5095048, lng: -122.681455};
  //const location = { lat: 45.5098, lng: -122.6805 }; //PSU, Fourth Ave Building
  const sv = new google.maps.StreetViewService();
  panorama = new google.maps.StreetViewPanorama(panoDiv);

  const options = {
    clickToGo: false,
    addressControl: false,
    fullscreenControl: false,
    linksControl: false,
    motionTracking: false,
    panControl: false,
    showRoadLabels: true,
    zoomControl: false,
  } 
  panorama.setOptions(options);

  sv.getPanorama({ location: location, radius: 50 }, processSVData);
}

// Updates the pre-existing panorama with new StreetView data. Specfically, a new position.
function setNewPano(position) {
  const sv = new google.maps.StreetViewService();
  sv.getPanorama({ location: position, radius: 50 }, processSVData);
}

// The callback being provided. Essentially, 'what to do' after the panorama data get's fetched.
function processSVData(data, status) {
  if (status === "OK") {
    const location = data.location;
    panorama.setPano(location.pano);
    panorama.setPov({ heading: 180, pitch: 0 });
    panorama.setVisible(true);
  } else {
    console.error("Street View data not found for this location.");
  }
}

function reloadAPIs(key) {
  // TODO: Dynamically reload, the various Google Map API/services, with the new API Key.
  // This is non-trival, as on first visit to our site, the index.html page loads the Google Maps API
  // Therefore, we need a way to either (1) unload the scripts, and reload them with the new key
  // (2) dynamically modify/adjust what key the app charges to, after the APIs have loaded.

  // Work in progress - Roadblock.
  alert("Feature is in progress. - for the time, manually set your API Key in the index.html file.")
  // let scriptElement = document.getElementById("Google-Maps-API-Script");
  // let newSrcAttribute = 'https://maps.googleapis.com/maps/api/js?key=' + key + '&callback=initMap';
  // scriptElement.setAttribute("src", newSrcAttribute);
}

function SetStartingLocation() {
  // read and clear user input (rough address string)
  let inputField = document.getElementById("Starting-Location-Input");
  const inputedAddress = inputField.value;
  inputField.value = '';

 // TODO: Utilize Places API to ensure the user input is formatted into a proper address string

  // Build GeoCoding request Object
  const request = {
    'address': inputedAddress
  }

  // Build GeoCoder object -- can be moved out to global
  let geocoder = new google.maps.Geocoder();

  // Make request for location data, with requested area.
  geocoder.geocode(request, processGeocodeData);
}

function processGeocodeData(results, status) {
  if (status === "OK") {
    // For example, just grabbing the first result from the array of results.
    const location = results[0].geometry.location;
    let position = {
      'lat': location.lat(),
      'lng': location.lng(),
    }
    setNewPano(position)

  } else {
    console.error("GeoCoding information not found for this location.");
  }
}