
const WhyChoose = ({ isDarkMode, isVisible }) => {
  return (
         <section
          id="why-choose"
          data-animate
          className={`py-24 transition-all duration-1000 delay-200 ${
            isVisible["why-choose"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Why choose KeepCard?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div
              className={`flex items-start space-x-4 p-6 rounded-2xl transition-all duration-200 hover:shadow-lg ${
                isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Quick Start</h3>
                <p className={`leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Start creating immediately, upgrade for more features
                </p>
              </div>
            </div>

            <div
              className={`flex items-start space-x-4 p-6 rounded-2xl transition-all duration-200 hover:shadow-lg ${
                isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Real-time Preview
                </h3>
                <p className={`leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  See changes instantly as you customize your card
                </p>
              </div>
            </div>

            <div
              className={`flex items-start space-x-4 p-6 rounded-2xl transition-all duration-200 hover:shadow-lg ${
                isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Professional Templates
                </h3>
                <p className={`leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Choose from carefully designed themes for any industry
                </p>
              </div>
            </div>

            <div
              className={`flex items-start space-x-4 p-6 rounded-2xl transition-all duration-200 hover:shadow-lg ${
                isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-50"
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-fuchsia-400 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Mobile Optimized
                </h3>
                <p className={`leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Perfect experience on smartphones and tablets
                </p>
              </div>
            </div>
          </div>
        </section>
    

  );
};

export default WhyChoose;