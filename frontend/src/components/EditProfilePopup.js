import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useEffect, useContext } from "react";
import { useFormAndValidation } from "../hook/useFormAndValidation";

function EditProfilePopup({
  formName,
  title,
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (!isOpen) {
      resetForm({ name: currentUser.name, about: currentUser.about });
    }
  }, [isOpen, currentUser]);
  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    const { name, about } = values;
    // Передаём значения управляемых компонентов во внешний обработчик
    if (isValid) {
      onUpdateUser({
        name,
        about,
      });
    }
  }
  return (
    <PopupWithForm
      name={formName}
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <>
        <label className="popup__label">
          <input
            className="popup__input popup__input_type_name"
            type="text"
            id="nameInput"
            name="name"
            placeholder="Имя"
            value={values.name || ""}
            minLength="3"
            maxLength="40"
            pattern="^[a-zA-ZА-Яа-яЁё\s\-]+$"
            required
            onChange={handleChange}
          />
          <span className="nameInput-error popup__input-error">
            {errors.name || ""}
          </span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_type_job"
            type="text"
            id="jobInput"
            name="about"
            placeholder="Деятельность"
            minLength="2"
            maxLength="200"
            pattern="^[a-zA-ZА-Яа-яЁё\s\-]+$"
            required
            value={values.about || ""}
            onChange={handleChange}
          />
          <span className="jobInput-error popup__input-error">
            {errors.about || ""}
          </span>
        </label>
      </>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
