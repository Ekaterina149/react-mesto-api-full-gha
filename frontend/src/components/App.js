import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import React, { useState, useEffect } from "react";
import { api, setApi } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRouteElement from "./ProtectedRoute";
import * as apiAuth from "../utils/apiAuth";
import Yes from "../images/Yes.svg";
import No from "../images/No.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    about: "",
    avatar: "",
    name: "",
  });
  const [cards, setCards] = useState([]);
  const [deletePlaceConfirm, setDeletePlaceConfirm] = useState({
    isOpen: false,
    card: {},
  });
  const [isLoading, setLoading] = useState(false);
  // Стейт меняет значение, если пользователь авторизован
  // от его значения зависит, куда перебросит пользователя при переходе по маршруту "/"
  //см. компонент ProtectedRoute
  const [isLoggedIn, setLoggedIn] = useState(false);
  // Стейт для определения вида, который будет принимать попап,
  // когда пользователь будет регистрироваться и/или авторизоваться
  const [regStatus, setRegStatus] = useState({ image: "", message: "" });
  // Стейт используемый для передачи в компонент Header, если пользователь авторизован
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();
  // Получаем данные с сервера и устанавливаем значения стейтов, используемых для
  // профиля пользователя и карточек
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getData("/users/me"), api.getData("/cards")])

        .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCards([...cardData]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn]);
  // Если пользователь зарегестрирован (его id есть в localStorage ),
  // то переходим сразу на страницу с карточками
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      const jwt = localStorage.getItem("userId");
      if (jwt) {
        // если id пользователя есть в локальном хранилище, 
        // отправим GET запрос на получение данных о текущем пользователе
        apiAuth
          .checkToken(jwt)
          .then((res) => {
            if (res) {
              // авторизуем пользователя
              setLoggedIn(true);
              setUserEmail(res.email);
              navigate("/", { replace: true });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }, []);
  // Функция вызова всплывающего окна редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  // Функция вызова всплывающего окна добавления карточек
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  // Функция вызова всплывающего окна редактирования аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  // Функция вызова всплывающего окна увеличенного размера карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  // Функция вызова всплывающего окна удаления карточки
  function handleDeletePopupClick(card) {
    setDeletePlaceConfirm({ isOpen: true, card: card });
  }
  // Функция удаления карточки
  function handleCardDelete(card) {
    setLoading(true);
    setApi
      .setData(`/cards/${card._id}`, "DELETE")
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }
  // Функция закрытия всех всплывающих окон
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setDeletePlaceConfirm({ isOpen: false, card: {} });
    setInfoToolTipOpen(false);
  }
  // Функция добавления/удаления лайка
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    setApi
      .setData(`/cards/${card._id}/likes`, !isLiked ? "PUT" : "DELETE")
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Функция обновления данных пользователя
  function handleUpdateUser(userInfo) {
    setLoading(true);
    setApi
      .setData("/users/me", "PATCH", userInfo)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }
  // Функция обновления аватара пользователя
  function handleUpdateAvatar(link) {
    setLoading(true);
    setApi
      .setData("/users/me/avatar", "PATCH", { avatar: link })
      .then((updatedAvatar) => {
        setCurrentUser(updatedAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }
  // Функция добавления новой карточки
  function handleAddPlaceSubmit(cardInfo) {
    setLoading(true);
    setApi
      .setData("/cards", "POST", cardInfo)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }
  // Функция регистрации пользователя
  function handleRegister(email, password) {
    apiAuth
      .register(email, password)
      .then((res) => {
        setRegStatus({ image: Yes, message: "Вы успешно зарегистрировались!" });
        navigate("/signin");
        console.log(res);
      })
      .catch(() => {
        setRegStatus({
          image: No,
          message: "Что-то пошло не так! Попробуйте еще раз.",
        });
      })
      .finally(() => setInfoToolTipOpen(true));
  }
  // Функция авторизации пользователя
  function handleAuthorize(email, password) {
    apiAuth
      .authorize(email, password)
      .then((res) => {
        if (res._id) {
          console.log(res);
          localStorage.setItem("userId", res._id);
          setUserEmail(email);
          setLoggedIn(true);

          navigate("/", { replace: true });
        }
        console.log(res);
      })
      .catch(() => {
        setRegStatus({
          image: No,
          message: "Что-то пошло не так! Попробуйте еще раз.",
        });
        setInfoToolTipOpen(true);
      });
  }
  // Функция выхода пользователя
  function handleLogOut() {
    apiAuth.unauthorize()
    .then(() => {
      setLoggedIn(false);
      localStorage.removeItem("userId");
      setUserEmail(null);
      navigate("/signin");
    })
    .catch(err => {
      console.log(err);
    })
    
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Header
                    linkToLog="Выйти"
                    onClick={handleLogOut}
                    userEmail={userEmail}
                    route=""
                  />
                  <ProtectedRouteElement
                    component={Main}
                    loggedIn={isLoggedIn}
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onDeleteCardClick={handleDeletePopupClick}
                    onCardLike={handleCardLike}
                  />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <Header linkToLog=" Войти" route="/signin" />
                  <Register
                    linkBottomPage="Уже зарегистрированы? Войти "
                    onRegister={handleRegister}
                    route="/signin"
                  />
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <>
                  <Header linkToLog="Регистрация" route="/signup" />
                  <Login onAuthorize={handleAuthorize} />
                </>
              }
            />
          </Routes>
          <EditProfilePopup
            formName="edit"
            title="Редактировать профиль"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <AddPlacePopup
            name="add"
            title="Новое место"
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />

          <EditAvatarPopup
            formName="avatar"
            title="Обновить аватар"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <DeleteCardPopup
            formname="delete-card"
            title="Вы уверены?"
            isOpen={deletePlaceConfirm.isOpen}
            onClose={closeAllPopups}
            buttonName="Да"
            card={deletePlaceConfirm.card}
            onCardDelete={handleCardDelete}
            isLoading={isLoading}
          />
          <InfoTooltip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            status={regStatus}
          />

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
