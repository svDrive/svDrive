let panoDiv = document.getElementById("pano");
let mapDiv = document.getElementById("map");

class Display {
  constructor(startingLocation) {
    this.heading = 180;
    this.vehicleHeading= 180;
    this.pitch = 0;
    this.sv = new google.maps.StreetViewService();
    _panorama = new google.maps.StreetViewPanorama(panoDiv);
    _map = new google.maps.Map(mapDiv);
    this.geocoder = new google.maps.Geocoder();
    this.startingLocation = startingLocation;
    this.panoOptions = {
      clickToGo: true,
      addressControl: false,
      fullscreenControl: false,
      linksControl: false,
      motionTracking: false,
      panControl: false,
      showRoadLabels: true,
      zoomControl: false,
    }
    this.mapOptions = {
      center: startingLocation,
      zoom: 18,
      clickableIcons: false,
      disableDefaultUI: true,
      disableDoubleClickZoom: true,
      gestureHandling: "none",
      keyboardShortcuts: false,
    }
    _map.setOptions(this.mapOptions)
    _panorama.setOptions(this.panoOptions);
    this.setNewPanorama(this.startingLocation);
  }

  /* Updates the pre-existing panorama with new StreetView data. Specfically, a new position. */
  setNewPanorama(position) {
    this.sv.getPanorama({ location: position, radius: 50 }, (data, status) => this.processSVData(data, status));
  }

  /* The callback being provided to getPanorama. Essentially, 'what to do' after the panorama data get's fetched. */
  processSVData(data, status) {
    if (status === "OK") {
      const location = data.location;
      _panorama.setPano(location.pano);
      this.pitch = 0;
      _panorama.setPov({ heading: this.heading, pitch: this.pitch });
      _panorama.setVisible(true);
    } else {
      console.error("Street View data not found for this location.");
    }
  }

  setStartingLocation() {
    let inputField = document.getElementById("Starting-Location-Input");
    const inputedAddress = inputField.value;
    inputField.value = '';

    /*TODO: Utilize Places API to ensure the user input is formatted into a proper address string */
    const request = { 'address': inputedAddress }
    this.geocoder.geocode(request, (results, status) => { this.processGeocodeData(results, status) });
  }

  /*For example, just grabbing the first result from the array of results.*/ 
  processGeocodeData(results, status) {
    let first = 0;
    if (status === "OK") {
      const location = results[first].geometry.location;
      let position = {
        'lat': location.lat(),
        'lng': location.lng(),
      }
      this.setNewPanorama(position);
    } else {
      console.error("GeoCoding information not found for this location.");
    }
  }
}