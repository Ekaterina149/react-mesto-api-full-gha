import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hook/useFormAndValidation";
import { useEffect } from "react";
function AddPlacePopup({
  formName,
  title,
  isOpen,
  onClose,
  onAddPlace,
  isLoading,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    if (isValid) {
      const { placeName, link } = values;
      onAddPlace({
        name: placeName,
        link,
      });
    }
  }
  useEffect(() => {
    if (!isOpen) {
      resetForm({ placeName: "", link: "" }, {}, {});
    }
  }, [isOpen]);

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
            className="popup__input popup__input_type_place"
            type="text"
            id="placeInput"
            name="placeName"
            value={values.placeName || ""}
            placeholder="Название"
            minLength="2"
            maxLength="30"
            pattern="^[a-zA-ZА-Яа-яЁё\s\-]+$"
            required
            onChange={handleChange}
          />
          <span className="placeInput-error popup__input-error">
            {errors.placeName || ""}
          </span>
        </label>
        <label className="popup__label">
          <input
            className="popup__input popup__input_type_link"
            type="url"
            id="linkInput"
            name="link"
            value={values.link || ""}
            placeholder="Ссылка на картинку"
            required
            onChange={handleChange}
          />
          <span className="linkInput-error popup__input-error">
            {errors.link || ""}
          </span>
        </label>
      </>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
