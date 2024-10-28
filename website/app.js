/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = "api&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const fetchWeather = async (zip) => {
  const response = await fetch(`${baseURL}${zip}&appid=${apiKey}`);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

document.getElementById("generate").addEventListener("click", performAction);

function performAction() {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getWeatherData(zip, feelings);
}

async function getWeatherData(zip, feelings) {
  const weatherData = await fetchWeather(zip);

  postData("http://localhost:3000/add", {
    temperature: weatherData.main.temp,
    date: newDate,
    userResponse: feelings,
  }).then(updateUI);
}

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  try {
    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

const updateUI = async () => {
  const request = await fetch("http://localhost:3000/all");
  try {
    const allData = await request.json();
    document.getElementById("temp").innerHTML =
      Math.round(allData.temperature) + " degrees";
    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    document.getElementById(
      "content"
    ).innerHTML = `User Response: ${allData.userResponse}`;
  } catch (error) {
    console.error("Error updating UI:", error);
  }
};
