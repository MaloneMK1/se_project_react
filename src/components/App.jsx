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
  const [isLoading, setIsLoading] = useState(false);
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

  function getToken() {
    return localStorage.getItem("jwt");
  }

  function handleSubmit(makeRequest, errorMessage) {
    setIsLoading(true);

    return makeRequest()
      .then(handleCloseModal)
      .catch((error) => console.error(errorMessage, error))
      .finally(() => setIsLoading(false));
  }

  function authenticate(credentials) {
    return authorize(credentials)
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        return checkToken(token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/");
      });
  }

  function handleLogin(credentials, resetForm) {
    return handleSubmit(
      () => authenticate(credentials).then(() => resetForm?.()),
      "Unable to log in:",
    );
  }

  function handleRegister(userData, resetForm) {
    return handleSubmit(
      () =>
        register(userData)
          .then(() =>
            authenticate({
              email: userData.email,
              password: userData.password,
            }),
          )
          .then(() => resetForm()),
      "Unable to register:",
    );
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    handleCloseModal();
    navigate("/");
  }

  function handleAddItem(values, resetForm) {
    return handleSubmit(
      () =>
        addItem(values, getToken()).then((newItem) => {
          setClothingItems((items) => [newItem, ...items]);
          resetForm();
        }),
      "Unable to add item:",
    );
  }

  function handleCardDelete() {
    if (!cardToDelete) {
      return;
    }

    const itemId = cardToDelete._id;
    return handleSubmit(
      () =>
        deleteItem(itemId, getToken()).then(() => {
          setClothingItems((items) =>
            items.filter((item) => item._id !== itemId),
          );
        }),
      "Unable to delete item:",
    );
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
    return handleSubmit(
      () => updateUser(values, getToken()).then(setCurrentUser),
      "Unable to update profile:",
    );
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
            isLoading={isLoading}
            onClose={handleCloseModal}
            onRegister={handleRegister}
            onSwitchToLogin={() => setActiveModal("login")}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            isLoading={isLoading}
            onClose={handleCloseModal}
            onLogin={handleLogin}
            onSwitchToRegister={() => setActiveModal("register")}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            isLoading={isLoading}
            onClose={handleCloseModal}
            onUpdateProfile={handleUpdateProfile}
          />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            isLoading={isLoading}
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
            isLoading={isLoading}
            onClose={handleCloseModal}
            onConfirm={handleCardDelete}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
