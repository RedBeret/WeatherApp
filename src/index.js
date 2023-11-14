function el(id) {
    return document.getElementById(id);
}

// Constants used for API key and URLs.
const APIKey = "3db0d220d82f76e1b9db1bcdc4808baf";
const APIUrlMetirc = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=portland";
const APIurlImperial = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

//Global elements used in the app
const checkWeatherBtn = el("searchButton");
const cityInput = el('cityInput');
const cityName = el('weatherLocation');
const weatherIcon = el('weatherIcon');
const cityTemp = el('weatherTemperature');
const cityHumidity = el('weatherHumidity');
const toggleCelsius = el('celsius');
const toggleFahrenheit = el('fahrenheit');
const commentInput = el('comment-input');
const commentBtn = el('submitcomment');
const commentList = el('comments-list')
const commentForm = el('comment-form')

//variable used to store the current weather data
let currentWeather;

// Event listener for the check weather button 
checkWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city.trim() !== '') {
        fetchWeatherData(city);
    }
})

// Function to fetch weather data for the city
function fetchWeatherData(city) {
    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${APIKey}`;

    fetch(APIUrl)
        .then(res => res.json())
        .then(weatherData => {
            currentWeather = weatherData;
            renderCityWeather(currentWeather);
        })
        .catch(error => {
            console.error('Error fetching weather data', error);
        });
}

// Fetch initial weather data for Portland. Metric constant above
fetch(APIUrlMetirc + `&appid=${APIKey}`)
    .then(res => res.json())
    .then(renderCityWeather)

// Function to render the weather data for the city
function renderCityWeather(weather) {
    cityName.textContent = weather.name;
    const iconURl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
    weatherIcon.src = iconURl;
    cityHumidity.textContent = `Humidity: ${weather.main.humidity} %`

    if (toggleCelsius.checked) {
        const temperatureCelsius = Math.round(weather.main.temp);
        cityTemp.textContent = `Temperature: ${temperatureCelsius} °C`;
    }
    else if (toggleFahrenheit.checked) {
        const temperatureFahenheit = Math.round((weather.main.temp * 9 / 5) + 32);
        cityTemp.textContent = `Temperature: ${temperatureFahenheit} °F`;
    }
}

// Event listeners for the toggle buttons to switch between Celsius and Fahrenheit
toggleCelsius.addEventListener('change', () => {
    if (currentWeather && toggleCelsius.checked) {
        const temperatureCelsius = Math.round(currentWeather.main.temp);
        cityTemp.textContent = `Temperature: ${temperatureCelsius} °C`;
    }
});

toggleFahrenheit.addEventListener('change', () => {
    if (currentWeather && toggleFahrenheit.checked) {
        const temperatureFahrenheit = Math.round((currentWeather.main.temp * 9 / 5) + 32);
        cityTemp.textContent = `Temperature: ${temperatureFahrenheit} °F`;
    }
});

// Event listener for the comment button
commentForm.addEventListener('submit', handleComments)

// Function to handle the comments
function handleComments(event) {
    event.preventDefault();
    const commentText = commentInput.value;
    if (commentText !== '') {
        renderComments(commentText);
        event.target.reset();
    } else {
        alert('Please enter a comment');
    }


}
// Function to render the comments
function renderComments(comment) {
    const comments = document.createElement('li');
    comments.textContent = comment;
    commentList.append(comments)
}
