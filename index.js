const cityInput = document.querySelector(".cityInput");
const checkBtn = document.querySelector(".weatherCheck");
const infoCard = document.querySelector(".infoCard");
const weatherForm = document.querySelector(".Interact");

const ApiKey = "7c181d301bb175a7141df2e70bb68567";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await GetWeather(city);
            DisplayWeather(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }else{
        displayError("Please enter a city");
    }
})

async function GetWeather(city){
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`;
const response = await fetch(apiURL);

if(!response.ok){
    throw new Error("Could not fetch api data");
}

return response.json();
}

function DisplayWeather(data){
const {name: city,
        main: {temp,humidity,feels_like,temp_min,temp_max},
        weather: [{id, description}]
} = data;

const AllTemps = document.createElement("div");
const temps = document.createElement("div");
const tempsMAXMIN = document.createElement("div");

 infoCard.textContent = "";
 AllTemps.textContent = "";
 temps.textContent = "";
 tempsMAXMIN.textContent ="";
infoCard.style.display = "flex";
AllTemps.style.display = "flex";

const cityDisplay = document.createElement("h1");
const temperature = document.createElement("p");
const feelslike = document.createElement("p");
const maxTemp = document.createElement("p");
const minTemp = document.createElement("p");
const humid = document.createElement("p");
const desc = document.createElement("p");
const headr1 = document.createElement("hr");
const headr2 = document.createElement("hr");
const weatherEmoji = document.createElement("weatherEmoji");

cityDisplay.textContent = city;
temperature.textContent = `Temperature: ${(temp - 273.15).toFixed(1)}°`;
feelslike.textContent = `Feels like: ${(feels_like - 273.15).toFixed(1)}°`;
minTemp.textContent = `Minimum: ${(temp_min - 273.15).toFixed(1)}°`;
maxTemp.textContent = `Maximum: ${(temp_max - 273.15).toFixed(1)}°`;
humid.textContent = `Humidity: ${humidity}%`;
desc.textContent = `${description}`;
weatherEmoji.textContent = DisplayEmoji(id);

AllTemps.classList.add("AllTemps");
temps.classList.add("temps");
tempsMAXMIN.classList.add("tempsMAXMIN");

cityDisplay.classList.add("cityName");
temperature.classList.add("temperature");
feelslike.classList.add("feelslike");
headr1.classList.add("hr");
headr2.classList.add("hr");
minTemp.classList.add("minTemp");
maxTemp.classList.add("maxTemp");
humid.classList.add("humidity");
desc.classList.add("weatherDescription");
weatherEmoji.classList.add("weatherEmoji");

//Card appends
infoCard.appendChild(cityDisplay);
infoCard.appendChild(AllTemps);
infoCard.appendChild(weatherEmoji);
infoCard.insertBefore(headr1, AllTemps);
infoCard.insertBefore(headr2, weatherEmoji);
infoCard.insertBefore(humid, headr2);
infoCard.appendChild(desc);
//Alltemp Appends
AllTemps.appendChild(temps);
AllTemps.appendChild(tempsMAXMIN);
//Alltemp children appends
temps.appendChild(temperature);
temps.appendChild(feelslike);
tempsMAXMIN.appendChild(minTemp);
tempsMAXMIN.appendChild(maxTemp);

}

function DisplayEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId <300):
            return "⛈️";
        break;
        case (weatherId >= 300 && weatherId <400):
            return "🌧️";
        break;
        case (weatherId >= 500 && weatherId <600):
            return "🌧️";
        break;
        case (weatherId >= 600 && weatherId <700):
            return "❄️";
        break;
        case (weatherId >= 700 && weatherId <800):
            return "🌫️";
        break;
         case (weatherId === 800):
            return "☀️";
        break;
        case (weatherId >= 801 && weatherId <810):
            return "☁️";
        break;
        default:
            return"❓";
    }
}

function displayError(msg){
    const errorMessage = document.createElement("p");
    errorMessage.textContent = msg;
    errorMessage.classList.add("weatherError");

    infoCard.textContent = "";
    infoCard.style.display = "flex";
    infoCard.appendChild(errorMessage);
}