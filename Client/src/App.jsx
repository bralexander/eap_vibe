
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Quote request submitted successfully!');
        handleClose();
      } else if (response){
        console.log(response)
      } else {
        alert('Failed to submit quote request.');
      }
    } catch (error) {
      console.error('Error submitting quote request:', error);
      alert('An error occurred while submitting the quote request.');
    }
  };

  const handleTestApi = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/test', {
        method: 'GET',
      });
      if (response.ok) {
        alert("test success!");
        console.log(response.status)
      } 
    } catch (error) {
      console.error('Error submitting quote request:', error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">EAP</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="hero-section">
        <div className="container">
          <h1>Welcome to EAP</h1>
          <p className="lead">Your Trusted Partner for Electrical Arc-Flash & Power System Studies</p>
          <Button variant="primary" size="lg" onClick={handleShow}>
            Get a Quote
          </Button>
          <Button variant="secondary" size="lg" onClick={handleTestApi} className="ms-3">
            Test API
          </Button>
        </div>
      </header>

      <section className="services-section">
        <div className="container">
          <h2 className="text-center mb-5">Our Services</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="service-card">
                <h3>Arc Flash Studies</h3>
                <p>Our comprehensive Arc Flash Studies help ensure the safety of your personnel and compliance with regulatory standards. We identify potential arc flash hazards, determine safe working distances, and recommend appropriate personal protective equipment (PPE).</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="service-card">
                <h3>Coordination Studies</h3>
                <p>Our Coordination Studies are designed to improve the reliability and selectivity of your electrical power system. We analyze your system's protective devices to ensure that faults are isolated quickly and effectively, minimizing downtime and equipment damage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container text-center">
          <p>&copy; 2025 EAP. All Rights Reserved.</p>
        </div>
      </footer>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Request a Quote</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="Enter your phone number" name="phone" value={formData.phone} onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
