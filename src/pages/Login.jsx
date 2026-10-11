import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, register } from '../api';

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const sessionExpiredMessage = location.state?.message;

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setLoading(true);
    try {
      if (isRegister) {
        const data = await register(email.trim(), password);
        setIsRegister(false);
        setPassword('');
        setSuccessMessage(data?.message || 'Registration successful! Please log in.');
      } else {
        await login(email.trim(), password);
        navigate('/projects');
      }
    } catch (err) {
      setError(err.message || (isRegister ? 'Registration failed.' : 'Login failed.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content auth-page">
      <section className="section">
        <h2 className="section-title">
          {isRegister ? 'Register Account' : 'Account Login'}
        </h2>
        <p className="section-subtitle-text" style={{ marginBottom: '1.5rem', color: '#64748b' }}>
          {isRegister
            ? 'Create a new account to manage and access your personal tasks.'
            : 'Log in with your registered credentials to access your tasks.'}
        </p>

        {sessionExpiredMessage && !error && (
          <div className="action-error-banner" role="alert">
            <span>⚠️ {sessionExpiredMessage}</span>
          </div>
        )}

        <div className="task-form-card">
          <div className="toggle-header" style={{ marginBottom: '1.25rem' }}>
            <h3 className="form-heading" style={{ margin: 0 }}>
              {isRegister ? 'Sign Up' : 'Log In'}
            </h3>
            <button
              type="button"
              className="toggle-btn"
              onClick={toggleMode}
            >
              {isRegister ? 'Switch to Log in' : 'Switch to Register'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="task-form">
            <div className="form-group">
              <label htmlFor="auth-email" className="form-label">
                Email Address <span className="required-star">*</span>
              </label>
              <input
                id="auth-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="name@example.com"
                className="form-input"
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="auth-password" className="form-label">
                Password <span className="required-star">*</span>
              </label>
              <input
                id="auth-password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="••••••••"
                className="form-input"
                disabled={loading}
                required
              />
            </div>

            {error && (
              <div className="form-inline-error" role="alert">
                ⚠️ {error}
              </div>
            )}

            {successMessage && (
              <div className="success-banner" role="status">
                ✓ {successMessage}
              </div>
            )}

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {loading
                ? isRegister
                  ? 'Registering...'
                  : 'Logging in...'
                : isRegister
                ? 'Register'
                : 'Log in'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
