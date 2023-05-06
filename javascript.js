const searchBtn = document.querySelector("#searchBtn");
let tempC = 0;
let tempF = 0;
let currentCondition = "";
let weatherDataObject = {};

async function getWeatherData(city = "berlin") {
    const response = await fetch("http://api.weatherapi.com/v1/current.json?key=ab064d767fd5473299684532230505&q=" + city, {mode: "cors"});
    const weatherData = await response.json();
    weatherDataObject.tempC = weatherData.current.temp_c;
}

/* getWeatherData("london").then(function(result){
    tempC = result.current.temp_c;
    currentCondition = result.current.condition;
    return result.current.temp_c;
}) */


searchBtn.addEventListener("click", () => {
    let searchValue = document.querySelector("input");
    fetch("http://api.weatherapi.com/v1/current.json?key=ab064d767fd5473299684532230505&q=" + searchValue.value, {mode: "cors"})
    .then(function(response) {
        return response.json();
    })
    .then(function(response){
        console.log(response.current.temp_c)
        console.log(response.current.temp_f)
        console.log(response.current.condition)
    });
})