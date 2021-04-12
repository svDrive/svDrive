/**
Responsiblities: 
1) Use GoogleAPIKey from sessionStorage and dynamically connect to GoogleMapAPI 
 */
function connect(){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + sessionStorage.getItem("sessionKey") + "&callback=run";
    script.async = true;
    document.body.appendChild(script);    
    console.log(loaded); 
}