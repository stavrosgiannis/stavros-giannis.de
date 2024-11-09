import React, { useState, useEffect, useCallback } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineFundProjectionScreen, AiOutlineUser } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const [navColour, setNavColour] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const navigate = useNavigate();

  const handleScroll = useCallback(() => {
    if (window.scrollY >= 20) {
      setNavColour(true);
    } else {
      setNavColour(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleAccessRequest = () => {
    if (accessCode === "WeWantYou") {
      setShowAccessModal(false);
      navigate("/resume");
    } else {
      alert("Access denied. Incorrect code.");
    }
  };

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
                <Nav.Link as={Link} to="/project" onClick={() => setExpanded(false)}>
                  <AiOutlineFundProjectionScreen /> Projects
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    setExpanded(false);
                    setShowAccessModal(true);
                  }}
                >
                  <CgFileDocument /> Resume
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Access Request Modal */}
      <Modal show={showAccessModal} onHide={() => setShowAccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Request Access to Resume</Modal.Title>
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
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAccessModal(false)}>
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
