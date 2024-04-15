import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import http from "../httpService";

export default function SendPassResetLink() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isResending, setIsResending] = useState(false);
  const [resend, setResend] = useState(0);
  useEffect(async () => {
    if (!location.state?.email) navigate("/forgot-pass");

    const redirectedFromSignUp =
      resend === 0 && location.state?.from === "forget-pass";

    if (redirectedFromSignUp) toast.success("Email have been sent 👌");

    if (!redirectedFromSignUp) {
      const toastId = toast.loading("Sending the email ⏰");

      try {
        setIsResending(true);
        await http.post("/reset-password/request-password-reset", {
          email: location.state?.email,
        });
        setIsResending(false);
        toast.update(toastId, {
          render: "Email have been sent 👌",
          type: "success",
          isLoading: false,
          autoClose: true,
        });
      } catch (err) {
        setIsResending(false);
        toast.dismiss(toastId);
      }
    }
  }, [resend]);

  return (
    <div className="send-verification">
      <h1>Send Password Reset Link</h1>
      <div className="send-verification__resent-container">
        <strong>{location.state.email}</strong>
        <p>Haven't received the email yet?</p>
        <button
          disabled={isResending}
          onClick={() => setResend((old) => (old += 1))}
          style={{ background: "var(--color-green)" }}
        >
          Resend
        </button>
      </div>
      <p>You can close this tab if you've recieved the password reset link</p>
      <Link className="send-verification__skip" to="/sign-in">
        Sign In
      </Link>
    </div>
  );
}
