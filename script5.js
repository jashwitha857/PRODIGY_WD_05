// OpenWeatherMap API key (You will need to sign up and get your own API key)
const apiKey = '9894cfa6c8a2c258d37c3e6b0683606c'; // Replace with your OpenWeatherMap API key

// Get weather by city name
function getWeatherByCity() {
  const city = document.getElementById("city-input").value;
  
  if (city) {
    fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  } else {
    alert('Please enter a city name.');
  }
}

// Get weather based on geolocation
function getWeatherByGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    }, () => {
      alert('Unable to retrieve your location.');
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

// Fetch weather data and update the DOM
function fetchWeatherData(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("weather-description").textContent = `Condition: ${data.weather[0].description}`;
        document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById("wind-speed").textContent = `Wind Speed: ${data.wind.speed} m/s`;
      } else {
        alert('City not found!');
      }
    })
    .catch(error => {
      alert('An error occurred. Please try again.');
    });
}
