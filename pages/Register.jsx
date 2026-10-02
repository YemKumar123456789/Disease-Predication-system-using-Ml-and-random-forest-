import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getPasswordStrength = () => {
    const password = formData.password;

    if (!password) {
      return {
        text: "Enter a password",
        width: "0%",
        className: "",
      };
    }

    if (password.length < 6) {
      return {
        text: "Weak",
        width: "25%",
        className: "weak",
      };
    }

    if (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return {
        text: "Strong",
        width: "100%",
        className: "strong",
      };
    }

    return {
      text: "Medium",
      width: "60%",
      className: "medium",
    };
  };

  const strength = getPasswordStrength();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    if (!agree) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const user = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      // Save user using the same key that Login.jsx uses
      localStorage.setItem("user", JSON.stringify(user));

      // Make sure the newly registered user is not automatically logged in
      localStorage.removeItem("loggedIn");

      setLoading(false);

      alert("Account created successfully!");

      navigate("/login");
    }, 1000);
  };

  return (
    <div className="register-page">

      {/* Background decorations */}
      <div className="medical-shape shape-one"></div>
      <div className="medical-shape shape-two"></div>

      <div className="register-container">

        {/* LEFT SIDE */}
        <div className="register-info">

          <div className="brand-logo">
            <span className="heart-icon">♡</span>

            <span>
              Medi<span>Predict</span>
            </span>
          </div>

          <p className="brand-tagline">
            Better Insights. Healthier Tomorrow.
          </p>

          <h1>
            Create Your
            <br />
            Account
          </h1>

          <p className="info-description">
            Join MediPredict and take the first step toward
            smarter health awareness. Track your predictions,
            review your history and explore personalized insights.
          </p>

          <div className="benefit-list">

            <div className="benefit">
              <div className="benefit-icon">✓</div>

              <div>
                <h3>Secure & Private</h3>
                <p>Your information stays protected.</p>
              </div>
            </div>

            <div className="benefit">
              <div className="benefit-icon">⌁</div>

              <div>
                <h3>Track Your History</h3>
                <p>Access your previous predictions anytime.</p>
              </div>
            </div>

            <div className="benefit">
              <div className="benefit-icon">♡</div>

              <div>
                <h3>Personalized Experience</h3>
                <p>Get a better experience over time.</p>
              </div>
            </div>

          </div>

          <div className="health-message">
            Your health matters <span>♡</span>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="register-form-section">

          <div className="form-heading">

            <div className="user-circle">
              👤
            </div>

            <div>
              <h2>Register</h2>
              <p>Create your account to get started.</p>
            </div>

          </div>

          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <div className="input-group">

              <label>Full Name</label>

              <div className="input-wrapper">

                <span>👤</span>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* EMAIL */}
            <div className="input-group">

              <label>Email Address</label>

              <div className="input-wrapper">

                <span>✉</span>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* PASSWORD ROW */}
            <div className="password-row">

              {/* PASSWORD */}
              <div className="input-group">

                <label>Password</label>

                <div className="input-wrapper">

                  <span>🔒</span>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Minimum 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="eye-button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>

                </div>

              </div>

              {/* CONFIRM PASSWORD */}
              <div className="input-group">

                <label>Confirm Password</label>

                <div className="input-wrapper">

                  <span>🔒</span>

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="eye-button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword ? "🙈" : "👁"}
                  </button>

                </div>

              </div>

            </div>

            {/* PASSWORD STRENGTH */}
            <div className="password-strength">

              <div className="strength-header">

                <span>Password Strength</span>

                <strong className={strength.className}>
                  {strength.text}
                </strong>

              </div>

              <div className="strength-bar">

                <div
                  className={`strength-progress ${strength.className}`}
                  style={{
                    width: strength.width,
                  }}
                ></div>

              </div>

            </div>

            {/* TERMS */}
            <div className="terms">

              <input
                type="checkbox"
                checked={agree}
                onChange={(e) =>
                  setAgree(e.target.checked)
                }
              />

              <p>
                I agree to the{" "}
                <a href="#terms">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#privacy">
                  Privacy Policy
                </a>
                .
              </p>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="create-account-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  <span>👤+</span>
                  Create Account
                  <span>→</span>
                </>
              )}
            </button>

          </form>

          {/* LOGIN */}
          <div className="login-box">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;