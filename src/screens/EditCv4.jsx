import React, { useState, useEffect } from 'react';
import './form.css';
import { updateCv } from '../store/action/userAppStorage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";

const CVForm = () => {
    const { cv, user } = useSelector(state => state.userAuth);
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [isErrorInfo, setIsErrorInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        jobTitle: '',
        address: '',
        phone: '',
        email: '',
        aboutMe: '',
        experiences: [{ title: '', company: '', location: '', dateRange: '', responsibilities: [''] }],
        education: [{ degree: '', institution: '', dateRange: '' }],
        skills3: [''],
        languages: [{ language: '', proficiency: '' }],
        cvTemplateType: 'template4'
    });

    useEffect(() => {
        if (cv) setFormData(cv);
    }, [cv]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedExperiences = [...formData.experiences];
        updatedExperiences[index][name] = value;
        setFormData({ ...formData, experiences: updatedExperiences });
    };

    const handleResponsibilityChange = (expIndex, resIndex, value) => {
        const updatedExperiences = [...formData.experiences];
        updatedExperiences[expIndex].responsibilities[resIndex] = value;
        setFormData({ ...formData, experiences: updatedExperiences });
    };

    const handleAddExperience = () => {
        setFormData({
            ...formData,
            experiences: [...formData.experiences, { title: '', company: '', location: '', dateRange: '', responsibilities: [''] }],
        });
    };

    const handleAddResponsibility = (index) => {
        const updatedExperiences = [...formData.experiences];
        updatedExperiences[index].responsibilities.push('');
        setFormData({ ...formData, experiences: updatedExperiences });
    };

    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, education: { ...prevData.education, [name]: value } }));


        setFormData({
            ...formData,
            education: [...formData.education, { title: '', company: '', location: '', dateRange: '', responsibilities: [''] }],
        });
      
    };

    const handleSkillChange = (index, value) => {
        const updatedSkills = [...formData.skills3];
        updatedSkills[index] = value;
        setFormData({ ...formData, skills3: updatedSkills });
    };

    const handleAddSkill = () => {
        setFormData((prevData) => ({ ...prevData, skills3: [...prevData.skills3, ''] }));
    };

    const handleLanguageChange = (index, e) => {
        const { name, value } = e.target;
        const updatedLanguages = [...formData.languages];
        updatedLanguages[index][name] = value;
        setFormData({ ...formData, languages: updatedLanguages });
    };

    const handleAddLanguage = () => {
        setFormData((prevData) => ({ ...prevData, languages: [...prevData.languages, { language: '', proficiency: '' }] }));
    };

    const handleSubmitHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const response = await dispatch(updateCv(formData));
        if (!response.bool) {
            setIsLoading(false);
            setIsError(true);
            setIsErrorInfo(response.message);
        } else {
            setIsLoading(false);
            navigate(`/preview/${formData.cvTemplateType}`);
        }
    };

    const closeModal = () => {
        setIsError(false);
    };

    return (
        <>
            {isLoading && <Loader />}
            {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}
            <div className='form-container'>
                <div className="cv-form-containers">
                    <form onSubmit={handleSubmitHandler}>
                        <h2>Personal Information</h2>
                        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                        <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} required />
                        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

                        <h2>About Me</h2>
                        <textarea name="aboutMe" placeholder="Brief description" value={formData.aboutMe} onChange={handleChange} />

                        <h2>Experience</h2>
                        {formData.experiences.map((exp, index) => (
                            <div key={index}>
                                <input type="text" name="title" placeholder="Job Title" value={exp.title} onChange={(e) => handleExperienceChange(index, e)} />
                                <input type="text" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} />
                                <input type="text" name="location" placeholder="Location" value={exp.location} onChange={(e) => handleExperienceChange(index, e)} />
                                <input type="text" name="dateRange" placeholder="Date Range" value={exp.dateRange} onChange={(e) => handleExperienceChange(index, e)} />
                                {exp.responsibilities.map((res, resIndex) => (
                                    <input
                                        key={resIndex}
                                        type="text"
                                        placeholder="Responsibility"
                                        value={res}
                                        onChange={(e) => handleResponsibilityChange(index, resIndex, e.target.value)}
                                    />
                                ))}
                                <button type="button" onClick={() => handleAddResponsibility(index)}>Add Responsibility</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddExperience}>Add Experience</button>

                        <h2>Education</h2>
                        {formData?.education.map((edu, index) => (
                            <div key={index}>

                                <input type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={handleEducationChange} required />
                                <input type="text" name="institution" placeholder="Institution" value={edu.institution} onChange={handleEducationChange} required />
                                <input type="text" name="dateRange" placeholder="Date Range" value={edu.dateRange} onChange={handleEducationChange} />
                            </div>
                        ))}


                        <h2>Skills</h2>
                        {formData.skills3.map((skill, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder="Skill"
                                value={skill}
                                onChange={(e) => handleSkillChange(index, e.target.value)}
                            />
                        ))}
                        <button type="button" onClick={handleAddSkill}>Add Skill</button>

                        <h2>Languages</h2>
                        {formData.languages.map((lang, index) => (
                            <div key={index}>
                                <input type="text" name="language" placeholder="Language" value={lang.language} onChange={(e) => handleLanguageChange(index, e)} />
                                <input type="text" name="proficiency" placeholder="Proficiency" value={lang.proficiency} onChange={(e) => handleLanguageChange(index, e)} />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddLanguage}>Add Language</button>

                        <button type="submit">Update CV</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CVForm;
