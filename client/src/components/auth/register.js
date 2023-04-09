import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();

  const handleInputChange = (e) => {
    setShowError(false);

    const { id, value } = e.target;
    if (id === "Name") {
      setName(value);
    }

    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async () => {

    setShowError(true);
    if (password !== confirmPassword) {
      setError("Password and confirmPassword doesn't match!");
    } else {
      const response = await axios({
        method: "post",
        withCredentials: true,
        url: "http://localhost:4000/api/v1/user/signup",
        data: {
          name,
          email,
          password,
        },
      });

      setError(response.data.message);
      if (response.data.message === "Successfully Registered!") {
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="form">
      <h1 className="title">REGISTER</h1>
      <div className="form-body">
        <div className="username">
          <label className="form__label" for="Name">
            Name
          </label>
          <input
            className="form__input"
            type="text"
            value={name}
            onChange={(e) => handleInputChange(e)}
            id="Name"
            placeholder="Name"
          />
        </div>
        <div className="email">
          <label className="form__label" for="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form__input"
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
          />
        </div>
        <div className="password">
          <label className="form__label" for="password">
            Password{" "}
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />
        </div>
        <div className="confirm-password">
          <label className="form__label" for="confirmPassword">
            Confirm Password
          </label>
          <input
            className="form__input"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
            placeholder="Confirm Password"
          />
        </div>
      </div>
      <div class="footer">
        {showError ? <div className="error">{error}</div> : ""}

        <button onClick={() => handleSubmit()} type="submit">
          Register
        </button>
        <div>----or-----</div>
        <div
          className="btn"
          onClick={() => {
            navigate("/login");
          }}
        >
          {" "}
          login{" "}
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
