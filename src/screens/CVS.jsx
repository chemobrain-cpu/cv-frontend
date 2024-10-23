import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Nav, Navbar } from 'react-bootstrap';
import { FaUserCircle, FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    let navigate = useNavigate();

    const handleLogout = () => {
        // Add logout functionality
    };

    // Dummy CV data (replace with dynamic data as needed)
    const userCVs = [
        { id: 1, title: 'Software Engineer CV', dateCreated: '2023-08-15' },
        { id: 2, title: 'Marketing Manager CV', dateCreated: '2023-09-05' },
        { id: 3, title: 'Graphic Designer CV', dateCreated: '2023-10-01' },
    ];

    const renderCVs = () => {
        return userCVs.map((cv) => (
            <Col xs={12} md={4} key={cv.id} className="mb-4">
                <Card className="cv-card shadow-sm">
                    <Card.Body>
                        <FaFileAlt size={40} className="text-primary mb-3" />
                        <Card.Title>{cv.title}</Card.Title>
                        <Card.Text>
                            <small className="text-muted">Created on: {cv.dateCreated}</small>
                        </Card.Text>
                        <Button variant="outline-primary" onClick={() => navigate(`/cv/${cv.id}`)}>
                            View CV
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        ));
    };

    return (
        <div className="dashboard-container">
            <div className={`sidebar ${sidebarOpen ? 'visible' : ''}`}>
                <div className="sidebar-header d-flex justify-content-between align-items-center">
                    <h4 className="text-white text-center bg-transparent">Dashboard</h4>
                    <Button
                        variant="outline-light"
                        className="d-md-none sidebar-toggle"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        ☰
                    </Button>
                </div>
                <Nav className="flex-column">
                    <Nav.Link
                        onClick={() => {
                            navigate('/cvs');
                        }}
                        className="text-white active"
                    >
                        My CVs
                    </Nav.Link>
                    <Nav.Link
                        onClick={() => {
                            navigate('/template');
                        }}
                        className="text-white"
                    >
                        Templates
                    </Nav.Link>
                    <Nav.Link
                        onClick={() => {
                            navigate('/profilesetting');
                        }}
                        className="text-white"
                    >
                        Profile Settings
                    </Nav.Link>
                    <Nav.Link onClick={handleLogout} className="text-white">
                        Logout
                    </Nav.Link>
                </Nav>
            </div>

            <Container fluid className="main-content">
                <Navbar expand="lg" className="shadow-lg mb-4 py-3 header-navbar" style={{ backgroundColor: '#007bff' }}>
                    <Container fluid>
                        <Row className="w-100 align-items-center">
                            <Col xs={6} md={4} className="d-flex align-items-center">
                                <Navbar.Brand
    className="ml-3 welcome-text"
    style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#ffffff' // Changed to white
    }}
>
    Welcome!
</Navbar.Brand>

                            </Col>

                            <Col xs={6} md={8} className="d-flex justify-content-end align-items-center">
                                <FaUserCircle size={35} className="me-3 user-icon text-white" />
                                <Button variant="outline-light" className="ml-auto me-3 logout-btn" style={{ borderRadius: '20px', padding: '0.5rem 1.5rem', fontWeight: '500' }}>
                                    Logout
                                </Button>
                            </Col>

                            <Button
                                variant="outline-light"
                                className="d-lg-none ms-auto me-3 sidebar-toggle-btn"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                style={{ fontSize: '1.5rem', padding: '0.5rem', borderRadius: '10px' }}
                            >
                                ☰
                            </Button>
                        </Row>
                    </Container>
                </Navbar>

                <div className="content">
                    <h2 className="mb-4">My CVs</h2>
                    <Row>{renderCVs()}</Row>
                </div>
            </Container>
        </div>
    );
};

export default Dashboard;

