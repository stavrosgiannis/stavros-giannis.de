import React, { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { AiOutlineHome, AiOutlineFundProjectionScreen, AiOutlineUser } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { usePortfolio } from "../context/PortfolioContext";
import { MAX_ATTEMPTS, LOCK_DURATION } from "../utils/constants";

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

function NavBar({ onResumeUnlock }) {
  const [expanded, setExpanded] = useState(false);
  const [navColour, setNavColour] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const throttleRef = useRef(null);
  const { resumeConfig } = usePortfolio();

  const handleScroll = useCallback(() => {
    setNavColour(window.scrollY >= 20);
  }, []);

  useEffect(() => {
    const handleThrottledScroll = () => {
      if (throttleRef.current) clearTimeout(throttleRef.current);
      throttleRef.current = setTimeout(handleScroll, 100);
    };

    window.addEventListener("scroll", handleThrottledScroll);
    return () => {
      window.removeEventListener("scroll", handleThrottledScroll);
      if (throttleRef.current) clearTimeout(throttleRef.current);
    };
  }, [handleScroll]);

  const handleAccessRequest = useCallback(() => {
    if (isLocked) return;

    if (accessCode === resumeConfig.accessCode) {
      setShowAccessModal(false);
      setAccessCode("");
      setAttemptCount(0);
      setErrorMessage("");
      onResumeUnlock();
    } else {
      const nextCount = attemptCount + 1;
      setAccessCode("");

      if (nextCount >= MAX_ATTEMPTS) {
        setIsLocked(true);
        setAttemptCount(0);
        setErrorMessage("Too many failed attempts. Please try again in 1 hour.");
        setTimeout(() => {
          setIsLocked(false);
          setAttemptCount(0);
          setErrorMessage("");
        }, LOCK_DURATION);
      } else {
        setAttemptCount(nextCount);
        setErrorMessage(
          `${resumeConfig.denialMessage} (${nextCount}/${MAX_ATTEMPTS} attempts)`
        );
      }
    }
  }, [accessCode, attemptCount, isLocked, onResumeUnlock, resumeConfig]);

  const handleCloseModal = useCallback(() => {
    setShowAccessModal(false);
    setAccessCode("");
    if (!isLocked) {
      setAttemptCount(0);
      setErrorMessage("");
    }
  }, [isLocked]);

  const handleNavClick = useCallback((id) => {
    setExpanded(false);
    scrollToSection(id);
  }, []);

  const handleResumeClick = useCallback(() => {
    setExpanded(false);
    setShowAccessModal(true);
  }, []);

  return (
    <>
      <Navbar
        expanded={expanded}
        fixed="top"
        expand="md"
        className={navColour ? "sticky" : "navbar"}
      >
        <Container>
          <Navbar.Brand
            href="#home"
            className="navbar-brand"
            onClick={() => scrollToSection("home")}
          >
            <span className="hud-brand">[ SG ]</span>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => setExpanded(!expanded)}
          >
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto" defaultActiveKey="#home">
              <Nav.Item>
                <Nav.Link href="#home" onClick={() => handleNavClick("home")}>
                  <AiOutlineHome /> Home
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href="#about" onClick={() => handleNavClick("about")}>
                  <AiOutlineUser /> About
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link href="#projects" onClick={() => handleNavClick("projects")}>
                  <AiOutlineFundProjectionScreen /> Projects
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link onClick={handleResumeClick} style={{ cursor: "pointer" }}>
                  <CgFileDocument /> Resume
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showAccessModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="pixel-kicker">ARCHIVE GATE</span>
            {resumeConfig.accessCodeMessage}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="accessCode">
              <Form.Label>Enter Access Code</Form.Label>
              <Form.Control
                type="password"
                placeholder="Access Code"
                value={accessCode}
                disabled={isLocked}
                onChange={(e) => setAccessCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAccessRequest()}
              />
            </Form.Group>
            {errorMessage && (
              <p className="text-danger mt-2 mb-0" role="alert">
                {errorMessage}
              </p>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAccessRequest}
            disabled={isLocked}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default React.memo(NavBar);
