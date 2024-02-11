const apiKey = 'ea362cf28cf9cf43c6d976f5db9608be';

function getWeather() {
    const cityInput = document.getElementById('cityInput').value;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data);
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}


function displayWeather(data) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    const weatherImage = document.getElementById('weatherImage');

    if (data.cod === '404' || !data.main || !data.weather) {
        weatherInfoDiv.innerHTML = `<p style="color: red;">City not found or data not available. Please try again.</p>`;
    } else {
        const cityName = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;

        weatherInfoDiv.innerHTML = `<p>Current weather in ${cityName}: ${temperature}°C, ${description}</p>`;

        // Update image based on weather description
        weatherImage.src = getImageForWeather(description);
        weatherImage.alt = description;
    }
}

function getImageForWeather(description) {
    const imageMappings = {
        'clear sky': 'sunny.png',
        'few clouds': 'cloudy.jpg',
        'scattered clouds': 'cloudy.jpg',
        'broken clouds': 'cloudy.jpg',
        'overcast clouds': 'cloudy.jpg',
        'haze': 'cloudy.png',
        'smoke': 'smoky.png',
    };

    return imageMappings[description.toLowerCase()] || '';
}

