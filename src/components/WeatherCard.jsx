import "./WeatherCard.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperature = weatherData.temp[currentTemperatureUnit];

  return (
    <section className={`weather-card weather-card_type_${weatherData.type}`}>
      <p className="weather-card__temp">
        {temperature}&deg;{currentTemperatureUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
