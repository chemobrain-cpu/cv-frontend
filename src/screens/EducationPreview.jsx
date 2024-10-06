import React, { useState, useEffect } from "react";
import './preview.css'; // Import the CSS file
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
        {/* Header */}
        <div className="cv-header">
          <h1 className="cv-title">PhD CV EXAMPLE</h1>
          <div className="contact-info">
            <p><i className="fas fa-phone"></i> {formData.phone}</p>
            <p><i className="fas fa-map-marker-alt"></i> {formData.address}</p>
            <p><i className="fas fa-envelope"></i> {formData.email}</p>
          </div>
        </div>

        {/* Education Section */}
        <section className="section education">
          <h3>Education</h3>
          {formData.education.map((edu, index) => (
            <div className="education-item" key={index}>
              <p>{edu.startDate} - {edu.endDate}</p>
              <div>
                <h4>{edu.institution}</h4>
                <p>{edu.degree}</p>
                <p>Thesis: {edu.thesis}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Publications Section */}
        <section className="section publications">
          <h3>Publications</h3>
          {formData.publications.map((pub, index) => (
            <p key={index}>
              {pub.authors}. "{pub.title}." <i>{pub.journal}</i> {pub.year}: {pub.pages}.
            </p>
          ))}
        </section>

        {/* Research Experience Section */}
        <section className="section research-experience">
          <h3>Research Experience</h3>
          {formData.researchExperience.map((exp, index) => (
            <div className="research-item" key={index}>
              <p>{exp.startDate} - {exp.endDate}</p>
              <div>
                <h4>{exp.title}</h4>
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
              {award.date} - {award.title} - {award.institution}
            </p>
          ))}
        </section>

        {/* Additional Skills Section */}
        <section className="section skills">
          <h3>Additional Skills</h3>
          <ul>
            {Object.entries(formData.skills).map(([skill, level], index) => (
              <li key={index}>{`${skill}: ${level}`}</li>
            ))}
          </ul>

        </section>
      </div>
    </>
  );
};

export default PhDCVTemplate;
