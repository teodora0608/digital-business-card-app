
import { useState, useEffect } from "react"
import Navbar from "../common/navbar"
import Footer from "../common/footer"
import HeroSection from "../components/hero.section.jsx"
import FeaturesGrid from "../components/features.grid.jsx"
import WhyChoose from "../components/why.choose.jsx"

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isVisible, setIsVisible] = useState({})

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        showLogout={false}
        showProfileLink={false}
        showShare={false}
        showGetStarted={true}
        cardData={null}
      />

      <main className="container mx-auto px-6">
        <HeroSection isDarkMode={isDarkMode} />
        <FeaturesGrid isDarkMode={isDarkMode} isVisible={isVisible} />
        <WhyChoose isDarkMode={isDarkMode} isVisible={isVisible} />
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}

export default HomePage
