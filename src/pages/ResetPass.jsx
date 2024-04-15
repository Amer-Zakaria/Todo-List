import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import http from "../httpService";
import { toast } from "react-toastify";

export default function ResetPass() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [{ newPassword, confirmNewPassword, token }, setNewPass] = useState({
    newPassword: "",
    confirmNewPassword: "",
    token: "",
  });
  const [error, setError] = useState({
    newPassword: "",
    confirmNewPassword: "",
    token: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (error.token) {
      toast.error("Token is expired, please generate a new link.");
      navigate("/forgot-pass");
    }
  }, [error.token]);

  useEffect(() => {
    if (searchParams.has("resetPassToken")) {
      setNewPass((oldValues) => ({
        ...oldValues,
        token: searchParams.get("resetPassToken"),
      }));
      searchParams.delete("resetPassToken");
      setSearchParams(searchParams);
    } else {
      toast.error("Corrput URL");
      navigate("/forgot-pass");
    }
  }, []);

  async function handleSubmit() {
    if (newPassword !== confirmNewPassword)
      return setError((oldErrors) => ({
        ...oldErrors,
        confirmNewPassword: "New password should equal confirm new password",
      }));
    setIsSubmitting(true);
    try {
      await http.put("/reset-password", {
        newPassword,
        token,
      });

      navigate("/");

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
          <h1 className="auth__title">Reset password</h1>
          <div>
            <div className="auth__form-element">
              <label htmlFor="newPass">New password</label>
              <input
                autoFocus
                type="password"
                value={newPassword}
                onChange={(e) => {
                  setError((oldError) => ({ ...oldError, newPassword: "" }));
                  setNewPass((oldUser) => ({
                    ...oldUser,
                    newPassword: e.target.value,
                  }));
                }}
                placeholder="********"
                id="newPass"
                style={error.newPassword ? { marginBottom: 0 } : {}}
              />
              {error.newPassword && (
                <p className="auth__field-error">{error.newPassword}</p>
              )}
            </div>

            <div className="auth__form-element">
              <label htmlFor="ConfirmNewPass">Confirm your new password</label>
              <input
                autoFocus
                type="password"
                value={confirmNewPassword}
                onChange={(e) => {
                  setError((oldError) => ({
                    ...oldError,
                    confirmNewPassword: "",
                  }));
                  setNewPass((oldUser) => ({
                    ...oldUser,
                    confirmNewPassword: e.target.value,
                  }));
                }}
                placeholder="********"
                id="ConfirmNewPass"
                style={error.confirmNewPassword ? { marginBottom: 0 } : {}}
              />
              {error.confirmNewPassword && (
                <p className="auth__field-error">{error.confirmNewPassword}</p>
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
