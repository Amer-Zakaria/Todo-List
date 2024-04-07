import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import http from "../httpService";
import { getUser } from "../Utils/token";

export default function SendEmailVerificationLink() {
  const location = useLocation();
  const user = getUser();

  const [isResending, setIsResending] = useState(false);
  const [resend, setResend] = useState(0);
  useEffect(async () => {
    const redirectedFromSignUp =
      resend === 0 && location.state?.from === "sign-up";

    if (redirectedFromSignUp) toast.success("Email have been sent 👌");

    if (!redirectedFromSignUp) {
      const toastId = toast.loading("Sending the email ⏰");

      try {
        setIsResending(true);
        await http.post("/users/regenerate-link", {});
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
      <h1>Send Email Verification Link</h1>
      <div className="send-verification__resent-container">
        <strong>{user.email}</strong>
        <p>Haven't received the email yet?</p>
        <button
          disabled={isResending}
          onClick={() => setResend((old) => (old += 1))}
          style={{ background: "var(--color-green)" }}
        >
          Resend
        </button>
      </div>
      <p>You can close this tab if you've recieved the verification link</p>
      <Link className="send-verification__skip" to="/">
        Skip
      </Link>
    </div>
  );
}
