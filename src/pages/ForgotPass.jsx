import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../httpService";
import { toast } from "react-toastify";

export default function ForgotPass() {
  const navigate = useNavigate();
  const [{ email }, setEmail] = useState({
    email: "",
  });
  const [error, setError] = useState({ email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      await http.post("/reset-password/request-password-reset", {
        email: email.trim(),
      });

      navigate("/send-pass-reset-link", {
        state: { from: "forget-pass", email: email.trim() },
      });

      setIsSubmitting(false);
    } catch (e) {
      setIsSubmitting(false);
      if (e.response.status === 403)
        toast.error("You're email is not verified");
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
          <h1 className="auth__title">Forgot Password</h1>
          <div>
            <div className="auth__form-element">
              <label htmlFor="emailField">Enter your email</label>
              <input
                autoFocus
                type="text"
                value={email}
                onChange={(e) => {
                  setError((oldError) => ({ ...oldError, email: "" }));
                  setEmail((oldUser) => ({
                    ...oldUser,
                    email: e.target.value,
                  }));
                }}
                id="emailField"
                style={error.email ? { marginBottom: 0 } : {}}
              />
              {error.email && (
                <p className="auth__field-error">{error.email}</p>
              )}
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
