const searchField = document.querySelector("#searchField");
const resultsDiv = document.querySelector("#resultsDiv");
const weatherDisplay = document.querySelector("#weatherDisplay");
const tempSwitchButton = document.querySelector("#tempSwitchButton");
let weatherTemp = {
};
getWeatherData("ljubljana");


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
    document.querySelector("#city").textContent = weatherData.location.name;
    document.querySelector("#country").textContent = weatherData.location.country;
    weatherTemp.tempC = weatherData.current.temp_c + " ℃";
    weatherTemp.tempF = weatherData.current.temp_f + " ℉";
    if (tempSwitchButton.textContent === "C") {
        document.querySelector("#temperature").textContent = weatherTemp.tempC;
    } else {
        document.querySelector("#temperature").textContent = weatherTemp.tempF;
    }
    document.querySelector("#condition").textContent = weatherData.current.condition.text;
    let weatherIconArray = weatherData.current.condition.icon.split("/");
    document.querySelector("#weatherIcon").src = "./weather/64x64/" + weatherIconArray[5].concat("/", weatherIconArray[6]);
}

resultsDiv.addEventListener("click", (e)=> {
    searchField.value = e.target.innerText;
    getWeatherData(searchField.value)
    removeResults();
})

searchField.addEventListener("input", () => {
    if (searchField.value.length >= 3) {
        getLocationName();
    } else if (searchField.value.length < 3){
        removeResults();
    }
})

searchField.addEventListener("keydown", (e) =>{
    if (e.key === "Enter") {
        getWeatherData(searchField.value);
        removeResults();
    if (tempSwitchButton.textContent === "C") {
        document.querySelector("#temperature").textContent = weatherTemp.tempC;
    } else {
        document.querySelector("#temperature").textContent = weatherTemp.tempF;
    }
    }
})

document.querySelector("#tempSwitch").addEventListener("click", () => {
    if (tempSwitchButton.classList.contains("tempSwitchButtonRight")) {
        tempSwitchButton.classList.replace("tempSwitchButtonRight","tempSwitchButtonLeft");
        tempSwitchButton.textContent = "C";
        document.querySelector("#temperature").textContent = weatherTemp.tempC;
    } else {
        tempSwitchButton.classList.replace("tempSwitchButtonLeft", "tempSwitchButtonRight");
        tempSwitchButton.textContent = "F";
        document.querySelector("#temperature").textContent = weatherTemp.tempF;
    }
})