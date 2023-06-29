/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouteError, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const navigate = useNavigate();

  const onClick = (e) => {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div id="error-page">
        <h1>Oops!</h1>
        <p>Page doesnt exist</p>
        {/* <p>
            <i>{error.statusText || error.message}</i>
        </p> */}
        <a href="#" onClick={onClick}>
            Home
        </a>
    </div>
  );
}