let id = '9505fd1df737e20152fbd78cdb289b6a';
let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;

let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let windSpeed = document.getElementById('wind-speed');
let main = document.querySelector('main');
let locationButton = document.getElementById('use-location');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (valueSearch.value.trim() !== '') {
        searchWeatherByCity(valueSearch.value);
    }
});

locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            searchWeatherByCoords(lat, lon);
        }, () => {
            alert("Unable to retrieve your location.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

const searchWeatherByCity = (cityName) => {
    fetch(baseUrl + '&q=' + cityName)
        .then(response => response.json())
        .then(updateWeatherData)
        .catch(error => console.log(error));
};

const searchWeatherByCoords = (lat, lon) => {
    fetch(baseUrl + `&lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(updateWeatherData)
        .catch(error => console.log(error));
};

const updateWeatherData = (data) => {
    if (data.cod == 200) {
        city.querySelector('figcaption').innerHTML = data.name;
        city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
        temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        temperature.querySelector('span').innerText = data.main.temp;
        description.innerText = data.weather[0].description;

        clouds.innerText = data.clouds.all;
        humidity.innerText = data.main.humidity;
        pressure.innerText = data.main.pressure;
        windSpeed.innerText = data.wind.speed;
    } else {
        main.classList.add('error');
        setTimeout(() => {
            main.classList.remove('error');
        }, 1000);
    }
    valueSearch.value = '';
};

// Initial load
const initApp = () => {
    searchWeatherByCity('Washington');
}
initApp();
