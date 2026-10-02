import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Prediction from "./pages/Prediction";
import History from "./pages/History";
import Result from "./pages/Result";
import Dashboard from "./pages/Dashboard";


// ===============================
// PROTECTED ROUTE
// ===============================

function ProtectedRoute({ children }) {
  const loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn !== "true") {
    return <Navigate to="/login" replace />;
  }

  return children;
}


// ===============================
// LOGIN / REGISTER PROTECTION
// ===============================

function AuthRoute({ children }) {
  const loggedIn = localStorage.getItem("loggedIn");

  if (loggedIn === "true") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}


// ===============================
// MAIN APP
// ===============================

function AppContent() {
  const location = useLocation();

  const loggedIn = localStorage.getItem("loggedIn") === "true";

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {/* Show Navbar only after login */}
      {loggedIn && !isAuthPage && <Navbar />}

      <Routes>

        {/* =========================
            LOGIN
        ========================= */}

        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />


        {/* =========================
            REGISTER
        ========================= */}

        <Route
          path="/register"
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />


        {/* =========================
            PROTECTED WEBSITE
        ========================= */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/prediction"
          element={
            <ProtectedRoute>
              <Prediction />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />


        {/* =========================
            UNKNOWN URL
        ========================= */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </>
  );
}


// ===============================
// APP
// ===============================

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;