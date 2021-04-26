/**
 * Place AutoComplete Documentation: https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete#maps_places_autocomplete-javascript
 */

// Loading script dynamically 
var script = document.createElement('script');

var isSessionkey = localStorage.getItem("localKey"); 

    if(isSessionkey != null){
    script.src  = 'https://maps.googleapis.com/maps/api/js?key=' + localStorage.getItem("localKey")  +'&libraries=places&callback=autoComplete'; 
    }

script.async =true; 
document.head.appendChild(script); 


// autoComplete() : wrapper function to call Google map addDomListener and intializeAutoComplete(targeted-inputBox)
function autoComplete() {
  google.maps.event.addDomListener(window, 'load', function() {

    /** Important: Starting-Location-Input is text type. Use same name if want to avoid changing here */
    initializeAutocomplete('Starting-Location-Input');
  });
}

// initializeAutoComplete(targeted input box name)
function initializeAutocomplete(id) {
  var element = document.getElementById(id);
  const options = { 
   componentRestritions: {country: "us"}, 
   fields: ["formatted_address", "geometry", "name"],
   types: ["address"],

  }
  
  if (element) {
    var autocomplete = new google.maps.places.Autocomplete(element, options);
    google.maps.event.addListener(autocomplete, 'place_changed');
  }
}