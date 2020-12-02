import React, { useState, useEffect } from "react";
import { doLogin, reqLoginError, reqLoggedIn } from "./../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isNotValid, setIsNotValid] = useState(false);
  const [serverError, setServerError] = useState(false);
  const dispatch = useDispatch();
  const serverErrorSelector = useSelector(reqLoginError);
  const serverIsLoggedIn = useSelector(reqLoggedIn);
  let history = useHistory();

  const login = () => {
    const data = {
      email,
      password,
    };
    dispatch(doLogin(data));
  };

  useEffect(() => {
    setServerError(serverErrorSelector);
    setIsNotValid(!(email && password));

    if (serverIsLoggedIn) {
      console.log("Redirect ...");
      history.push("/game");
    }
  }, [email, password, serverErrorSelector, serverIsLoggedIn]);

  return (
    <>
      <h1>LOGIN</h1>
      {isNotValid && (
        <div className="alert alert-danger">
          Email and password are required
        </div>
      )}

      {serverError && (
        <div className="alert alert-danger">
          Server Error: email or password is invalid
        </div>
      )}
      <input
        type="text"
        className="form-control"
        placeholder="Email ..."
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />
      <input
        type="password"
        className="form-control"
        placeholder="Password ..."
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />
      <button className="btn btn-success" disabled={isNotValid} onClick={login}>
        Login
      </button>
    </>
  );
}
