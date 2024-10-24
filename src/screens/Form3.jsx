import React, { useState } from 'react';
import './form.css'; // Assuming you have form-specific styles here
import { makeCv3 } from '../store/action/userAppStorage';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CVForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        profile: '',
        phone: '',
        email: '',
        linkedin: '',
        location: '',
        experiences: [
            { title: '', company: '', duration: '', location: '', responsibilities: [''] },
        ],
        education: { degree: '', institution: '', duration: '' },
        certifications: [],
        skills: '',
    });

    let navigate = useNavigate();
    let dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedExperiences = [...formData.experiences];
        if (name === 'responsibility') {
            updatedExperiences[index].responsibilities.push(value);
        } else {
            updatedExperiences[index][name] = value;
        }
        setFormData({ ...formData, experiences: updatedExperiences });
    };

    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, education: { ...prevData.education, [name]: value } }));
    };

    const handleCertificationsChange = (e) => {
        const value = e.target.value;
        setFormData((prevData) => ({ ...prevData, certifications: value.split(',').map(cert => cert.trim()) }));
    };

    const handleSkillsChange = (e) => {
        setFormData((prevData) => ({ ...prevData, skills: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(makeCv3(formData));
        navigate('/preview_3');
    };

    return (
        <div className='form-container'>
            <div className="cv-form-containers">
                <form className="cv-form" onSubmit={handleSubmit}>
                <h2>CV Information</h2>
                    <div>
                        <label>
                            Name: </label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                       
                    </div>
                    <div>
                        <label>
                            Profile: </label>
                            <textarea name="profile" value={formData.profile} onChange={handleChange} required />
                        
                    </div>
                    <div>
                        <label>
                            Phone: </label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                        
                    </div>
                    <div>
                        <label>
                            Email: </label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                       
                    </div>
                    <div>
                        <label>
                            LinkedIn: </label>
                            <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} />
                       
                    </div>
                    <div>
                        <label>
                            Location: </label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                        
                    </div>

                    <h2>Experience</h2>
                    {formData.experiences.map((experience, index) => (
                        <div key={index} className="experience-section">
                            <div>
                                <label>
                                    Job Title: </label>
                                    <input type="text" name="title" value={experience.title} onChange={(e) => handleExperienceChange(index, e)} />
                               
                            </div>
                            <div>
                                <label>
                                    Company: </label>
                                    <input type="text" name="company" value={experience.company} onChange={(e) => handleExperienceChange(index, e)} />
                               
                            </div>
                            <div>
                                <label>
                                    Duration:</label>
                                    <input type="text" name="duration" value={experience.duration} onChange={(e) => handleExperienceChange(index, e)} /> 
                            </div>
                            <div>
                                <label>
                                    Location:</label>
                                    <input type="text" name="location" value={experience.location} onChange={(e) => handleExperienceChange(index, e)} />
                                
                            </div>
                            <div>
                                <label>
                                    Responsibilities:</label>
                                    <textarea name="responsibility" onChange={(e) => handleExperienceChange(index, e)} />
                                
                            </div>
                        </div>
                    ))}

                    <h2>Education</h2>
                    <div>
                        <label>
                            Degree:</label>
                            <input type="text" name="degree" value={formData.education.degree} onChange={handleEducationChange} required />
                        
                    </div>
                    <div>
                        <label>
                            Institution:</label>
                            <input type="text" name="institution" value={formData.education.institution} onChange={handleEducationChange} required />
                  
                    </div>
                    <div>
                        <label>
                            Duration:</label>
                            <input type="text" name="duration" value={formData.education.duration} onChange={handleEducationChange} required />
                        
                    </div>

                    <h2>Certifications</h2>
                    <div>
                        <label>
                            Certifications (comma-separated):</label>
                            <input type="text" name="certifications" onChange={handleCertificationsChange} />
                        
                    </div>

                    <h2>Technical Skills</h2>
                    <div>
                        <label>
                            Skills (comma-separated):</label>
                            <input type="text" name="skills" value={formData.skills} onChange={handleSkillsChange} />
                        
                    </div>

                    <button type="submit" className="submit-button">Generate CV</button>
                </form>
            </div>
        </div>
    );
};

export default CVForm;


