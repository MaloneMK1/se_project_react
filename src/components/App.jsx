import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "../App.css";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { addItem, deleteItem, getItems } from "../utils/api";
import { apiKey, coordinates } from "../utils/constants";
import { getWeather } from "../utils/weatherApi";
import AddItemModal from "./AddItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Footer from "./Footer";
import Header from "./Header";
import ItemModal from "./ItemModal";
import Main from "./Main";
import Profile from "./Profile";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "warm",
    temp: {
      F: 75,
      C: 24,
    },
    city: "New York",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  const handleCloseModal = useCallback(() => {
    setActiveModal("");
    setSelectedCard(null);
    setCardToDelete(null);
  }, []);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) {
      return undefined;
    }

    function handleEscClose(event) {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal, handleCloseModal]);

  function handleAddClick() {
    setActiveModal("add-garment");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((currentUnit) => (currentUnit === "F" ? "C" : "F"));
  }

  function handleAddItem(values, resetForm) {
    addItem(values)
      .then((newItem) => {
        setClothingItems((currentItems) => [newItem, ...currentItems]);
        resetForm();
        handleCloseModal();
      })
      .catch(console.error);
  }

  function openConfirmationModal(card) {
    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  }

  function handleCardDelete() {
    if (!cardToDelete) {
      return;
    }

    deleteItem(cardToDelete._id)
      .then(() => {
        setClothingItems((currentItems) =>
          currentItems.filter((item) => item._id !== cardToDelete._id),
        );
        handleCloseModal();
      })
      .catch(console.error);
  }

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header weatherData={weatherData} onAddClick={handleAddClick} />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                clothingItems={clothingItems}
                weatherData={weatherData}
                onCardClick={handleCardClick}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                clothingItems={clothingItems}
                onAddClick={handleAddClick}
                onCardClick={handleCardClick}
              />
            }
          />
        </Routes>
        <Footer />
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItem}
          onCloseModal={handleCloseModal}
        />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "preview"}
          onClose={handleCloseModal}
          onDeleteClick={openConfirmationModal}
        />
        <DeleteConfirmationModal
          isOpen={activeModal === "delete-confirmation"}
          onClose={handleCloseModal}
          onConfirm={handleCardDelete}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
