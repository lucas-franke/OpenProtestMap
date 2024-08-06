//create object with geolocation and name
const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1200px-No_image_3x4.svg.png";
const defaultCity = "Hamburg";
const defaultDistrict = "Hamburg";
var markers = [];

const btnCloseForm = document.querySelector("#btn-close-form");
const form = document.querySelector("#form");
const formContainer = document.querySelector("#form-container");
const formSubmit = document.querySelector("#btn-submit");
btnCloseForm.addEventListener("click", function(event) {
    event.preventDefault();

    if (formContainer.classList.contains("hidden")) {
        formContainer.classList.remove("hidden");
    } else {
        formContainer.classList.add("hidden");
    }
});

formSubmit.addEventListener("click", function(event){
    console.log("submit");
    event.preventDefault();
    const name = document.querySelector("#name").value;
    let city = document.querySelector("#city").value;
    let district = document.querySelector("#district").value;
    const lat = document.querySelector("#lat").value;
    const lng = document.querySelector("#lng").value;
    let img = document.querySelector("#img-link").value;
    if (city === "") {
        city = defaultCity;
    }
    if (district === "") {
        district = defaultDistrict;
    }
    if (img === "") {
        img = defaultImage;
    } 

    const newSpot = {
        name: name,
        city: city,
        district: district,
        address: location.street + " " + location.houseNumber,
        geolocation: {
            lat: lat,
            lng: lng
        },
        img: img,
        id: locations.length + 1
    }
    console.log(newSpot)
    locations.push(newSpot);

    console.log(locations)
    saveLocation(newSpot, locations);
    
    //TODO: Fix this
    createNavItem(newSpot);

    // Close Form via Submit button
    toggleForm();
    
    //saveData(newSpot)
    form.reset();
    //download newSpot as json file
    function saveData() {
        let data = JSON.stringify(newSpot);
        
        window.open("mailto:contact@lufra-design.com?subject=New%20Spot%20Spotted&body="+data);
        // let url = URL.createObjectURL(blob);
        // let a = document.createElement("a");
        // a.download = newSpot.name+".txt";
        // a.href = url;
        // a.click();
    }
})


//Initialize Map
let map = L.map('map').setView([53.55, 9.993], 13);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Copy coordinates on click, show notification and paste to form
map.on('click', 
function(e){
    let coord = e.latlng;
    let lat = coord.lat;
    let lng = coord.lng;
    let text = `${lat}, ${lng}`;
    document.querySelector("#lat").value = lat;
    document.querySelector("#lng").value = lng;

    //TODO: Implement
    //getStreet(lat, lng);

    navigator.clipboard.writeText(text).then(function() {
     console.log('Async: Copying "'+text +'to clipboard was successful!');
     showCopyNotification();
    }, 
    function(err) {
    console.error('Async: Could not copy text: ', err);
    });
});

//define fullscreen control button

let customControl =  L.Control.extend({        
    options: {
      position: 'topright'
    },

    onAdd: function (map) {
        // create the control container to open the formContainer
      let openFormContainer = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom leaflet-control-add-marker');
      openFormContainer.appendChild(L.DomUtil.create('i', 'fas fa-plus', openFormContainer));
      openFormContainer.onclick = function(event){
        event.preventDefault();
        event.stopPropagation();
        toggleForm();
        
      }

      return openFormContainer;
    }
});


let navControl =  L.Control.extend({
    options: {
        position: 'topright'
    },
    onAdd: function (map) {
        // create the control container to open the formContainer
        let openNav = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom leaflet-control-open-nav');
        openNav.appendChild(L.DomUtil.create('i', 'fas fa-bars', openNav));
        openNav.onclick = function(event){
            event.preventDefault();
            event.stopPropagation();
            toggleNav();
        }
        
        return openNav;
    }
});

map.addControl(new customControl());
map.addControl(new navControl());


function showCopyNotification() {
    console.log("show notification");
    let notification = document.querySelector(".notification");
    notification.classList.remove("hidden");
    setTimeout(function(){
        notification.classList.add("hidden");
    }, 4000)
}


async function updateMap(locations) {
    locations.forEach(location => {
        //setGeoData(location);
        setMarkerOnMap(location);
    });
}



async function getLocations(){
    const response = await fetch('http://127.0.0.1:5000/getLocations', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const response_json = await response.json();
    return response_json;
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success:', data);
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });
}

async function saveLocation(location, locations){
    //wait for fethced data then call setStreet

    //save location in list
    fetch('http://127.0.0.1:5000/saveLocation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(location)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    updateMap(locations)
}
//  function setGeoData(location) {
//     console.log("Location: " + location)
//     fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.geolocation.lat}&lon=${location.geolocation.lng}`)
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(data) {
//         console.log(data);
//     })
 
// }

function setMarkerOnMap(location) {
     //Set marker on map
     let marker = L.marker(location.geolocation).addTo(map);
     marker._icon.id = location.id;
     let popup = L.popup()
     
     .setLatLng(location.geolocation)
     .setContent(
     `<h2 class="popup-headline">${location.name}</h2>
     <p class="popup-desc">District: ${location.district}<br>
     City: ${location.city}<br>
     Longitude: ${location.geolocation.lng}<br>
     Latitude: ${location.geolocation.lat}</p>
     Address: ${location.street}<br>
     Img: ${location.img} <br>
     <img src="${location.img}" class="popup-img" alt="Image of ${location.name}">
     <div class="google-link"><a target="_blank" href="https://www.google.de/maps/place/${location.geolocation.lat},${location.geolocation.lng}">Google Maps</a></div>
     `)
     
     marker.bindPopup(popup);
     markers.push(marker); 
}



//load nav items
const nav = document.querySelector("#nav-list");
const navHeaders = document.querySelector("#nav-headers");
const navCity = document.querySelector("#nav-city");


//function that creates entry with city in nav if not already there
async function CreateNavCity(location){
    if(!navHeaders.innerHTML.includes(location.city)){
        navHeaders.innerHTML +=` 
        <div class="nav-dropdown-toggle">
        <h4>${location.city}</h4>
        <div id="${location.country}-${location.city}" class="dropdown-content"></div>
        </div>
        </div>`;
    }
    createNavItem(location);
  
}

function createNavItem(location){
    let navContainer = document.querySelector(`.dropdown-content`);
    navContainer.innerHTML += `<a href="#${location.name}">${location.name}</a>`
    // <a class="nav-item" href="#${location.name}">${location.name}</a>
    // `;
    // nav.appendChild(navItem);
    // navItem.addEventListener("click", function(){
    //     map.flyTo(location.geolocation, 16);
    //     //open popup the marker
    //     markers.forEach(function(marker){
    //         if (marker._icon.id == location.id) {
    //             marker.openPopup();
    //         }
    //     })
    // })
}
function toggleNav(){
    let nav = document.querySelector(".nav");
    const navOpen = document.querySelector(".leaflet-control-open-nav");
    if (navOpen.classList.contains("open")) {
        navOpen.classList.remove("open")
    }
    else {
        navOpen.classList.add("open");
    }   
    if(navOpen.classList.contains("hidden")) {
        navOpen.classList.toggle("hidden");
        console.log("True");
    }
    
}

//Open Form via Add Spot button
const btnOpenForm = document.querySelector("#btn-open-form");
btnOpenForm.addEventListener("click", function(event){
    event.preventDefault();
    toggleForm();
})

function toggleForm(){
    if (formContainer.classList.contains("hidden")) {
        formContainer.classList.remove("hidden");
    } else {
        formContainer.classList.add("hidden");
    }
}

async function initializeMap()  {
    locations = await getLocations();
    updateMap(locations);
    locations.forEach(CreateNavCity);
} 
    

//Setup map on page load
window.onload = (event) => { 
    initializeMap()
};






