import React from 'react';
import { FaFileInvoice } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Crea8CV = () => {


  let navigate = useNavigate()


let navigateHandler = (to)=>{
  navigate(to)
}





  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container">
          <a className="navbar-brand fw-bold fs-2" href="index.html">
            <span>
              <i className="fa-solid fa-file-invoice"></i>
            </span>
            <span className="navbar-brand-text">Crea8</span> CV
          </a>
          <button 
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-blue fs-18"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Resume Templates
                </a>
                <ul className="dropdown-menu bg-white" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Job CV
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Academic CV
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <button type="button" className="btn btn-login btn-primary ms-lg-4 px-4 fs-16 mt-1 mt-lg-0" onClick={()=>{
              navigateHandler('login')
            }}>
              Login
            </button>
          </div>
        </div>
      </nav>

      <div className="header-banner">
        <div className="container h-100 d-flex align-items-center justify-content-center">
          <div className="row text-center justify-content-center">
            <h1 className="text-uppercase text-blue fw-6 lh-17 display-5">
              Build your professional CV in just 5 <span className="text-lowercase text-primary">minutes!</span>
            </h1>
            <p className="text-grey fs-4 mt-3 mb-5">
              User-friendly and a great time saver for professionals.
            </p>
            <button className="btn btn-lg text-capitalize btn-primary btn-banner fs-4 tr" onClick={()=>{
              navigateHandler('signup')
            }}>Let's get started</button>
          </div>
        </div>
      </div>
    </header>
  );
};


const MainContent = () => {
  return (
    <main>
      <section className="steps py-8">
        <div className="container">
          <div className="row section-title text-center">
            <div className="col-12">
              <h2 className="display-6 text-blue fw-bold">Create your perfect Resume with easy steps</h2>
              <p className="text-grey fs-4 my-4 mx-auto">
                Effortlessly make a job-worthy resume and cover letter that gets you hired faster.
              </p>
            </div>
          </div>

          <div className="row steps-list">
            <div className="steps-item col-lg-6 col-xl-4 text-center text-md-start my-4 d-md-flex align-items-md-center">
              <div className="steps-item-icon text-white bg-light-blue d-flex align-items-center justify-content-center mx-auto ms-md-0 me-md-5 me-lg-4">
                <a href="template.html">
                  <i className="fa-solid fa-layer-group fa-2x"></i>
                </a>
              </div>
              <div className="steps-item-text mt-4">
                <h3 className="fs-3 fw-4 text-blue">Choose your CV template</h3>
                <p className="text-grey fs-18">
                  Pick a template and color of your choice from a variety of professional templates.
                </p>
              </div>
            </div>

            <div className="steps-item col-lg-6 col-xl-4 text-center text-md-start my-4 d-md-flex align-items-md-center">
              <div className="steps-item-icon text-white bg-light-blue d-flex align-items-center justify-content-center mx-auto ms-md-0 me-md-5 me-lg-4">
                <a href="form.html">
                  <i className="fa-solid fa-file-lines fa-2x"></i>
                </a>
              </div>
              <div className="steps-item-text mt-4">
                <h3 className="fs-3 fw-4 text-blue">Place Your Information</h3>
                <p className="text-grey fs-18">Keep track of your CV with the help of live preview.</p>
              </div>
            </div>

            <div className="steps-item col-lg-6 col-xl-4 text-center text-md-start my-4 d-md-flex align-items-md-center">
              <div className="steps-item-icon text-white bg-light-blue d-flex align-items-center justify-content-center mx-auto ms-md-0 me-md-5 me-lg-4">
                <i className="fa-solid fa-download fa-2x"></i>
              </div>
              <div className="steps-item-text mt-4">
                <h3 className="fs-3 fw-4 text-blue">Instantly download your CV</h3>
                <p className="text-grey fs-18">
                  Easily download your CV as a PDF and share it via a link.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="user-reviews" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">What Our Users Say</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>"This resume builder saved me so much time! Highly recommended."</p>
                    <footer className="blockquote-footer">John Doe</footer>
                  </blockquote>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>"A simple and easy-to-use tool for creating a professional CV."</p>
                    <footer className="blockquote-footer">Jane Smith</footer>
                  </blockquote>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>"I loved the user interface. It made the process quick and efficient."</p>
                    <footer className="blockquote-footer">Michael Brown</footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const Footer = () => {
  return (
    <footer className="pt-5">
      <div className="container my-4">
        <div className="row gy-5 gx-md-5 text-center text-md-start">
          <div className="col-md-6 col-xl-4">
            <a className="site-logo text-decoration-none fw-bold fs-2" href="#">
              <span>
                <FaFileInvoice />
              </span>
              <span className="site-logo-text">Crea8</span> CV
            </a>
            <p className="text-grey fs-18 mt-4">
              Crea8 CV is a CV builder that helps users like you to create
              stunning CVs within 4 minutes
            </p>
          </div>

          <div className="col-md-6 col-xl-2">
            <h3 className="text-blue">Crea8CV</h3>
            <ul className="list-unstyled mt-4">
              <li className="my-2">
                <a href="#" className="text-decoration-none fs-17 text-dark">
                  Homepage
                </a>
              </li>
              <li className="my-2">
                <a href="#" className="text-decoration-none fs-17 text-dark">
                  CV Builder
                </a>
              </li>
              <li className="my-2">
                <a href="#" className="text-decoration-none fs-17 text-dark">
                  CV Templates
                </a>
              </li>
              <li className="my-2">
                <a href="#" className="text-decoration-none fs-17 text-dark">
                  Login
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-6 col-xl-2">
            <h3 className="text-blue">Legal</h3>
            <ul className="list-unstyled mt-4">
              <li className="my-2">
                <a href="#" className="text-decoration-none fs-17 text-dark">
                  Privacy Policy
                </a>
              </li>
              <li className="my-2">
                <a href="#" className="text-decoration-none fs-17 text-dark">
                  Use of Terms
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-6 col-xl-4">
            <h3 className="text-blue">Help Center</h3>
            <p className="fs-17 mt-3">
              Contact:{" "}
              <a
                href="mailto:support@buildcv.com"
                className="text-decoration-none text-blue"
              >
                support@buildcv.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="container-fluid copyright-text pt-4 pb-3">
        <p className="text-center fw-3">
          &copy; 2022 Crea8Cv. All rights reserved
        </p>
      </div>
    </footer>
  );
};


const Home = () => {
  return (<>
    <Crea8CV />
    <MainContent />
    <Footer/>
  </>
  )
}

export default Home