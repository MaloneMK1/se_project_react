import "./Main.css";
import ItemCard from "./ItemCard";
import WeatherCard from "./WeatherCard";

function Main({ clothingItems, weatherData, onCardClick }) {
  const filteredItems = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherData.type;
  });

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">Today is {weatherData.type} / You may want to wear:</p>
        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
