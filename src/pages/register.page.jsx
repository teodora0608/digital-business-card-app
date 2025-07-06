import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormGroup from "../common/form-group";
import PasswordField from "../common/password-field";
import { registerUser } from "../api/auth"; // acum include și creare profil Firestore

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      // apel unificat: Auth + Firestore (profil default)
      await registerUser(
        formData.email,
        formData.password,
        formData.name
      );

      // după succes, merg la dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        alert("This email is already registered.");
      } else {
        alert(err.message);
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <Link
        to="/"
        className="absolute top-6 left-6 text-gray-400 hover:text-white"
      >
        ← Back to Home
      </Link>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">
            Join KeepCard to unlock premium features…
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormGroup
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />

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
              placeholder="Create a password (min. 6 characters)"
              required
              minLength={6}
            />

            <PasswordField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              required
            />

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:text-purple-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;