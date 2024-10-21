import React, { useState } from 'react';
import './formcv.css'; // Assuming you have form-specific styles here
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
    })

    let navigate = useNavigate()

    let dispatch = useDispatch()

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
        e.preventDefault();
        // Dispatch action or handle form submission
        dispatch(makeCv3(formData))
        navigate('/preview_3');
    };





    return (
        <div className="cv-form-container">
            <form className="cv-form" onSubmit={handleSubmit}>
                <h2>Personal Information</h2>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Profile:
                    <textarea name="profile" value={formData.profile} onChange={handleChange} required />
                </label>
                <label>
                    Phone:
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                    LinkedIn:
                    <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} />
                </label>
                <label>
                    Location:
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                </label>

                <h2>Experience</h2>
                {formData.experiences.map((experience, index) => (
                    <div key={index} className="experience-section">
                        <label>
                            Job Title:
                            <input type="text" name="title" value={experience.title} onChange={(e) => handleExperienceChange(index, e)} />
                        </label>
                        <label>
                            Company:
                            <input type="text" name="company" value={experience.company} onChange={(e) => handleExperienceChange(index, e)} />
                        </label>
                        <label>
                            Duration:
                            <input type="text" name="duration" value={experience.duration} onChange={(e) => handleExperienceChange(index, e)} />
                        </label>
                        <label>
                            Location:
                            <input type="text" name="location" value={experience.location} onChange={(e) => handleExperienceChange(index, e)} />
                        </label>
                        <label>
                            Responsibilities:
                            <textarea name="responsibility" onChange={(e) => handleExperienceChange(index, e)} />
                        </label>
                    </div>
                ))}

                <h2>Education</h2>
                <label>
                    Degree:
                    <input type="text" name="degree" value={formData.education.degree} onChange={handleEducationChange} required />
                </label>
                <label>
                    Institution:
                    <input type="text" name="institution" value={formData.education.institution} onChange={handleEducationChange} required />
                </label>
                <label>
                    Duration:
                    <input type="text" name="duration" value={formData.education.duration} onChange={handleEducationChange} required />
                </label>

                <h2>Certifications</h2>
                <label>
                    Certifications (comma-separated):
                    <input type="text" name="certifications" onChange={handleCertificationsChange} />
                </label>

                <h2>Technical Skills</h2>
                <label>
                    Skills (comma-separated):
                    <input type="text" name="skills" value={formData.skills} onChange={handleSkillsChange} />
                </label>

                <button type="submit" className="submit-button">Generate CV</button>
            </form>
        </div>
    );
};

export default CVForm;

