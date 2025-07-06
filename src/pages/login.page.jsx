import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormGroup from "../common/form-group";
import PasswordField from "../common/password-field";
import { loginUser } from "../api/auth.js";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");     // stocăm textul de eroare
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    await loginUser(formData.email, formData.password);
    navigate("/dashboard");
  } catch (err) {
    switch (err.code) {
      case "auth/wrong-password":
        setError("Parola este incorectă. Încearcă din nou.");
        break;
      case "auth/user-not-found":
        setError("Nu există niciun cont cu acest email.");
        break;
      case "auth/invalid-email":
        setError("Te rog introdu o adresă de email validă.");
        break;
      case "auth/invalid-credential":
        setError("Email sau parolă incorectă.");
        break;
      default:
        setError("A apărut o eroare: " + err.message);
    }
  }
};
  const handleInputChange = (e) => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
    setError("");  // ștergem eroarea când userul începe să tasteze
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      {/* Back link & titlu */}
      <Link to="/" className="absolute top-6 left-6 text-gray-400 hover:text-white">
        ← Back to Home
      </Link>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400">
            Sign in to your KeepCard account to manage your digital business cards
          </p>
        </div>

        {/* formular */}
        <div className="bg-slate-800 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            <FormGroup
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />

            <PasswordField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />

            {/* mesajul de eroare afișat sub câmpul de parolă */}
            {error && (
              <p className="text-red-500 text-sm mt-1">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-gray-400">Don't have an account? </span>
            <Link to="/register" className="text-purple-400 hover:text-purple-300 font-medium">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;