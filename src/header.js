/* GLOBAL VARIABLES USED IN MULTIPLE FILES*/
//Google Maps Interface Object @init panorama.js
let _panorama;
//Google Maps Overhead Map object @init panorama.js
let _map;
//Display class instance @init app.js
let _display;
// Set of possible characters contained in a Google Maps API-Key.
const _validCharacterSet ="aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789-_"
// Set of valid characters for starting address string
const _validAddress = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789-_ "