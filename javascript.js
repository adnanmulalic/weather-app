const searchBtn = document.querySelector("#searchBtn");
const searchField = document.querySelector("#searchField");
const resultsDiv = document.querySelector("#resultsDiv");
const weatherDisplay = document.querySelector("#weatherDisplay");
let weatherDataObject = {};

function removeResults(){
    while (resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.firstChild);
    }
}

async function getLocationName(){
    removeResults();
    const response = await fetch("http://api.weatherapi.com/v1/search.json?key=ab064d767fd5473299684532230505&q=" + searchField.value, {mode: "cors"})
    const locationsData = await response.json();
    locationsData.forEach(location => {
        let currentLocation = document.createElement("span");
        currentLocation.textContent = location.name + ", " + location.country;
        document.querySelector("#resultsDiv").appendChild(currentLocation);
    });
}

async function getWeatherData(city = "berlin") {
    const response = await fetch("http://api.weatherapi.com/v1/current.json?key=ab064d767fd5473299684532230505&q=" + city, {mode: "cors"});
    const weatherData = await response.json();
    weatherDataObject.city = weatherData.location.name;
    weatherDataObject.country = weatherData.location.country;
    weatherDataObject.tempC = weatherData.current.temp_c;
    weatherDataObject.tempF = weatherData.current.temp_f;
    weatherDataObject.currentCondition = weatherData.current.condition.text;
    weatherDataObject.icon = weatherData.current.condition.icon;
}

function fillWeatherDiv() {
    let city = document.createElement("p");
    city.textContent = weatherDataObject.city;
    weatherDisplay.appendChild(city);
}

resultsDiv.addEventListener("click", (e)=> {
    console.log(e.target)
    searchField.value = e.target.innerText;
    getWeatherData(searchField.value)
    console.log(weatherDataObject);
    removeResults();
})

searchField.addEventListener("input", () => {
    if (searchField.value.length >= 3) {
        document.querySelector("#error").textContent = "";
        getLocationName();

    } else if (searchField.value.length < 3){
        removeResults();
        document.querySelector("#error").textContent = "Search query must be atleast 3 characters long";
    }
})

searchBtn.addEventListener("click", () => {
    getWeatherData(searchField.value);
    console.log(weatherDataObject);
})

/* searchBtn.addEventListener("click", () => {

    let searchValue = document.querySelector("input");

    fetch("http://api.weatherapi.com/v1/current.json?key=ab064d767fd5473299684532230505&q=" + searchValue.value, {mode: "cors"})
    .then(function(response) {
        return response.json();
    })
    .then(function(response){
        console.log(response);
        console.log(response.current.temp_c)
        console.log(response.current.temp_f)
        console.log(response.current.condition)
    });
}) */