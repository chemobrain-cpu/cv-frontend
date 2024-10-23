import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar, Button, Form } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false); // State to control sidebar toggle on mobile
    let navigate = useNavigate();
    
    let handleLogout = () => {

    }
    const [formData, setFormData] = useState({
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        username: 'johndoe',
        jobTitle: 'Software Engineer',
        company: 'Tech Corp',
        skills: 'Java, Python, React',
    });

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission (e.g., send data to API)
        console.log('Profile Updated:', formData);
    };

    const renderContent = () => {
        return (
            <main className="bg-white p-4">
                <h2 className="text-center mb-4">Profile Settings</h2>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formJobTitle">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formCompany">
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formSkills">
                            <Form.Label>Skills</Form.Label>
                            <Form.Control
                                type="text"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-muted">
                                Enter skills separated by commas.
                            </Form.Text>
                        </Form.Group>
                    </Row>

                    <Button variant="primary" type="submit" className="w-100">
                        Save Changes
                    </Button>
                </Form>
            </main>
        );
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className={`sidebar bg-primary ${sidebarOpen ? 'visible' : ''}`}>
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
                <Nav className="flex-column" data-aos="fade-right">
                    <Nav.Link
                        onClick={() => {
                            setActiveTab('myCVs')
                            navigate('/cvs')
                        }}
                        className={`text-white ${activeTab === 'myCVs' ? 'active' : ''}`}
                        data-aos="fade-up" // Animation for this link 
                    >
                        My CVs
                    </Nav.Link>
                    <Nav.Link
                        onClick={() => {
                            setActiveTab('templates')
                            navigate('/template')
                        }}
                        className={`text-white ${activeTab === 'templates' ? 'active' : ''}`}
                        data-aos="fade-up"
                    >
                        Templates
                    </Nav.Link>
                    <Nav.Link
                        onClick={() => {
                            setActiveTab('profileSettings')
                            navigate('/profilesetting')
                        }}
                        className={`text-white ${activeTab === 'profileSettings' ? 'active' : ''}`}
                        data-aos="fade-up"
                    >
                        Profile Settings
                    </Nav.Link>
                    <Nav.Link onClick={handleLogout} className="text-white" data-aos="fade-up">
                        Logout
                    </Nav.Link>
                </Nav>

            </div>

            {/* Main content area */}
            <Container fluid className="main-content " >
                <Navbar expand="lg" className="bg-gradient shadow-lg mb-4 py-3 header-navbar">
                    <Container fluid>
                        <Row className="w-100 align-items-center">
                            {/* Column for Navbar Brand (Welcome text) */}
                            <Col xs={6} md={4} className="d-flex align-items-center">
                                <Navbar.Brand className="ml-3 welcome-text" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: '600', color: '#fff' }}>
                                    Welcome!
                                </Navbar.Brand>
                            </Col>

                            {/* Column for User Icon and Logout Button */}
                            <Col xs={6} md={8} className="d-flex justify-content-end align-items-center">
                                <FaUserCircle size={35} className="me-3 user-icon text-white" />
                                <Button variant="outline-light" className="ml-auto me-3 logout-btn" style={{ borderRadius: '20px', padding: '0.5rem 1.5rem', fontWeight: '500' }} >
                                    Logout
                                </Button>
                            </Col>

                            {/* Sidebar toggle button for mobile */}
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
                    {renderContent()}
                </div>
            </Container>
        </div>


    );
};

export default ProfileSettings;




