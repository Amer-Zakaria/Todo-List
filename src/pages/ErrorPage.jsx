import { Link, useRouteError, useSearchParams } from "react-router-dom";

export default function ErrorPage({ errorTitle, errorMessageAlternative }) {
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get("message");
  const routeError = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p> {errorTitle || "Sorry, an unexpected error has occurred."} </p>
      <p>
        <i>
          {errorMessage ||
            errorMessageAlternative ||
            routeError.statusText ||
            routeError.message}
        </i>
      </p>
      <p>
        Get Back to Your <Link to="/">Todos</Link>
      </p>
    </div>
  );
}
