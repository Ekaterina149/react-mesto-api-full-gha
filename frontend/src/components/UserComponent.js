function UserComponent({ title, buttonText, linkBottomPage }) {
  return (
    <div className="user">
      <div className="user__container">
        <h2 className="user__header">{title}</h2>
        <form className="user__form" name="form" method="get">
          <fieldset className="user__fieldset" id="fieldsetPlacename">
            <label className="user__label">
              <input
                className="user__input user__input_type_email"
                type="email"
                id="email"
                name="email"
                placeholder="email"
                minLength="2"
                maxLength="50"
                pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
                required
              />
              <span className="placeInput-error user__input-error"></span>
            </label>
            <label className="user__label">
              <input
                className="user__input user__input_type_password"
                type="password"
                id="passwordInput"
                name="password"
                placeholder="Пароль"
                required
              />
              <span className="linkInput-error user__input-error"></span>
            </label>
          </fieldset>
          <button
            className="user__btn opacity"
            type="submit"
            aria-label="Зарегистрироваться"
          >
            {buttonText}
          </button>
          {linkBottomPage && (
            <a className="user__link" href="#" target="_blank">
              {linkBottomPage}
            </a>
          )}
        </form>
      </div>
    </div>
  );
}
export default UserComponent;
