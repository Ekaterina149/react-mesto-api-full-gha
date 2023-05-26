import PopupWithForm from "./PopupWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../hook/useFormAndValidation";
function EditAvatarPopup({
  formName,
  title,
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (!isOpen) {
      resetForm("");
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    const avatar = values.avatar;
    evt.preventDefault();
    if (isValid) {
      onUpdateAvatar(avatar);
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
            value={values.avatar || ""}
            className="popup__input popup__input_type_link"
            type="url"
            name="avatar"
            id="avatarlink"
            placeholder="Ссылка на аватар"
            required
            onChange={handleChange}
          />
          <span className="avatarlink-error popup__input-error">
            {errors.avatar || ""}
          </span>
        </label>
      </>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
