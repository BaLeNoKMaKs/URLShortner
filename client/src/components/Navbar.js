import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { authContext } from "../context/authContext";

export default function Navbar() {
  const auth = useContext(authContext);
  const history = useHistory();

  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: "0 20px" }}>
        <div className="brand-logo">Сокращение ссылок</div>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Создать</NavLink>
          </li>
          <li>
            <NavLink to="/links">Ссылки</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
