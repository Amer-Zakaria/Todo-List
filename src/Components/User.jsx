import React, { useContext } from "react";
import { getUser } from "../Utils/token";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import TodosContext from "../Context/todosContext";

export default function () {
  const user = getUser();

  return (
    <>
      {user && (
        <div className="user">
          <p className="user__name">{user.name}</p>
          <div>
            <div>
              <p className="user__email">{user.email}</p>
              <span
                className="badge"
                style={
                  user.emailVerification.isVerified
                    ? {
                        backgroundColor: "var(--color-blue)",
                        color: "white",
                      }
                    : {
                        backgroundColor: "khaki",
                        color: "black",
                      }
                }
              >
                {user.emailVerification.isVerified
                  ? "Verified ✔"
                  : "unverified"}
              </span>
            </div>
            {!user.emailVerification.isVerified && (
              <p className="user__warning">
                Warning:{" "}
                <Link
                  to="/send-email-verification"
                  className="user__verify-button"
                >
                  Verify
                </Link>{" "}
                your email now, so you can retrieve it if you forgot your
                password.
              </p>
            )}
          </div>
          <LogoutButton />
        </div>
      )}
    </>
  );
}
