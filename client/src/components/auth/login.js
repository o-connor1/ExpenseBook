import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogInForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState();

  const handleInputChange = (e) => {
    setShowError(false);

    const { id, value } = e.target;

    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async () => {
    setShowError(true);

    const response = await axios({
      method: "post",
      withCredentials: true,
      url: "http://localhost:4000/api/v1/user/login",
      data: {
        email,
        password,
      },
    });

    setError(response.data.message);
    if (response.data.message === "login successfully!") {
      navigate("/dashboard");
    }
  };

  const handleForgotPassword=()=>{
    console.log("he");
  }

  return (
    <div className="form">
      <h1 className="title">LOGIN</h1>
      <div className="form-body">
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
            Password
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
      </div>
      <div class="footer">
        {showError ? <div className="error">{error}</div> : ""}
        <button onClick={() => handleSubmit()} type="submit" class="btn">
          LOGIN
        </button>
        <button onClick={() => handleForgotPassword()} type="submit" class="forgetbtn">
          Forgot your Password?
        </button>
      </div>
    </div>
  );
}

export default LogInForm;
