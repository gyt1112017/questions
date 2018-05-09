//The code is from the practicals in week 6 and 7,  the link is: file://ad.ucl.ac.uk/home1/uczlfr1/DesktopSettings/Desktop/Web%20GIS/Week%206%20and%207/week6server/Practical%20%20-%20Saving%20Data%20to%20the%20Server.pdf
// load the map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
// load the tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
maxZoom: 18,
attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
'Imagery © <a href="http://mapbox.com">Mapbox</a>',
id: 'mapbox.streets'
}).addTo(mymap);

// create a custom popup
var popup = L.popup();
// create an event detector to wait for the user's click event and then use the popup to show them where they clicked
// note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes - the Leaflet API does this for you
function onMapClick(e) {
popup
.setLatLng(e.latlng)
.setContent("You clicked the map at " + e.latlng.toString())
.openOn(mymap);
}
// now add the click event detector to the map
mymap.on('click', onMapClick);

var client;
//Use document.getElementById to get the first bit of text data from the form
function startDataUpload() {
alert ("start data upload");
var question = document.getElementById("question").value;
var answer1 = document.getElementById("answer1").value;
var answer2 = document.getElementById("answer2").value;
var answer3 = document.getElementById("answer3").value;
var answer4 = document.getElementById("answer4").value;
var rightanswer = document.getElementById("rightanswer").value;
alert(question + " "+ answer1 + " "+answer2 + " "+ answer3 + " "+ answer4 + " "+ rightanswer);
var postString = "question="+question +"&answer1="+answer1+"&answer2="+answer2+"&answer3="+answer3+"&answer4="+answer4+"&rightanswer="+rightanswer; 


// now get the geometry values
var latitude = document.getElementById("latitude").value;
var longitude = document.getElementById("longitude").value;
postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;

processData(postString);}

//Add an AJAX call and response method to code in uploadData.js
function processData(postString) {
client = new XMLHttpRequest();
client.open('POST','http://developer.cege.ucl.ac.uk:30270/uploadData',true);
client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
client.onreadystatechange = dataUploaded;
client.send(postString);

}
// create the code to wait for the response from the data server, and process the response once it is received
function dataUploaded() {
// this function listens out for the server to say that the data is ready - i.e. has state 4
if (client.readyState == 4) {
// change the DIV to show the response
document.getElementById("dataUploadResult").innerHTML = client.responseText;
}
}