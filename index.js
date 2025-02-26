const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "71e063dfc406ae03a5fdb215132a7a74";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();
    const city = cityInput.value;

    if(city) {
        
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error) {
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);

    if(!response.ok) {
        throw new Error("couldn't fetch weather data");
    }
    return response.json();
}

function displayWeatherInfo(data) {

    const {main: {humidity, temp}, name: city, weather: [{id, description}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
    
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("weatherDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("weatherDesc");
    weatherEmoji.classList.add("weatherEmoji");
}

function getWeatherEmoji(weatherId) {

    switch(true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 500):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌪";
        case (weatherId === 800):
            return "🌞";
        case (weatherId > 800):
            return "☁";
        default:
            return "?";
    }
}

function displayError(message) {

    const displayErrorMessage = document.createElement("p");

    card.textContent = "";
    card.style.display = "flex";
    displayErrorMessage.textContent = message;
    card.appendChild(displayErrorMessage);
    displayErrorMessage.classList.add("errorDisplay");

}