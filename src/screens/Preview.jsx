import React from "react";
import './preview.css';  // Import the CSS file

const CVTemplate = () => {
  return (
    <div className="cv-container">
      {/* Left Column */}
      <div className="left-column">
        <div className="profile-picture">
          <img src="profile.jpg" alt="Profile Picture" />
        </div>
        <h1 className="name">Sujan Kaystha</h1>
        <h2 className="job-title">Interface Designer</h2>

        <section className="section summary-section">
          <h3>SUMMARY</h3>
          <ul>
            <li><i className="fas fa-phone"></i> +977 1 9856 444 888</li>
            <li><i className="fas fa-envelope"></i> youremail@domain.com</li>
            <li><i className="fas fa-map-marker-alt"></i> Dillibazar 13, Kathmandu</li>
            <li><i className="fas fa-globe"></i> Facebook.com/archana.56</li>
          </ul>
        </section>

        <section className="section awards-section">
          <h3>AWARDS</h3>
          <p><strong>Best Travel App</strong><br />
            Vue Intacts / 2020 / Kathmandu</p>
          <p><strong>UI Design 2018</strong><br />
            Sunsex Global / 2018 / Nairobi</p>
        </section>

        <section className="section achievements-section">
          <h3>ACHIEVEMENTS</h3>
          <p>Designed Nepal Wallet App<br />
            Partnered with UX/UI designers</p>
          <p>User Research Web Presence<br />
            Completed study to improve XYZ's.</p>
        </section>
      </div>

      {/* Right Column */}
      <div className="right-column">
        <section className="section summary">
          <h3>SUMMARY</h3>
          <p>Consistently ranked in the top ten country managers... and more.</p>
        </section>

        <section className="section education">
          <h3>EDUCATION</h3>
          <div className="education-item">
            <h4>Master in Interface Design</h4>
            <p>Pulchok Engineering College / Mar 2018 - Apr 2021</p>
            <p>Managed a portfolio of customers with a value of $35 million.</p>
          </div>
          <div className="education-item">
            <h4>Bachelor in Computer Application</h4>
            <p>CSE College / Mar 2015 - Apr 2018</p>
            <p>Conducted research to identify opportunities for improvements.</p>
          </div>
        </section>

        <section className="section work-experience">
          <h3>WORK EXPERIENCE</h3>
          <div className="work-item">
            <h4>Product Manager</h4>
            <p>Brain Workshop / Mar 2018 - Apr 2021</p>
            <ul>
              <li>Improvement of core Web site functionality.</li>
              <li>Lowered XYZ's page abandonment rate by 35%.</li>
            </ul>
          </div>
          <div className="work-item">
            <h4>UI Designer</h4>
            <p>Karkhana Inc / Mar 2015 - Apr 2018</p>
            <ul>
              <li>Replaced vague objectives with clear calls to action.</li>
              <li>Increased XYZ's sales pipeline by 15%.</li>
            </ul>
          </div>
          <div className="work-item">
            <h4>Graphics Designer</h4>
            <p>Thompson Advertising / Mar 2014 - Apr 2015</p>
            <ul>
              <li>Improvement of core Web site functionality.</li>
              <li>Helped with card sorting and affinity diagramming.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CVTemplate;

