// ⏰ Feature #1 — show current day + time
function updateTime() {
  const now = new Date();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const day = days[now.getDay()];
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  document.querySelector("#current-time").innerHTML =
    `${day} ${hours}:${minutes}`;
}

updateTime();
setInterval(updateTime, 60000);

// 🌍 OpenWeather API
const apiKey = "d6ab5a87cf4cf8575588854259f8fcd5";  // <-- YOUR KEY HERE
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Update UI from API response
function displayWeather(response) {
  const data = response.data;

  // City name
  document.querySelector("#city-name").innerHTML = data.name;

  // Temperature
  document.querySelector("#temperature").innerHTML =
    `${Math.round(data.main.temp)}°C`;

  // Description
  let description = data.weather[0].description;
  description = description.charAt(0).toUpperCase() + description.slice(1);
  document.querySelector("#weather-description").innerHTML = description;

  // Humidity
  document.querySelector("#humidity").innerHTML = `${data.main.humidity}%`;

  // Wind speed (convert m/s to km/h)
  const windKmh = Math.round(data.wind.speed * 3.6);
  document.querySelector("#wind").innerHTML = `${windKmh} km/h`;

  // Weather icon
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  document.querySelector("#weather-icon").setAttribute("src", iconUrl);
  document.querySelector("#weather-icon").setAttribute("alt", description);
}

// Search function
function searchCity(city) {
  const url = `${apiUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  axios
    .get(url)
    .then(displayWeather)
    .catch(() => {
      alert("City not found. Try again.");
    });
}

// Form listener
const form = document.querySelector("#search-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const city = document.querySelector("#city-input").value.trim();
  if (!city) return;

  searchCity(city);
});

// Load default city
searchCity("Paris");
