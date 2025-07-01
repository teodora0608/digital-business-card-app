import { Link } from "react-router-dom";

const HeroSection = ({ isDarkMode }) => {
  return (
    <main className="container mx-auto px-6">
      <section className="py-24 lg:py-32 text-center">
        <div className="max-w-5xl mx-auto">
          <h1
            className={`text-5xl lg:text-7xl font-bold mb-8 leading-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Your Digital Business Card,{" "}
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              Ready in Minutes
            </span>
          </h1>

          <p
            className={`text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Create, customize, and share your professional digital business card instantly.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white text-xl font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl group"
          >
            Get Started
            <svg
              className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
