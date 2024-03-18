import React, { useState, useEffect } from "react";
import ContinueWithGoogle from "../Components/continueWithGoogle";
import { Link, useSearchParams } from "react-router-dom";
import http from "../httpService";
import { toast } from "react-toastify";

export default function SignIn() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [{ email, password }, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (searchParams.has("isAuthError")) {
      toast.error("Your session has expired!");
      searchParams.delete("isAuthError");
      setSearchParams(searchParams);
    }
  }, []);

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      await http.post("/auth", {
        email,
        password,
      });

      setIsSubmitting(false);
    } catch (e) {
      setIsSubmitting(false);
      if (e.response?.data?.validation) setError(e.response.data.validation);
    }
  }

  return (
    <div className="auth">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="auth__container"
      >
        <fieldset className="auth__content">
          <h1 className="auth__title">Sign In</h1>
          <div>
            <ContinueWithGoogle />

            <div className="auth__or">or</div>

            <div className="auth__form-element">
              <label htmlFor="emailField">Email</label>
              <input
                autoFocus
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
              <label
                // className="auth-password-label-with-forgot"
                htmlFor="passwordField"
              >
                Password
              </label>
              {/* <div className="auth__forgot-password-container">
                <input
                  className="auth__forgot-password button button-clear"
                  type="submit"
                  value="Forgot Password?"
                />
              </div> */}
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

            <input
              type="submit"
              disabled={isSubmitting}
              value="Send"
              onClick={handleSubmit}
            />
            <div className="auth__instead">
              <Link to={"/sign-up"} className="button button-outline">
                Sign Up Instead
              </Link>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
