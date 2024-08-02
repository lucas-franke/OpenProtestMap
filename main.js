//create object with geolocation and name
const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1200px-No_image_3x4.svg.png";
const defaultCity = "Hamburg";
const defaultDistrict = "Hamburg";
const locations = [{
    name: "Rothenburgsort",
    city: "Hamburg",
    district: "Rothenburgsort",
    geolocation: {
        lat: 53.527997,
        lng: 10.041561
    },
    img: "https://lh5.googleusercontent.com/p/AF1QipNEw_rHamcGoTo0WHYxsfbf_8Rx2HVSaKF_UqtF=w408-h272-k-no",
    id: 1,
    street:"default",
    houseNumber:"default",
    country: "DE"
},
{
    name: "Lighthouse Zero",
    city: "Hamburg",
    district: "Hafencity",
    geolocation: {
        lat: 53.538453, 
        lng: 10.003782
        },
    img: "https://lh5.googleusercontent.com/p/AF1QipNEw_rHamcGoTo0WHYxsfbf_8Rx2HVSaKF_UqtF=w408-h272-k-no",
    id: 2,
    street:"default",
    houseNumber:"default",
    country: "DE"
},
{
    name: "Müllberg Hummelsbüttel",
    city: "Hamburg",
    district: "Hummelsbüttel",
    geolocation: {
        lat: 53.674082221321115,
        lng: 10.050298561390438
    },
    img: "https://lh5.googleusercontent.com/p/AF1QipNEw_rHamcGoTo0WHYxsfbf_8Rx2HVSaKF_UqtF=w408-h272-k-no",
    id: 3,
    street:"default",
    houseNumber:"default",
    country: "DE"  
},
{
    name: "Altonaer Balkon Aussichtspunkt",
    city: "Hamburg",
    district: "Altona",
    geolocation: {
        lat: 53.545243,
        lng: 9.915153
    },
    img: "https://lh5.googleusercontent.com/p/AF1QipNEw_rHamcGoTo0WHYxsfbf_8Rx2HVSaKF_UqtF=w408-h272-k-no",
    id: 4,
    street:"default",
    houseNumber:"default",
    country: "DE"  
},
{
    name: "Stadtpark Eichhörnchen",
    city: "Cologne",
    district: "Winterhude",
    geolocation: {
        lat: 53.59843584184574,
        lng: 10.023464113402172
    },
    img: "https://lh5.googleusercontent.com/p/AF1QipNEw_rHamcGoTo0WHYxsfbf_8Rx2HVSaKF_UqtF=w408-h272-k-no",
    id: 5,
    street:"default",
    houseNumber:"default",
    country: "DE"
},
]


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
    saveLocation(newSpot);
    
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
function showCopyNotification() {
    console.log("show notification");
    let notification = document.querySelector(".notification");
    notification.classList.remove("hidden");
    setTimeout(function(){
        notification.classList.add("hidden");
    }, 4000)
}



let markers = [];

locations.forEach((location)=>{
    setGeoData(location);
    saveLocation(location);
});
async function saveLocation(location){
    //wait for fethced data then call setStreet


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
 async function setGeoData(location) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.geolocation.lat}&lon=${location.geolocation.lng}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
 
}

//load nav items
const nav = document.querySelector("#nav-list");
const navHeaders = document.querySelector("#nav-headers");
const navCity = document.querySelector("#nav-city");
locations.forEach(CreateNavCity);
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

//Open Form via Add Sot button
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





