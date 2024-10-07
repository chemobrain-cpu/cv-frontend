import React, { useState, useEffect } from "react";
import './preview2.css'; // Import the CSS file
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PhDCVTemplate = () => {
  let [isLoading, setIsLoading] = useState(false);
  let { cvEducationData: formData, isCvAvailable } = useSelector(state => state.userAuth);
  let navigate = useNavigate();
  console.log(formData)
  useEffect(() => {
    if (!isCvAvailable) {
      navigate('/template'); // Replace with your template page route
    }
  }, [isCvAvailable, navigate]);

  // Render nothing if isCvAvailable is true, JSX will not show the component body.
  if (!isCvAvailable) {
    return null; // Or a loading spinner, or nothing at all
  }

  return (
    <>
    <div className="cv-container">
      {/* Header Section */}
      <div className="cv-header">
        <h1 className="cv-title">{formData.name}'s CV</h1>
        <div className="contact-info">
          <p><i className="fas fa-phone"></i> {formData.phone}</p>
          <p><i className="fas fa-map-marker-alt"></i> {formData.location}</p>
          <p><i className="fas fa-envelope"></i> {formData.email}</p>
        </div>
      </div>

      {/* Main content divided into two columns */}
      <div className="cv-main">
        {/* Left Section */}
        <div className="cv-left">
          {/* Education Section */}
          <section className="section education">
            <h3>Education</h3>
            {formData.education.map((edu, index) => (
              <div className="education-item" key={index}>
                <p>{edu.year}</p>
                <div>
                  <h4>{edu.degree}</h4>
                  <p>{edu.institution}</p>
                  <p>{edu.details}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Additional Skills Section */}
          <section className="section skills">
            <h3>Additional Skills</h3>
            <ul>
              <li>R: {formData.skills.R}</li>
              <li>Spanish: {formData.skills.Spanish}</li>
              <li>Mandarin: {formData.skills.Mandarin}</li>
            </ul>
          </section>
        </div>

        {/* Right Section */}
        <div className="cv-right">
          {/* Publications Section */}
          <section className="section publications">
            <h3>Publications</h3>
            {formData.publications.map((pub, index) => (
              <p key={index}>
                {pub.title}. <i>{pub.journal}</i> ({pub.year}): {pub.pages}.
              </p>
            ))}
          </section>

          {/* Research Experience Section */}
          <section className="section research-experience">
            <h3>Research Experience</h3>
            {formData.researchExperience.map((exp, index) => (
              <div className="research-item" key={index}>
                <p>{exp.duration}</p>
                <div>
                  <h4>{exp.role}</h4>
                  <p>{exp.institution}</p>
                  <p>{exp.description}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Awards & Honors Section */}
          <section className="section awards">
            <h3>Awards & Honors</h3>
            {formData.awards.map((award, index) => (
              <p key={index}>
                {award.year} - {award.title}, {award.institution}
              </p>
            ))}
          </section>
        </div>
      </div>


      
    </div>
    <div className="cv-button-con">
        <button style={{marginRight:'5px'}}>download pdf</button>
        <button>Edit Cv</button>
      </div>
    </>
    
  );
};

export default PhDCVTemplate;
