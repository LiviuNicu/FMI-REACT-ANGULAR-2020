import React from "react";
import { useHistory } from "react-router-dom";

export function Home() {
  const history = useHistory();
  const goToLogin = () => {
    history.push("/login");
  };
  const goToRegister = () => {
    history.push("/register");
  };
  return (
    <>
      <h1>HOME</h1>
      <button className="btn btn-primary" onClick={goToLogin}>
        Login
      </button>
      <button className="btn btn-primary" onClick={goToRegister}>
        Register
      </button>
    </>
  );
}
