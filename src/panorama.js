let panoDiv = document.getElementById("pano");

class Display {
  constructor(startingLocation) {
    this.heading = 180;
    this.vehicleHeading= 180;
    this.pitch = 0;
    this.sv = new google.maps.StreetViewService();
    _panorama = new google.maps.StreetViewPanorama(panoDiv);
    this.geocoder = new google.maps.Geocoder();
    this.startingLocation = startingLocation;
    this.mapOptions = {
      clickToGo: true,
      addressControl: false,
      fullscreenControl: false,
      linksControl: false,
      motionTracking: false,
      panControl: false,
      showRoadLabels: true,
      zoomControl: false,
    }
    _panorama.setOptions(this.mapOptions);
    this.setNewPanorama(this.startingLocation);
    this.setEventListeners();
  }
  
  setEventListeners() {
    document.getElementById("API-Key-Button").addEventListener("click", () => { this.setAPIKey();});
    document.getElementById("Starting-Location-Button").addEventListener("click", () => { this.setStartingLocation() });
  } 

  /* Updates the pre-existing panorama with new StreetView data. Specfically, a new position. */
  setNewPanorama(position) {
    this.sv.getPanorama({ location: position, radius: 50 }, (data, status) => this.processSVData(data, status));
  }

  /* The callback being provided. Essentially, 'what to do' after the panorama data get's fetched. */
  processSVData(data, status) {
    // console.log(data);
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
  
    /* Work in progress - Roadblock. */
  setAPIKey() {
    alert("Feature is in progress. - for the time, manually set your API Key in the index.html file.")
    // let inputField = document.getElementById("API-Key-Input");
    // const newKey = inputField.value;
    // inputField.value = '';
    /*
      * TODO: Sanitize input to prevent XSS. 
      * TODO: verify key is valid before attempting to reload/store 
      * */
    // localStorage.setItem("API-KEY", newKey);
    /*
     * TODO: Dynamically reload, the various Google Map API / services, with the new API Key.
     *  (1) unload the scripts, and reload them with the new key, or                       
     *  (2) dynamically modify/adjust what key the app charges to, after the APIs have loaded. [Might not be possible]
     *  */
    // let scriptElement = document.getElementById("Google-Maps-API-Script");
    // let newSrcAttribute = 'https://maps.googleapis.com/maps/api/js?key=' + key + '&callback=run';
    // scriptElement.setAttribute("src", newSrcAttribute);
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