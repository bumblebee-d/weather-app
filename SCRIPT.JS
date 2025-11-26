// Feature #1 — show current day + time
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

// run now + update every minute
updateTime();
setInterval(updateTime, 60000);

// Feature #2 — search city and display its name
const form = document.querySelector("#search-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const input = document.querySelector("#city-input");
  const city = input.value.trim();

  if (!city) return;

  document.querySelector("#city-name").innerHTML = city;
});
