import React,{useState,useEffect} from "react";
import './preview.css';  // Import the CSS file
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const CVTemplate = () => { 
  let [isLoading,setIsLoading] = useState(false)
let { cvJobData:formData,isCvAvailable} = useSelector(state => state.userAuth)
let navigate = useNavigate()


useEffect(() => {
  if (!isCvAvailable) {
    navigate('/template'); // Replace with your template page route
  }
}, [isCvAvailable, navigate]);

// Render nothing if isCvAvailable is true, JSX will not show the component body.
if (!isCvAvailable) {
  return null; // Or a loading spinner, or nothing at all
}


  return (<>
  <div className="cv-container">
      {/* Left Column */}
      <div className="left-column">
        <div className="profile-picture">
          <img src="profile.jpg" alt="Profile Picture" />
        </div>
        <h1 className="name">{formData.name}</h1>
        <h2 className="job-title">{formData.jobTitle}</h2>

        <section className="section summary-section">
          <h3>SUMMARY</h3>
          <ul>
            <li><i className="fas fa-phone"></i> {formData.phone}</li>
            <li><i className="fas fa-envelope"></i> {formData.email}</li>
            <li><i className="fas fa-map-marker-alt"></i> {formData.location}</li>
            <li><i className="fas fa-globe"></i> {formData.socialMedia}</li>
          </ul>
        </section>

        <section className="section awards-section">
          <h3>AWARDS</h3>
          {formData.awards.map((award, index) => (
            <p key={index}>
              <strong>{award.title}</strong><br />
              {award.organization} / {award.year} / {award.location}
            </p>
          ))}
        </section>

        <section className="section achievements-section">
          <h3>ACHIEVEMENTS</h3>
          {formData.achievements.map((achievement, index) => (
            <p key={index}>{achievement.description}</p>
          ))}
        </section>
      </div>

      {/* Right Column */}
      <div className="right-column">
        <section className="section summary">
          <h3>SUMMARY</h3>
          <p>{formData.summary}</p>
        </section>

        <section className="section education">
          <h3>EDUCATION</h3>
          {formData.education.map((edu, index) => (
            <div className="education-item" key={index}>
              <h4>{edu.degree}</h4>
              <p>{edu.institution} / {edu.year}</p>
              <p>{edu.details}</p>
            </div>
          ))}
        </section>

        <section className="section work-experience">
          <h3>WORK EXPERIENCE</h3>
          {formData.workExperience.map((work, index) => (
            <div className="work-item" key={index}>
              <h4>{work.title}</h4>
              <p>{work.company} / {work.duration}</p>
              <ul>
                {work.responsibilities.map((responsibility, i) => (
                  <li key={i}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </div>
    <div className="cv-button-con">
      <button>download pdf</button>
      <button>Edit Cv</button>
    </div>
    </>
    
  );
};

export default CVTemplate;






















































