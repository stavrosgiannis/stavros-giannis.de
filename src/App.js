import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Particle from "./components/Particle";
import ScrollToTop from "./components/ScrollToTop";
import { PortfolioProvider } from "./context/PortfolioContext";
import { ROUTES } from "./data/navigation.config";
import {
  HomeSkeleton,
  AboutSkeleton,
  ProjectsSkeleton,
  ResumeSkeleton,
} from "./components/skeletons";
import "bootstrap/dist/css/bootstrap.min.css";

// Lazy Loaded Components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Resume = lazy(() => import("./pages/Resume"));

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
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="App">
        <Particle />
        <Navbar />
        <ScrollToTop />
        <main className="content">
          <ErrorBoundary>
            <Routes>
              <Route
                path={ROUTES.HOME}
                element={
                  <Suspense fallback={<HomeSkeleton />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path={ROUTES.ABOUT}
                element={
                  <Suspense fallback={<AboutSkeleton />}>
                    <About />
                  </Suspense>
                }
              />
              <Route
                path={ROUTES.PROJECTS}
                element={
                  <Suspense fallback={<ProjectsSkeleton />}>
                    <Projects />
                  </Suspense>
                }
              />
              <Route
                path={ROUTES.RESUME}
                element={
                  <Suspense fallback={<ResumeSkeleton />}>
                    <Resume />
                  </Suspense>
                }
              />
              <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}
