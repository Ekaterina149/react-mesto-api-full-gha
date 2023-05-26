function InfoTooltip({ onClose, status, isOpen }) {
  const { image, message } = status;
  return (
    <div className={isOpen ? "popup popup_opened" : "popup"}>
      <div className="  popup__container popup__container_size_auth ">
        <button
          className="popup__close opacity"
          type="button"
          onClick={onClose}
        >
          {" "}
        </button>
        <img
          className="popup__image popup__image_size_auth"
          src={image}
          alt={`Информационное сообщение: ${message}`}
        ></img>
        <h2 className="popup__header popup__header_size_auth">{message}</h2>
      </div>
    </div>
  );
}
export default InfoTooltip;
