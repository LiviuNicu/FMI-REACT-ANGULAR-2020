import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  doRegister,
  reqRegisterData,
  clearRegisterData,
  userSlice,
} from "./../../slices/userSlice";
import { useHistory } from "react-router-dom";

// name email password confirm_password
export function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm_password, setConfirmPassword] = useState();
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerResponse = useSelector(reqRegisterData);

  useEffect(() => {
    if (registerResponse && registerResponse._id) {
      history.push("/login");
      dispatch(clearRegisterData());
    }
    setIsValid(!(name && email && password && confirm_password));
  }, [registerResponse, name, email, password, confirm_password]);

  const register = () => {
    const data = {
      name,
      email,
      passwords: {
        password,
        confirm_password,
      },
    };

    console.log(data);
    if (!isValid) dispatch(doRegister(data));
  };

  return (
    <>
      <h1>REGISTER</h1>
      {isValid && <div className="alert alert-danger">Formul este invalid</div>}

      {isValid ? (
        <div className="alert alert-danger">Formul este invalid</div>
      ) : (
        <div className="alert alert-success">Formul este valid</div>
      )}

      <input
        type="text"
        className="form-control"
        placeholder="Name ..."
        onChange={(event) => setName(event.target.value)}
        value={name}
      />
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
      <input
        type="password"
        className="form-control"
        placeholder="Confirm Password ..."
        onChange={(event) => setConfirmPassword(event.target.value)}
        value={confirm_password}
      />

      <button className="btn btn-success" disabled={isValid} onClick={register}>
        Register
      </button>
    </>
  );
}
