let panorama;
let panoDiv = document.getElementById("pano");

// The Entry point function that get's called after the 'async' Google Map API script tag is loaded
function initMap() {
  const location = { lat: 45.5095048, lng: -122.681455};
  //const location = { lat: 45.5098, lng: -122.6805 }; //PSU, Fourth Ave Building
  const sv = new google.maps.StreetViewService();
  panorama = new google.maps.StreetViewPanorama(panoDiv);

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

