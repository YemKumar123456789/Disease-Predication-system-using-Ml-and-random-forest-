import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const loggedIn = localStorage.getItem("mediPredictUser");

  const logout = () => {
    localStorage.removeItem("mediPredictUser");
    window.location.href = "/";
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link to="/" className="logo" onClick={closeMenu}>
          Medi<span>Predict</span>
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div className={`nav-menu ${menuOpen ? "open" : ""}`}>

          <div className="nav-links">

            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              onClick={closeMenu}
            >
              Home
            </Link>

            <a href="/#how-it-works" onClick={closeMenu}>
              How It Works
            </a>

            <a href="/#features" onClick={closeMenu}>
              Features
            </a>

            <Link
              to="/prediction"
              className={location.pathname === "/prediction" ? "active" : ""}
              onClick={closeMenu}
            >
              Prediction
            </Link>

            <Link
              to="/history"
              className={location.pathname === "/history" ? "active" : ""}
              onClick={closeMenu}
            >
              History
            </Link>

          </div>

          <div className="nav-actions">

            {loggedIn ? (
              <>
                <span className="user-badge">
                  👤 {JSON.parse(loggedIn).name}
                </span>

                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="login-btn" onClick={closeMenu}>
                  Login
                </Link>

                <Link
                  to="/register"
                  className="register-btn"
                  onClick={closeMenu}
                >
                  Get Started
                </Link>
              </>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;