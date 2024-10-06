import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from "../components/loader";
import { useDispatch } from 'react-redux';
import { makeCv } from '../store/action/userAppStorage';


const Form = () => {
  let [isLoading, setIsLoading] = useState(false)
  let [isData, setIsData] = useState({})
  let navigate = useNavigate()
  let dispatch = useDispatch()

  let handleChange = (e) => {
    let val = e.target.value
    setIsData(prev => {
      prev[`${e.target.id}`] = val
      let newData = { ...prev }
      return newData
    })
  }

  let submitHandler = (e)=>{
    e.preventDefault()
    setIsLoading(true)

    setTimeout(()=>{
      dispatch(makeCv(isData))
      navigate('/preview')
    },5000)
    

  }




  return (
    <>
      {isLoading && <Loader />}
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
        <section id="cv-generator" className="py-5">
          <div className="container cv-generator">
            <h2 className="text-center mb-4">Generate Your CV</h2>
            <form id="cvForm" onSubmit={submitHandler}>
              <div className="form-group row">
                <label htmlFor="fullName" className="col-sm-3 col-form-label form-label">
                  Full Name
                </label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="fullName" required onChange={handleChange} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="email" className="col-sm-3 col-form-label form-label">
                  Email Address
                </label>
                <div className="col-sm-9">
                  <input type="email" className="form-control" id="email" required onChange={handleChange} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="phone" className="col-sm-3 col-form-label form-label">
                  Phone Number
                </label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="phone" required onChange={handleChange} />
                </div>
              </div>


              <div className="form-group row">
                <label htmlFor="address" className="col-sm-3 col-form-label form-label">
                  Address
                </label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="address" required onChange={handleChange} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="summary" className="col-sm-3 col-form-label form-label">
                  Professional Summary
                </label>
                <div className="col-sm-9">
                  <textarea className="form-control" id="summary" rows="3" required onChange={handleChange}></textarea>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="skills" className="col-sm-3 col-form-label form-label">
                  Skills
                </label>
                <div className="col-sm-9">
                  <textarea className="form-control" id="skills" rows="3" required onChange={handleChange}></textarea>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="certifications" className="col-sm-3 col-form-label form-label">
                  Certifications
                </label>
                <div className="col-sm-9">
                  <textarea className="form-control" id="certifications" rows="3" onChange={handleChange}></textarea>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="experience" className="col-sm-3 col-form-label form-label">
                  Work Experience
                </label>
                <div className="col-sm-9">
                  <textarea className="form-control" id="experience" rows="4" required onChange={handleChange}></textarea>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="education" className="col-sm-3 col-form-label form-label">
                  Education
                </label>
                <div className="col-sm-9">
                  <textarea className="form-control" id="education" rows="4" required onChange={handleChange}></textarea>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="linkedin" className="col-sm-3 col-form-label form-label">
                  LinkedIn Profile
                </label>
                <div className="col-sm-9">
                  <input type="url" className="form-control" id="linkedin" onChange={handleChange} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="portfolio" className="col-sm-3 col-form-label form-label">
                  Portfolio URL
                </label>
                <div className="col-sm-9">
                  <input type="url" className="form-control" id="portfolio" onChange={handleChange} />
                </div>
              </div>



              {/* Add the other fields similarly */}
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Generate CV
                </button>
              </div>
            </form>
          </div>
        </section>

      </main>


    </>
  );

}

export default Form