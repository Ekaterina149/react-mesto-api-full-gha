import { Link } from "react-router-dom";
import { useFormAndValidation } from "../hook/useFormAndValidation";
function Register({ linkBottomPage, onRegister, route }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmit(evt) {
    const { email, password } = values;
    evt.preventDefault();
    if (isValid) {
      onRegister(email, password);
      resetForm();
    }
  }
  return (
    <div className="user">
      <div className="user__container">
        <h2 className="user__header">Регистрация</h2>
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
              <span className="placeInput-error user__input-error">
                {errors.email || ""}
              </span>
            </label>
            <label className="user__label">
              <input
                className="user__input user__input_type_password"
                type="password"
                id="passwordInput"
                name="password"
                minLength="8"
                placeholder="Пароль"
                value={values.password || ""}
                onChange={handleChange}
                required
              />
              <span className="linkInput-error user__input-error">
                {errors.password || ""}
              </span>
            </label>
          </fieldset>
          <button
            className="user__btn opacity"
            type="submit"
            aria-label="Зарегистрироваться"
          >
            Зарегистрироваться
          </button>
          {linkBottomPage && (
            <Link className="user__link" to={route}>
              {linkBottomPage}
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}
export default Register;
