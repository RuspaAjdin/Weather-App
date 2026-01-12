const ApiKey = "7c181d301bb175a7141df2e70bb68567";

const city = "London";

async function FetchWeather(city){
const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`;
const response = await fetch(apiURL);
console.log(response.json());

}

FetchWeather(city);