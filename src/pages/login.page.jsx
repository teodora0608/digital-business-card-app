// src/pages/login.page.jsx
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import FormGroup from "../common/form-group"
import PasswordField from "../common/password-field"
import { loginUser } from "../api/auth.js"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [invalidFields, setInvalidFields] = useState({
    email: false,
    password: false,
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setInvalidFields({ email: false, password: false })
    setIsLoading(true)

    // email format
    if (!emailRegex.test(formData.email)) {
      setInvalidFields({ email: true, password: false })
      toast.error("Te rog introdu o adresă de email validă.")
      setIsLoading(false)
      return
    }

    try {
      await loginUser(formData.email, formData.password)
      toast.success("Te-ai autentificat cu succes!")
      navigate("/dashboard")
    } catch (err) {
      let msg = ""
      const badFields = { email: false, password: false }

      switch (err.code) {
        case "auth/wrong-password":
          msg = "Parola este incorectă. Încearcă din nou."
          badFields.password = true
          break
        case "auth/user-not-found":
          msg = "Nu există niciun cont cu acest email."
          badFields.email = true
          break
        case "auth/invalid-email":
          msg = "Te rog introdu o adresă de email validă."
          badFields.email = true
          break
        case "auth/invalid-credential":
          msg = "Email sau parolă incorectă."
          badFields.email = true
          badFields.password = true
          break
        default:
          msg = "A apărut o eroare: " + err.message
      }

      setInvalidFields(badFields)
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }))
    setInvalidFields({ email: false, password: false })
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
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
              className={invalidFields.email ? "border-red-500" : ""}
            />

            <PasswordField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              className={invalidFields.password ? "border-red-500" : ""}
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center px-4 py-3 rounded-lg font-semibold transition-colors bg-purple-600 text-white ${
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
              {isLoading ? "Signing in…" : "Sign In"}
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
  )
}

export default LoginPage
