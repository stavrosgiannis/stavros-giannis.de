import React, { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineFundProjectionScreen, AiOutlineUser } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { usePortfolio } from "../context/PortfolioContext";

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const [navColour, setNavColour] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const navigate = useNavigate();
  const throttleRef = useRef(null);
  const { resumeConfig, routes } = usePortfolio();

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
    if (accessCode === resumeConfig.accessCode) {
      setShowAccessModal(false);
      setAccessCode("");
      navigate(routes.RESUME);
    } else {
      alert(resumeConfig.denialMessage);
      setAccessCode("");
    }
  }, [accessCode, navigate, resumeConfig, routes.RESUME]);

  const handleCloseModal = useCallback(() => {
    setShowAccessModal(false);
    setAccessCode("");
  }, []);

  const handleToggleNav = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  const handleNavClick = useCallback(() => {
    setExpanded(false);
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
                <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
                  <AiOutlineHome /> Home
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link as={Link} to="/about" onClick={() => setExpanded(false)}>
                  <AiOutlineUser /> About
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link as={Link} to={routes.PROJECTS} onClick={handleNavClick}>
                  <AiOutlineFundProjectionScreen /> Projects
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link onClick={handleResumeClick}>
                  <CgFileDocument /> Resume
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Access Request Modal */}
      <Modal show={showAccessModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{resumeConfig.accessCodeMessage}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="accessCode">
              <Form.Label>Enter Access Code</Form.Label>
              <Form.Control
                type="password"
                placeholder="Access Code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAccessRequest()}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAccessRequest}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default React.memo(NavBar);
