import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar, Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';  // Import human icon
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'; // Add the CSS file for styling
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to control sidebar toggle on mobile
  let navigate = useNavigate();


  let handleLogout = () => {

  }

  const [currentPage, setCurrentPage] = useState(0);
  const templates = [
    { src: 'Basic.jpg', alt: 'CV Template 1', id: 'template_1' },
    { src: 'phd-cv-example.webp', alt: 'CV Template 2', id: 'template_2' },
    { src: 'cv3.jpg', alt: 'CV Template 3', id: 'template_3' },
    { src: 'cv4.jpg', alt: 'CV Template 4', id: 'template_4' },
    { src: 'cv5.jpg', alt: 'CV Template 5', id: 'template_5' },
    { src: 'cv6.jpg', alt: 'CV Template 6', id: 'template_6' },
    { src: 'cv7.jpg', alt: 'CV Template 7', id: 'template_7' },
    { src: 'cv8.jpg', alt: 'CV Template 8', id: 'template_8' },
  ];

  // Display 3 images at a time
  const itemsPerPage = 3;
  const totalPages = Math.ceil(templates.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages - 1 ? prevPage + 1 : totalPages - 1));
  };






  const navigateHandler = (id) => {
    if (id === 'template_1') {
      navigate('/form_job');
    } else if (id === 'template_2') {
      navigate('/form_education');
    } else if (id === 'template_3') {
      navigate('/form_3');
    }
  };


  const renderContent = () => {
    return (
      <main className="bg-white p-4">
        <p
          className="text-dark my-4 mx-auto text-center fs-6 fs-md-5 fs-lg-4 px-3 px-md-4 aos-init aos-animate"
          data-aos="fade-up"
        >
          A great job application leads to a good interview. An amazing resume is what makes it
          all possible. Here are the Best Templates for you to choose from.
        </p>

        {/* Pagination Buttons */}
        <div className="d-flex justify-content-between mb-4" data-aos="fade-right">
          <button
            className="btn btn-outline-primary rounded-pill px-4 py-2"
            onClick={handlePrevious}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            className="btn btn-outline-primary rounded-pill px-4 py-2"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>

        {/* Template Cards */}
        <div className="row templates-list gy-4 gx-4">
          {templates
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((template) => (
              <div
                key={template.id}
                className="templates-item col-12 col-md-6 col-lg-4 aos-init aos-animate"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className="card shadow-lg h-100 border-0">
                  <img
                    src={template.src}
                    alt={template.alt}
                    className="card-img-top img-fluid rounded"
                    style={{ height: '220px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-center">{template.alt}</h5>
                    <button
                      onClick={() => navigateHandler(template.id)}
                      className="btn btn-primary mt-auto rounded-pill"
                    >
                      Select Template
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
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
          {renderContent()}
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;

