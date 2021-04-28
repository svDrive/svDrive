// Sets a sanitized copy of the input string as the current API-Key.
function setAPIKey(unsanitizedInput) {
    let sanitizedInput = sanitizeGMapKey(unsanitizedInput)
    localStorage.setItem("API-KEY", sanitizedInput);
}

// Removes all charcaters which are invalid for a Google Maps API Key from the input string.
// Aggressively eleminates XXS attempts, as nearly every special character is removed.
function sanitizeGMapKey(unsanitizedInput) {
    let cleanInput = String()
    let testChar = ''
    for (var pos = 0; pos < unsanitizedInput.length; pos++){
        testChar = unsanitizedInput.charAt(pos)
        if (_validCharacterSet.includes(testChar))
            cleanInput += testChar
    }
    return cleanInput
}


const apiInput = document.getElementById("API-Key");
apiInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        setAPIKey(apiInput.value)
        apiInput.value = ""
    }
});
