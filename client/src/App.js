import React from "react";
import "materialize-css";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./Routes";
import { useAuth } from "./hooks/auth.hook";
import { authContext } from "./context/authContext";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";

function App() {
  const { token, userId, login, logout, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = Routes(isAuthenticated);
  console.log(token);
  if (!ready) {
    return <Loader />;
  }

  return (
    <authContext.Provider
      value={{ token, userId, login, logout, isAuthenticated }}
    >
      <BrowserRouter>
        <div className="container">
          {isAuthenticated && <Navbar />}
          {routes}
        </div>
      </BrowserRouter>
    </authContext.Provider>
  );
}

export default App;
