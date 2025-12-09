import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Preloader from "./components/Pre";
import { PortfolioProvider } from "./context/PortfolioContext";
import { ROUTES } from "./data/navigation.config";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Lazy Loaded Components
const Home = lazy(() => import("./components/Home/Home"));
const About = lazy(() => import("./components/About/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Resume = lazy(() => import("./components/Resume/ResumeNew"));

function AppContent() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <ScrollToTop />
        <main className="content">
          <Suspense fallback={<Preloader load={true} />}>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.ABOUT} element={<About />} />
              <Route path={ROUTES.PROJECTS} element={<Projects />} />
              <Route path={ROUTES.RESUME} element={<Resume />} />
              <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
            </Routes>
          </Suspense>
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
