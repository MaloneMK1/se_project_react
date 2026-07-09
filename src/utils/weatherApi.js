import { checkResponse } from "./api";

export function getWeatherCondition(temperature) {
  if (temperature >= 86) {
    return "hot";
  }

  if (temperature >= 66) {
    return "warm";
  }

  return "cold";
}

export function filterWeatherData(weatherApiResponse) {
  const temperature = Math.round(weatherApiResponse.main.temp);

  return {
    temp: {
      F: temperature,
      C: Math.round((temperature - 32) * (5 / 9)),
    },
    city: weatherApiResponse.name,
    type: getWeatherCondition(temperature),
  };
}

export function getWeather({ latitude, longitude }, apiKey) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  )
    .then(checkResponse)
    .then(filterWeatherData);
}
