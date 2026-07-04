import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <section className={`weather-card weather-card_type_${weatherData.type}`}>
      <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p>
    </section>
  );
}

export default WeatherCard;
