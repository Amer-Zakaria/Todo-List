import React, { useMemo } from "react";
import GoogleButton from "react-google-button";
import getGoogleOAuthLink from "../Utils/getGoogleOAuthLink";

export default function () {
  const googleURL = useMemo(() => getGoogleOAuthLink(), []);

  return (
    <GoogleButton
      style={{
        width: "100%",
        background: "#f3f2f7",
        color: "#333",
        borderRadius: "5px",
        "&:hover": {
          background: "#000000 !important",
        },
      }}
      label="Continue with Google"
      onClick={() => window.open(googleURL, "_self")}
    />
  );
}
