import React from "react";
import { useFormAndValidation } from "../hook/useFormAndValidation";
function Login({ onAuthorize }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      const { email, password } = values;
      onAuthorize(email, password);
    }
    resetForm();
  }
  return (
    <div className="user">
      <div className="user__container">
        <h2 className="user__header">Вход</h2>
        <form
          className="user__form"
          name="form"
          method="get"
          onSubmit={handleSubmit}
          noValidate
        >
          <fieldset className="user__fieldset">
            <label className="user__label">
              <input
                className="user__input user__input_type_email"
                type="email"
                id="email"
                name="email"
                placeholder="email"
                minLength="2"
                value={values.email || ""}
                onChange={handleChange}
                required
              />
              <span className="placeInput-error popup__input-error">
                {errors.email || ""}
              </span>
            </label>
            <label className="user__label">
              <input
                className="user__input user__input_type_password"
                type="password"
                id="passwordInput"
                name="password"
                placeholder="Пароль"
                onChange={handleChange}
                minLength="2"
                required
                value={values.password || ""}
              />
              <span className="linkInput-error popup__input-error">
                {errors.password || ""}
              </span>
            </label>
          </fieldset>
          <button
            className="user__btn opacity"
            type="submit"
            aria-label="Зарегистрироваться"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
