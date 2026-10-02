import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          Medi<span>Predict</span>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/">Home</Link>

          <a href="/#how-it-works">How It Works</a>

          <a href="/#features">Features</a>

          <Link to="/prediction">Prediction</Link>

          <Link to="/history">History</Link>
        </div>

        {/* Right Buttons */}
        <div className="navbar-actions">

          <button
            onClick={handleLogout}
            className="login-link logout-button"
          >
            Logout
          </button>

          <Link to="/register" className="get-started">
            Get Started
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;