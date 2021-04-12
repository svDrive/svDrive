/** 
Responsiblities: 
1) Validate GoogleMapAPI and startingLocation 
2) Store the GoogleMAPAPI and statingLocation in sessionStorage 
*/ 

/**
Validate() : wrapper function to Call validateGoogleAPIKey() and validateStartingLocation()
 */
function validate() {

    if(!(validateGoogleAPIKey()))
    {
        return false; 
    }
    else if(!(validateStartingLocation()))
    {
        return ; 
    }else{

        // call connect method fron connect.js 
        connect(); 
        return true; 
    }
 
 }
  
 /**
 validateGoogleAPIKey() : Verify Google API key and store into session storage
 */
 function validateGoogleAPIKey()
 {
     let googleAPIKey = document.getElementById("API-Key-Input").value; 
     var sessionKey = "";
   
   if(googleAPIKey === ""){
       alert("Please provide Google map API key"); 
       return false;
   }else{
 
       if(validator.isLength(googleAPIKey, {min:0, max:100}) == false){
           alert("Invalid API key: Exceed the string limit"); 
           return false;
       }else{
          
           let cleanInput = validator.blacklist(googleAPIKey, "=</>;.'`,?!()):'"); 
           // Invalid character included in API key
           if(cleanInput.length !== googleAPIKey.length){
               alert("Invalid API Key: Invalid characters included")
               return false;
           }else{
             // Store session key.             
             sessionStorage.setItem("sessionKey",cleanInput);
             return true; 
         }
       }
   } 
 }
 
 /**
 validateStartingLocation(): Verify starting location and store into session storage
  */
 function validateStartingLocation(){
 
     let startingPoint = document.getElementById("Starting-Location-Input").value; 
     var start = "";
   
   if(startingPoint === ""){
       alert("Please provide starting point"); 
       return false; 
   }else{
 
       if(validator.isLength(startingPoint, {min:0, max:100}) == false){
           alert("Invalid starting point value: No more than 100 characters"); 
           return false; 
       }else{
          
           let cleanStart = validator.blacklist(startingPoint, "=</>;.'`,?!()):'"); 
           // Invalid character included in API key
           if(cleanStart.length !== startingPoint.length){
               alert("Invalid starting point value: Invalid characters included")
               return false; 
           }else{
             // Store session key.             
             sessionStorage.setItem("start", cleanStart);
             return true; 
         }
       }
   } 
 
 }