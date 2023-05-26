import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDeleteCardClick,
  onCardLike,
}) {
  const userData = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__box">
          <button
            className="profile__avatar-edit-button"
            type="button"
            onClick={onEditAvatar}
          >
            <img
              className="profile__avatar"
              alt={userData.about}
              src={userData.avatar}
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__header">{userData.name}</h1>
            <button
              className="profile__edit-button opacity"
              type="button"
              aria-label="Редактировать"
              onClick={onEditProfile}
            ></button>
            <p className="profile__text">{userData.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button opacity"
          type="button"
          onClick={onAddPlace}
          aria-label="Добавить карточку"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onDeleteCardClick={onDeleteCardClick}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
