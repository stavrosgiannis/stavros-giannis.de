import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Particle from "./components/Particle";
import ScrollProgressBar from "./components/ScrollProgressBar";
import { PortfolioProvider } from "./context/PortfolioContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          Something went wrong. Please refresh the page.
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const [resumeUnlocked, setResumeUnlocked] = useState(false);

  const handleResumeUnlock = () => {
    setResumeUnlocked(true);
    setTimeout(() => {
      document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="App">
      <ScrollProgressBar />
      <Particle />
      <Navbar onResumeUnlock={handleResumeUnlock} />
      <main className="content">
        <ErrorBoundary>
          <Home />
          <About />
          <Projects />
          <Resume unlocked={resumeUnlocked} />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}
