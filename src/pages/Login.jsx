import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const FEATURES = [
  "Request documents online — no more queueing",
  "Track enrollment, grades, and clearance in one place",
  "Pay fees and get receipts instantly",
];

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [studentNo, setStudentNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!studentNo.trim() || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const result = login(studentNo.trim(), password);
      setSubmitting(false);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      navigate("/dashboard", { replace: true });
    }, 400);
  }

  return (
    <div className="login-split">
      <aside className="login-aside">
        <div className="login-logo-box">LOGO</div>

        <div className="login-aside-body">
          <h1>Your student services,<br />all in one place.</h1>
          <div className="login-aside-rule" />

          {FEATURES.map((f) => (
            <div className="feature-row" key={f}>
              <span className="dot" />
              {f}
            </div>
          ))}
        </div>

        <div className="login-aside-footer">
          © 2026 University of Cabuyao — Student Services Information System
        </div>
      </aside>

      <div className="login-form-side">
        <form className="login-form-wrap" onSubmit={handleSubmit}>
          <h2>Sign in to SSIS</h2>
          <div className="heading-rule" />

          <div className="field">
            <label htmlFor="studentNo">
              Student ID / Email<span className="req">*</span>
            </label>
            <input
              id="studentNo"
              type="text"
              placeholder="e.g. 21-0001"
              value={studentNo}
              onChange={(e) => setStudentNo(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="field">
            <label htmlFor="password">
              Password<span className="req">*</span>
            </label>
            <div className="password-field">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="show-toggle"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <div className="error-banner">{error}</div>}

          <div className="field-row">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#forgot" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          </div>

          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Signing in…" : "Log In"}
          </button>

          <p className="login-help">
            Demo account — ID <strong>21-0001</strong> · Password <strong>password123</strong>
          </p>
        </form>
      </div>
    </div>
  );
}
