import { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "../App.css";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import {
  addCardLike,
  addItem,
  deleteItem,
  getItems,
  removeCardLike,
} from "../utils/api";
import { authorize, checkToken, register, updateUser } from "../utils/auth";
import { apiKey, coordinates } from "../utils/constants";
import { getWeather } from "../utils/weatherApi";
import AddItemModal from "./AddItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditProfileModal from "./EditProfileModal";
import Footer from "./Footer";
import Header from "./Header";
import ItemModal from "./ItemModal";
import LoginModal from "./LoginModal";
import Main from "./Main";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";
import RegisterModal from "./RegisterModal";

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    type: "warm",
    temp: { F: 75, C: 24 },
    city: "New York",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
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
      .then(setWeatherData)
      .catch((error) => console.error("Unable to load weather:", error));
  }, []);

  useEffect(() => {
    getItems()
      .then(setClothingItems)
      .catch((error) => console.error("Unable to load clothing items:", error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setIsCheckingToken(false);
      return;
    }

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Saved login is no longer valid:", error);
        localStorage.removeItem("jwt");
      })
      .finally(() => setIsCheckingToken(false));
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
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal, handleCloseModal]);

  function getToken() {
    return localStorage.getItem("jwt");
  }

  function handleLogin(credentials, resetForm) {
    return authorize(credentials)
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        return checkToken(token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        resetForm?.();
        handleCloseModal();
        navigate("/");
      })
      .catch((error) => console.error("Unable to log in:", error));
  }

  function handleRegister(userData, resetForm) {
    return register(userData)
      .then(() =>
        handleLogin(
          { email: userData.email, password: userData.password },
          resetForm,
        ),
      )
      .catch((error) => console.error("Unable to register:", error));
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    handleCloseModal();
  }

  function handleAddItem(values, resetForm) {
    addItem(values, getToken())
      .then((newItem) => {
        setClothingItems((items) => [newItem, ...items]);
        resetForm();
        handleCloseModal();
      })
      .catch((error) => console.error("Unable to add item:", error));
  }

  function handleCardDelete() {
    if (!cardToDelete) {
      return;
    }

    deleteItem(cardToDelete._id, getToken())
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== cardToDelete._id),
        );
        handleCloseModal();
      })
      .catch((error) => console.error("Unable to delete item:", error));
  }

  function handleCardLike({ id, isLiked }) {
    const request = isLiked ? removeCardLike : addCardLike;

    request(id, getToken())
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch((error) => console.error("Unable to update like:", error));
  }

  function handleUpdateProfile(values) {
    updateUser(values, getToken())
      .then((user) => {
        setCurrentUser(user);
        handleCloseModal();
      })
      .catch((error) => console.error("Unable to update profile:", error));
  }

  function handleToggleSwitchChange() {
    setCurrentTemperatureUnit((unit) => (unit === "F" ? "C" : "F"));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <Header
            weatherData={weatherData}
            isLoggedIn={isLoggedIn}
            onAddClick={() => setActiveModal("add-garment")}
            onLoginClick={() => setActiveModal("login")}
            onRegisterClick={() => setActiveModal("register")}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  clothingItems={clothingItems}
                  weatherData={weatherData}
                  isLoggedIn={isLoggedIn}
                  onCardClick={(card) => {
                    setSelectedCard(card);
                    setActiveModal("preview");
                  }}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  isCheckingToken={isCheckingToken}
                >
                  <Profile
                    clothingItems={clothingItems}
                    onAddClick={() => setActiveModal("add-garment")}
                    onCardClick={(card) => {
                      setSelectedCard(card);
                      setActiveModal("preview");
                    }}
                    onCardLike={handleCardLike}
                    onEditProfile={() => setActiveModal("edit-profile")}
                    onLogout={handleLogout}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={handleCloseModal}
            onRegister={handleRegister}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={handleCloseModal}
            onLogin={handleLogin}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={handleCloseModal}
            onUpdateProfile={handleUpdateProfile}
          />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItem}
            onCloseModal={handleCloseModal}
          />
          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "preview"}
            onClose={handleCloseModal}
            onDeleteClick={(card) => {
              setCardToDelete(card);
              setActiveModal("delete-confirmation");
            }}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirmation"}
            onClose={handleCloseModal}
            onConfirm={handleCardDelete}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
