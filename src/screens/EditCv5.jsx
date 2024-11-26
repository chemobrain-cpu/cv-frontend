import React, { useState, useEffect } from 'react';
import './form.css'; // Assuming you have form-specific styles here
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import { updateCv } from '../store/action/userAppStorage'; // Assuming updateCv is the Redux action

const EditCVForm = () => {
    let navigate = useNavigate();
    let [isError, setIsError] = useState(false);
    let [isErrorInfo, setIsErrorInfo] = useState('');
    let [isLoading, setIsLoading] = useState(false);

    let dispatch = useDispatch();

    const { cv } = useSelector(state => state.userAuth); // Get the existing CV data from redux

    // Initialize formData with existing CV data or empty values if not available
    const [formData, setFormData] = useState({
        name: '',
        contact: {
            address: '',
            phone: '',
            email: ''
        },
        profile: '',
        employmentHistory: [
            {
                title: '',
                location: '',
                date: '',
                responsibilities: ['']
            }
        ],
        education: [
            {
                degree: '',
                location: '',
                date: '',
                honors: ''
            }
        ],
        skillset: [
            { skill: '', level: '' }
        ],
        references: [
            { name: '', email: '', phone: '' }
        ]
    });

    useEffect(() => {
        if (cv) {
            setFormData(cv); // Pre-populate form data with existing CV if available
        }
    }, [cv]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            contact: { ...prevData.contact, [name]: value }
        }));
    };

    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedExperience = [...formData.employmentHistory];
        updatedExperience[index][name] = value;
        setFormData({ ...formData, employmentHistory: updatedExperience });
    };

    const handleAddExperience = () => {
        setFormData({
            ...formData,
            employmentHistory: [
                ...formData.employmentHistory,
                {
                    title: '',
                    location: '',
                    date: '',
                    responsibilities: ['']
                }
            ]
        });
    };

    const handleResponsibilityChange = (expIndex, resIndex, value) => {
        const updatedExperiences = [...formData.employmentHistory];
        updatedExperiences[expIndex].responsibilities[resIndex] = value;
        setFormData({ ...formData, employmentHistory: updatedExperiences });
    };

    const handleAddResponsibility = (expIndex) => {
        const updatedExperiences = [...formData.employmentHistory];
        updatedExperiences[expIndex].responsibilities.push('');
        setFormData({ ...formData, employmentHistory: updatedExperiences });
    };

    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            education: prevData.education.map((edu) =>
                edu.degree === name ? { ...edu, [name]: value } : edu
            )
        }));
    };

    const handleSkillChange = (index, e) => {
        const updatedskillset = [...formData.skillset];
        updatedskillset[index].skill = e.target.value;
        setFormData({ ...formData, skillset: updatedskillset });
    };

    const handleAddSkill = () => {
        setFormData({ ...formData, skillset: [...formData.skillset, { skill: '', level: '' }] });
    };

    const handleReferenceChange = (index, name, e) => {
        const { value } = e.target;
        const updatedReferences = [...formData.references];
        updatedReferences[index][name] = value;
        setFormData({ ...formData, references: updatedReferences });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Dispatch the form data to the Redux action for updating the CV
        let response = await dispatch(updateCv(formData)); // updateCv is assumed to be a Redux action

        if (!response.bool) {
            setIsLoading(false);
            setIsError(true);
            setIsErrorInfo(response.message);
        } else {
            setIsLoading(false);
            // Navigate to the preview page based on the selected template
            navigate(`/preview/${formData.cvTemplateType}`);
        }
    };

    let closeModal = () => {
        setIsError(false);
    };

    return (
        <>
            {isLoading && <Loader />}
            {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}
            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <h2>Personal Information</h2>
                        
                        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>

                        <input type="text" name="address" placeholder="Address" value={formData.contact.address} onChange={handleContactChange} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>

                        <input type="tel" name="phone" placeholder="Phone" value={formData.contact.phone} onChange={handleContactChange} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>

                        <input type="email" name="email" placeholder="Email" value={formData.contact.email} onChange={handleContactChange} required className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>
                        <textarea name="profile" placeholder="Profile Description" value={formData.profile} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>

                        <h2>Employment History</h2>
                        {formData.employmentHistory.map((exp, index) => (
                            <div key={index}>
                                <input type="text" name="title" placeholder="Job Title" value={exp.title} onChange={(e) => handleExperienceChange(index, e)} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>
                                <input type="text" name="location" placeholder="Location" value={exp.location} onChange={(e) => handleExperienceChange(index, e)} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>
                                <input type="text" name="date" placeholder="Date Range" value={exp.date} onChange={(e) => handleExperienceChange(index, e)} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>
                                {exp.responsibilities.map((res, resIndex) => (
                                    <input key={resIndex} type="text" placeholder="Responsibility" value={res} onChange={(e) => handleResponsibilityChange(index, resIndex, e.target.value)} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>
                                ))}
                                <button type="button" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={() => handleAddResponsibility(index)}>Add Responsibility</button>
                            </div>
                        ))}
                        <button type="button" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleAddExperience}>Add Experience</button>

                        <h2>Education</h2>
                        {formData.education.map((edu, index) => (
                            <div key={index}>
                                <input type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={handleEducationChange} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>

                                <input type="text" name="institution" placeholder="Institution" value={edu.location} onChange={handleEducationChange} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>

                                <input type="text" name="dateRange" placeholder="Date Range" value={edu.date} onChange={handleEducationChange} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>

                                <input type="text" name="honors" placeholder="Honors" value={edu.honors} onChange={handleEducationChange} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>
                            </div>
                        ))}

                        <h2>skillset</h2>
                        {formData.skillset.map((skill, index) => (
                            <div key={index}>
                                <input type="text" value={skill.skill} onChange={(e) => handleSkillChange(index, e)} placeholder="Skill" className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddSkill} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Add Skill</button>

                        <h2>References</h2>
                        {formData.references.map((ref, index) => (
                            <div key={index}>
                                <input type="text" value={ref.name} onChange={(e) => handleReferenceChange(index, 'name', e)} placeholder="Name" className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>

                                <input type="email" value={ref.email} onChange={(e) => handleReferenceChange(index, 'email', e)} placeholder="Email" className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>

                                <input type="tel" value={ref.phone} onChange={(e) => handleReferenceChange(index, 'phone', e)} placeholder="Phone" className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>
                            </div>
                        ))}

                        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Update CV</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditCVForm;
