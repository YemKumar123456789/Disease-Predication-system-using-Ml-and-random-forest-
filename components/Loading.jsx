import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <Link to="/" className="logo">
            Medi<span>Predict</span>
          </Link>

          <p>
            Machine learning based disease prediction system
            designed for educational and informational purposes.
          </p>
        </div>

        <div className="footer-column">
          <h4>Platform</h4>

          <Link to="/">Home</Link>
          <Link to="/prediction">Prediction</Link>
          <Link to="/history">History</Link>
        </div>

        <div className="footer-column">
          <h4>Account</h4>

          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <div className="footer-column">
          <h4>Important</h4>

          <a href="/#how-it-works">How It Works</a>
          <a href="/#features">Features</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 MediPredict. All rights reserved.
        </p>

        <p>
          For educational purposes only.
        </p>
      </div>

    </footer>
  );
}

export default Footer;