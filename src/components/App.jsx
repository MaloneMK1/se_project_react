import { useEffect, useState } from "react";
import "../App.css";
import { defaultClothingItems } from "../utils/clothingItems";
import { apiKey, coordinates } from "../utils/constants";
import { getWeather } from "../utils/weatherApi";
import Footer from "./Footer";
import Header from "./Header";
import ItemModal from "./ItemModal";
import Main from "./Main";
import ModalWithForm from "./ModalWithForm";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "warm",
    temp: {
      F: 75,
    },
    city: "New York",
  });
  const [clothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!activeModal) {
      return undefined;
    }

    function handleEscClose(event) {
      if (event.key === "Escape") {
        setActiveModal("");
        setSelectedCard(null);
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  function handleAddClick() {
    setActiveModal("add-garment");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <Header weatherData={weatherData} onAddClick={handleAddClick} />
      <Main
        clothingItems={clothingItems}
        weatherData={weatherData}
        onCardClick={handleCardClick}
      />
      <Footer />
      <ModalWithForm
        title="New garment"
        name="add-garment"
        buttonText="Add garment"
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
      >
        <label className="modal__label" htmlFor="name">
          Name
          <input
            className="modal__input"
            id="name"
            name="name"
            placeholder="Name"
            type="text"
          />
        </label>
        <label className="modal__label" htmlFor="imageUrl">
          Image
          <input
            className="modal__input"
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
            type="url"
          />
        </label>
        <fieldset className="modal__fieldset">
          <legend className="modal__legend">Select the weather type:</legend>
          <label className="modal__radio-label" htmlFor="hot">
            <input className="modal__radio" id="hot" name="weather" type="radio" />
            Hot
          </label>
          <label className="modal__radio-label" htmlFor="warm">
            <input className="modal__radio" id="warm" name="weather" type="radio" />
            Warm
          </label>
          <label className="modal__radio-label" htmlFor="cold">
            <input className="modal__radio" id="cold" name="weather" type="radio" />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "preview"}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
