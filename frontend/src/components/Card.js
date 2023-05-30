import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onDeleteCardClick }) {
  const userData = useContext(CurrentUserContext);
  const isOwn = card.owner === userData._id;
  console.log(isOwn);
  const isLiked = card.likes.some((i) => i === userData._id);
  
  const cardLikeButtonClassName = `element__heart ${
    isLiked && "element__heart_type_active"
  }`;
  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onDeleteCardClick(card);
  }
  return (
    <div className="element-template">
      <div className="element">
        <img
          className="element__image"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        <div className="element__capture">
          <h2 className="element__text">{card.name}</h2>
          <div className="element__like-container">
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={handleLikeClick}
            ></button>
            <p className="element__likes-amount">{card.likes.length}</p>
          </div>
        </div>
        {isOwn && (
          <button
            className="element__recyclebin"
            type="button"
            onClick={handleDeleteClick}
          ></button>
        )}
      </div>
    </div>
  );
}
export default Card;
