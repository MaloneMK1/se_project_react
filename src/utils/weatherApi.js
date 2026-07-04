function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Error: ${response.status}`);
}

export function getWeatherCondition(temperature) {
  if (temperature >= 86) {
    return "hot";
  }

  if (temperature >= 66) {
    return "warm";
  }

  return "cold";
}

export function filterWeatherData(data) {
  const temperature = Math.round(data.main.temp);

  return {
    temp: {
      F: temperature,
    },
    city: data.name,
    type: getWeatherCondition(temperature),
  };
}

export function getWeather({ latitude, longitude }, APIkey) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  )
    .then(checkResponse)
    .then(filterWeatherData);
}
