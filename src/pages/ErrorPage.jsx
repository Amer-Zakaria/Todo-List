import { useRouteError } from "react-router-dom";

export default function ErrorPage({ errorMessage }) {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage || error.statusText || error.message}</i>
      </p>
      <p>
        Get Back to Your <a href="/">Todos</a>
      </p>
    </div>
  );
}
