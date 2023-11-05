import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  const onClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Page doesn't exist</p>
      <button onClick={onClick} className="link-button">
        Home
      </button>
    </div>
  );
}
