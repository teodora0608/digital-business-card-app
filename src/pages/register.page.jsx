// src/pages/register.page.jsx
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import FormGroup from "../common/form-group"
import PasswordField from "../common/password-field"
import { registerUser } from "../api/auth"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../api/firebase-config"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)       // ← loading state
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!")
      return
    }

    setIsLoading(true)    // ← pornește spinner-ul
    try {
      const { user } = await registerUser(
        formData.email,
        formData.password,
        formData.name
      )
      const uid = user.uid

      await setDoc(doc(db, "profiles", uid), {
        fullName: formData.name,
        email: formData.email,
        customUrl: uid,
      })

      toast.success("Account created successfully!")
      navigate("/dashboard")
    } catch (err) {
      console.error(err)
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered.")
      } else {
        toast.error(err.message)
      }
    } finally {
      setIsLoading(false) // ← oprește spinner-ul
    }
  }

  const handleInputChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <Link to="/" className="absolute top-6 left-6 text-gray-400 hover:text-white">
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
          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
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
              disabled={isLoading}   // ← disabled când e loading
              className={`w-full flex justify-center items-center bg-purple-600 text-white py-3 rounded-lg font-semibold transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
              }`}
            >
              {isLoading && (
                <svg
                  className="animate-spin w-5 h-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3 3v4a12 12 0 00-12 12h4z"
                  />
                </svg>
              )}
              {isLoading ? "Creating…" : "Create Account"}
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
  )
}

export default RegisterPage
