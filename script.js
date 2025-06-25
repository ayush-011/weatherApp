const displayArea = document.getElementById("display-area");
const enterCity = document.getElementById("enter-city");
const searchCity = document.getElementById("search-city");

const temperature = document.getElementById("temp");
const humid = document.getElementById("humid");
const windSpeed = document.getElementById("windSpeed");

searchCity.addEventListener("click", () => {
  searchCity.innerText = "Loading...";

  temperature.innerText = "";
  humid.innerText = "";
  windSpeed.innerText = "";
  const existingError = displayArea.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  const cityName = enterCity.value;

  if (!cityName.trim()) {
  const errormsg = document.createElement("p");
  errormsg.textContent = "Please enter a city name";
  errormsg.classList.add("error-message");
  displayArea.appendChild(errormsg);
  searchCity.innerText = "Search";
  return;
}

  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=API_KEY`;

  setTimeout(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        temperature.innerText = `Temperature: ${data.main.temp}`;
        humid.innerText = `Humidity: ${data.main.humidity}`;
        windSpeed.innerText = `Wind: ${data.wind.speed}`;
      })
      .catch((error) => {
        const errormsg = document.createElement("p");
        errormsg.textContent = error.message || String(error);
        errormsg.classList.add("error-message");
        displayArea.appendChild(errormsg);
      });
    searchCity.innerText = "Search";
  }, 2000);
});
