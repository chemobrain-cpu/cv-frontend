import React, { useState, useEffect } from 'react';
import { makeCv } from '../store/action/userAppStorage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import Loader from '../components/loader';

const CVForm3 = () => {
    const [formData, setFormData] = useState({
        name: '',
        profile: '',
        phone: '',
        email: '',
        linkedin: '',
        location: '',
        experiences: [{ title: '', company: '', duration: '', location: '', responsibilities: [''] }],
        education: { degree: '', institution: '', duration: '' },
        certifications: [],
        skills3: '',
        cvTemplateType: 'template3',
    });
    const [isError, setIsError] = useState(false);
    const [isErrorInfo, setIsErrorInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.userAuth);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

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

    const handleAddResponsibility = (index) => {
        const updatedExperiences = [...formData.experiences];
        updatedExperiences[index].responsibilities.push('');
        setFormData({ ...formData, experiences: updatedExperiences });
    };

    const handleResponsibilityChange = (expIndex, resIndex, value) => {
        const updatedExperiences = [...formData.experiences];
        updatedExperiences[expIndex].responsibilities[resIndex] = value;
        setFormData({ ...formData, experiences: updatedExperiences });
    };

    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            education: { ...prevData.education, [name]: value },
        }));
    };

    const handleCertificationsChange = (e) => {
        const value = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            certifications: value.split(',').map((cert) => cert.trim()),
        }));
    };

    const handleSkillsChange = (e) => {
        setFormData((prevData) => ({ ...prevData, skills3: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await dispatch(makeCv(formData));
        if (!response.bool) {
            setIsError(true);
            setIsErrorInfo(response.message);
        } else {
            navigate(`/preview/${formData.cvTemplateType}`);
        }
        setIsLoading(false);
    };

    const closeModal = () => setIsError(false);

    return (
        <>
            {isLoading && <Loader />}
            {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}
            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h2 className="section-title">CV Information</h2>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"  />
                        </div>
                        <div className="form-group">
                            <label>Profile:</label>
                            <textarea name="profile" value={formData.profile} onChange={handleChange} required className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" />
                        </div>
                        <div className="form-group">
                            <label>LinkedIn:</label>
                            <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} required className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>
                        </div>
                        <div className="form-group">
                            <label>Location:</label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" required />
                        </div>

                        <h2 className="section-title">Experience</h2>
                        {formData.experiences.map((experience, index) => (
                            <div key={index} className="experience-section">
                                <div className="form-group">
                                    <label>Job Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={experience.title}
                                        onChange={(e) => handleExperienceChange(index, e)}
                                    required  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Company:</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={experience.company}
                                        onChange={(e) => handleExperienceChange(index, e)}
                                    required  className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>
                                </div>
                                <div className="form-group">
                                    <label>Duration:</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={experience.duration}
                                        onChange={(e) => handleExperienceChange(index, e)}
                                    required className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>
                                </div>
                                <div className="form-group">
                                    <label>Location:</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={experience.location}
                                        onChange={(e) => handleExperienceChange(index, e)}

                                        required
                                        className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Responsibilities:</label>
                                    {experience.responsibilities.map((res, resIndex) => (
                                        <div key={resIndex} className="form-group">
                                            <textarea
                                                value={res}
                                                placeholder="Responsibility"
                                                onChange={(e) => handleResponsibilityChange(index, resIndex, e.target.value)}

                                                required

                                                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                            />
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => handleAddResponsibility(index)} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" >
                                        Add Responsibility
                                    </button>
                                </div>
                            </div>
                        ))}

                        <h2 className="section-title">Education</h2>
                        <div className="form-group">
                            <label>Degree:</label>
                            <input
                                type="text"
                                name="degree"
                                value={formData.education.degree}
                                onChange={handleEducationChange}
                                required className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                            />
                        </div>
                        <div className="form-group">
                            <label>Institution:</label>
                            <input
                                type="text"
                                name="institution"
                                value={formData.education.institution}
                                onChange={handleEducationChange}
                                required className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                            />
                        </div>
                        <div className="form-group">
                            <label>Duration:</label>
                            <input
                                type="text"
                                name="duration"
                                value={formData.education.duration}
                                onChange={handleEducationChange}
                                required className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <h2 className="section-title">Certifications</h2>
                        <div className="form-group">
                            <label>Certifications (comma-separated):</label>
                            <input type="text" name="certifications" onChange={handleCertificationsChange} required className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"/>
                        </div>

                        <h2 className="section-title">Technical Skills</h2>
                        <div className="form-group">
                            <label>Skills (comma-separated):</label>
                            <input type="text" name="skills" value={formData.skills3} onChange={handleSkillsChange} className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300" required/>
                        </div>

                        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                            Generate CV
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CVForm3;




