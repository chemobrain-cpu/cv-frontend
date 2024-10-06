import React from 'react';
import { useNavigate } from 'react-router-dom';



const Template = () => {

  let navigate = useNavigate()

  const navigateHandler = (id)=>{
    if(id === 'template_1'){
      navigate('/form_job')
    }else{
      navigate('/form_education')

    }
  }
  

  return (
    <>
      <header className="headere">
        <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
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
  
              <button
                type="button"
                className="btn btn-login btn-primary ms-lg-4 px-4 fs-16 mt-1 mt-lg-0"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>
  
      <main>
        <section className="steps py-8">
          <div className="container">
            <div className="row section-title text-center">
              <div className="col-12">
                <h2 className="display-6 text-blue fw-bold">
                  Create your perfect Resume with easy steps
                </h2>
                <p className="text-grey fs-4 my-4 mx-auto">
                  Effortlessly make a job-worthy resume and cover letter that gets you hired faster.
                </p>
              </div>
            </div>
          </div>
        </section>
  
        <section className="templates py-8 bg-secondary">
          <div className="container">
            <div className="row section-title text-center mb-5">
              <div className="col-12">
                <h2 className="display-6 text-blue fw-bold">
                  Here are the Best Templates for you
                </h2>
                <p className="text-grey fs-4 my-4 mx-auto">
                  A great job application leads to a good interview. An amazing resume is what makes it
                  all possible.
                </p>
              </div>
            </div>
  
            <div className="row templates-list gy-5 gx-lg-5">
              <div className="templates-item position-relative col-lg-6">
                <div className="template-item-img mx-auto me-lg-0 position-relative">
                  <img src="Basic.jpg" alt="" className="img-fluid" />
                  <a
                    onClick={()=>navigateHandler('template_1')}
                    className="btn btn-lg btn-primary position-absolute choose-template-btn"
                  >
                    Select Template
                  </a>
                </div>
              </div>
  
              <div className="templates-item position-relative col-lg-6">
                <div className="template-item-img mx-auto ms-lg-0 position-relative">
                  <img src="phd-cv-example.webp" alt="" className="img-fluid" />
                  <a
                    
                    className="btn btn-lg btn-primary position-absolute choose-template-btn"
                    onClick={()=>navigateHandler('template_2')}
                  >
                    Select Template
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
  
       
    </>
  );
}

export default Template