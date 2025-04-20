async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const apiKey = '7b608fec4d5ae264215578267baf06f8';

  if (!city) {
    document.getElementById('weatherResult').innerHTML = `<p style="color:red;">Please enter a city name.</p>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found.");
    const data = await response.json();

    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>🌡️ Temperature: ${data.main.temp} °C</p>
      <p>🌥️ Condition: ${data.weather[0].description}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind: ${data.wind.speed} m/s</p>
    `;
    document.getElementById('weatherResult').innerHTML = weatherHTML;
  } catch (error) {
    document.getElementById('weatherResult').innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
