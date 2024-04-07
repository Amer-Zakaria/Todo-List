import React, { useState } from "react";
import ContinueWithGoogle from "../Components/continueWithGoogle";
import { Link, useNavigate } from "react-router-dom";
import http from "../httpService";

export default function SignUp() {
  const navigate = useNavigate();
  const [{ name, email, password, confirmPassword }, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({ name: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (password !== confirmPassword) {
      setError((oldError) => ({
        ...oldError,
        password: "Password should equal confirm password",
      }));
      return;
    }

    setIsSubmitting(true);
    try {
      await http.post("/users", {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      navigate("/send-email-verification", { state: { from: "sign-up" } });

      setIsSubmitting(false);
    } catch (e) {
      setIsSubmitting(false);
      if (e.response?.data?.validation) setError(e.response.data.validation);
    }
  }

  return (
    <div className="auth">
      <form
        className="auth__container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <fieldset className="auth__content">
          <h1 className="auth__title">Sign Up</h1>
          <div>
            <ContinueWithGoogle />
            <div className="auth__or">or</div>
            <div className="auth__form-element">
              <label htmlFor="nameField">Name</label>
              <input
                autoFocus
                type="text"
                value={name}
                onChange={(e) => {
                  setError((oldError) => ({ ...oldError, name: "" }));
                  setUser((oldUser) => ({
                    ...oldUser,
                    name: e.target.value,
                  }));
                }}
                placeholder="Amer Zakaria"
                id="nameField"
                style={error.name ? { marginBottom: 0 } : {}}
              />
              {error.name && <p className="auth__field-error">{error.name}</p>}
            </div>

            <div className="auth__form-element">
              <label htmlFor="emailField">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setError((oldError) => ({ ...oldError, email: "" }));
                  setUser((oldUser) => ({
                    ...oldUser,
                    email: e.target.value,
                  }));
                }}
                placeholder="amerzkfe1234@gmail.com"
                id="emailField"
                style={error.email ? { marginBottom: 0 } : {}}
              />
              {error.email && (
                <p className="auth__field-error">{error.email}</p>
              )}
            </div>

            <div className="auth__form-element">
              <label htmlFor="passwordField">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setError((oldError) => ({ ...oldError, password: "" }));
                  setUser((oldUser) => ({
                    ...oldUser,
                    password: e.target.value,
                  }));
                }}
                placeholder="********"
                id="passwordField"
                style={error.password ? { marginBottom: 0 } : {}}
              />
              {error.password && (
                <p className="auth__field-error">{error.password}</p>
              )}
            </div>

            <div className="auth__form-element">
              <label htmlFor="confirmpassField">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setUser((oldUser) => ({
                    ...oldUser,
                    confirmPassword: e.target.value,
                  }))
                }
                placeholder="********"
                id="confirmpassField"
              />
            </div>

            <input type="submit" disabled={isSubmitting} value="Send" />
            <div className="auth__instead">
              <Link to={"/sign-in"} className="button button-outline">
                Sign In Instead
              </Link>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
