export default function getGoogleOAuthLink() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    client_id:
      "912237735585-nig1mv1e070tuut7bbsttomjrc7909u8.apps.googleusercontent.com",
    redirect_uri: `${process.env.REACT_APP_API_URL}/oauth/google`,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
}
