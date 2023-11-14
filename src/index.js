const APIKey = "3db0d220d82f76e1b9db1bcdc4808baf";
const APIUrlMetirc = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=portland";
const APIurlImperial = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
const checkWeatherBtn = document.getElementById("searchButton");
const cityInput = document.getElementById('cityInput');
const cityName = document.getElementById('weatherLocation');
const weatherIcon = document.getElementById('weatherIcon');
const cityTemp = document.getElementById('weatherTemperature');
const cityHumidity = document.getElementById('weatherHumidity');
const toggleCelsius = document.getElementById('celsius');
const toggleFahrenheit = document.getElementById('fahrenheit');
const commentInput = document.getElementById('comment-input');
const commentBtn = document.getElementById('submitcomment');
const commentList = document.getElementById('comments-list')
const commentForm = document.getElementById('comment-form')


checkWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city.trim() !== '') {
        fetchWeatherData(city);
    }
})

function fetchWeatherData(city) {
    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${APIKey}`;

    fetch(APIUrl)
        .then(res => res.json())
        .then(renderCityWeather)
        .catch(error => {
            console.error('Error fetching weather data', error);
        });
}


fetch(APIUrlMetirc + `&appid=${APIKey}`)
    .then(res => res.json())
    .then(renderCityWeather)

function renderCityWeather(weather) {
    cityName.textContent = weather.name;
    const iconURl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
    weatherIcon.src = iconURl;
    cityHumidity.textContent = `Humidity: ${weather.main.humidity} %`

    toggleCelsius.addEventListener('change', () => {
        if (toggleCelsius.checked) {
            const temperatureCelsius = Math.round(weather.main.temp);
            cityTemp.textContent = `Temperature: ${temperatureCelsius} °C`;
        }
    })
    toggleFahrenheit.addEventListener('change', () => {
        if (toggleFahrenheit.checked) {
            const temperatureFahenheit = Math.round((weather.main.temp * 9 / 5) + 32);
            cityTemp.textContent = `Temperature: ${temperatureFahenheit} °F`;
        }
    });
}



commentForm.addEventListener('submit', handleComments)

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

function renderComments(comment) {
    const comments = document.createElement('li');
    comments.textContent = comment;
    commentList.append(comments)
}
