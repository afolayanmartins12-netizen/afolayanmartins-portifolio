const button = document.getElementById("get-weather-btn");
const select = document.getElementById("city-select");
const weatherInfo = document.getElementById("weather-info");

async function getWeather(city) {
  try {
    // Note: The FreeCodeCamp proxy usually expects a specific format
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/current?lat=${getLat(city)}&lon=${getLon(city)}`
    );
    
    if (!response.ok) {
      throw new Error("Fetch failed");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Helper function to provide coordinates for the proxy
function getLat(city) {
  const coords = { "new york": 40.71, "london": 51.51, "paris": 48.85, "tokyo": 35.68, "lagos": 6.45 };
  return coords[city.toLowerCase()] || 0;
}
function getLon(city) {
  const coords = { "new york": -74.01, "london": -0.13, "paris": 2.35, "tokyo": 139.69, "lagos": 3.39 };
  return coords[city.toLowerCase()] || 0;
}

async function showWeather(city) {
  // Update button text to show loading state
  button.innerText = "Loading...";
  
  const data = await getWeather(city);

  if (!data) {
    alert("Something went wrong, please try again later");
    button.innerText = "Check";
    return;
  }

  // Reveal the section
  weatherInfo.classList.remove("hidden");

  // Fill in the data
  document.getElementById("location").textContent = data.name ?? "N/A";
  document.getElementById("weather-main").textContent = data.weather?.[0]?.description ?? "N/A";
  
  // Temperature (Rounded for a cleaner look)
  document.getElementById("main-temperature").textContent = Math.round(data.main?.temp ?? 0);
  document.getElementById("feels-like").textContent = Math.round(data.main?.feels_like ?? 0) + "°C";
  document.getElementById("humidity").textContent = (data.main?.humidity ?? 0) + "%";
  document.getElementById("wind").textContent = (data.wind?.speed ?? 0) + " m/s";
  
  // Fallback for Wind Gust if not available in data
  document.getElementById("wind-gust").textContent = data.wind?.gust ? (data.wind.gust + " m/s") : "N/A";

  // FIX: Setting the icon correctly
  const icon = document.getElementById("weather-icon");
  if (data.weather?.[0]?.icon) {
    icon.src = data.weather[0].icon; // The FCC proxy usually returns a full URL
  }

  button.innerText = "Check";
}

button.addEventListener("click", () => {
  const city = select.value;
  if (!city) {
    alert("Please select a city");
    return;
  }
  showWeather(city);
});