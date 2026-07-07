import React, { Suspense, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Particle from "./components/Particle";
import ScrollProgressBar from "./components/ScrollProgressBar";
import { PortfolioProvider } from "./context/PortfolioContext";
import Home from "./pages/Home";

const About = React.lazy(() => import("./pages/About"));
const Projects = React.lazy(() => import("./pages/Projects"));
const Resume = React.lazy(() => import("./pages/Resume"));

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
          <Suspense fallback={null}>
            <About />
            <Projects />
            <Resume unlocked={resumeUnlocked} />
          </Suspense>
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
