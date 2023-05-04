let latitude = 0;
let longitude = 0;
fetch("https://geocoding-api.open-meteo.com/v1/search?name=ljubljana")
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        console.log(response.results[0].latitude)
    })



fetch("https://api.open-meteo.com/v1/forecast?latitude=46.05&longitude=14.51&timezone=auto&current_weather=true", {mode: "cors"})
    .then(function(response) {
        return response.json();
    })
    .then(function(response){
        console.log(response.current_weather.temperature)
        console.log(response.current_weather.time)
    });