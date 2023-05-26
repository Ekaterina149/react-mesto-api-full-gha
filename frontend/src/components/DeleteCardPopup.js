import PopupWithForm from "./PopupWithForm";
function DeleteCardPopup({
  formName,
  title,
  isOpen,
  onClose,
  onCardDelete,
  card,
  isLoading,
}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name={formName}
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      buttonName="Да"
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <></>
    </PopupWithForm>
  );
}
export default DeleteCardPopup;
