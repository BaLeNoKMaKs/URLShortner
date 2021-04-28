import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { authContext } from "../context/authContext";

export default function Auth() {
  const auth = useContext(authContext);
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      message(data.message);
      console.log(auth);
      auth.login(data.token, data.userId);
    } catch {}
  };

  return (
    <div className="row">
      <div className="col m8 offset-m2 center">
        <h1>Сократи ссылку</h1>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  value={form.email}
                  id="email"
                  type="text"
                  className="validate"
                  name="email"
                  onChange={changeHandler}
                />
                <label htmlFor="email">E-mail</label>
              </div>
              <div className="input-field">
                <input
                  value={form.password}
                  id="password"
                  type="password"
                  className="validate"
                  name="password"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Введите пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              disabled={loading}
              onClick={loginHandler}
              className="waves-effect waves-light btn"
              style={{ marginRight: 10 }}
            >
              Войти
            </button>
            <button
              disabled={loading}
              onClick={registerHandler}
              className="waves-effect waves-light btn red"
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
