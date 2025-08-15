const API_KEY = "0751599ed20d67e5e2ac43c8f7684fcf";
const searchBtn = document.getElementById("search");
const cityInput = document.getElementById("city");
const resultDiv = document.getElementById("result");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    console.log(data); 

    if (data.cod === 200) {
      resultDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
      `;
    } else {
      resultDiv.innerHTML = `<p>City not found.</p>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<p>Error fetching data.</p>`;
    console.error(error);
  }
}
