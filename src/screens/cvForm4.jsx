import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import Loader from '../components/loader';
import { makeCv } from '../store/action/userAppStorage';

const CVForm4 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userAuth);

    const [isError, setIsError] = useState(false);
    const [isErrorInfo, setIsErrorInfo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        jobTitle: '',
        address: '',
        phone: '',
        email: '',
        aboutMe: '',
        experiences: [{ title: '', company: '', location: '', dateRange: '', responsibilities: [''] }],
        education: [{ degree: '', institution: '', dateRange: '' }],
        skills4: [''],
        languages: [{ language: '', proficiency: '' }],
        cvTemplateType: 'template4',
    });

    useEffect(() => {
        if (!user) navigate('/login');
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

    const handleEducationChange = (index, e) => {
        const { name, value } = e.target;
        const updatedEducation = [...formData.education];
        updatedEducation[index][name] = value;
        setFormData({ ...formData, education: updatedEducation });
    };

    const handleSkillChange = (index, value) => {
        const updatedSkills = [...formData.skills4];
        updatedSkills[index] = value;
        setFormData({ ...formData, skills4: updatedSkills });
    };

    const handleAddSkill = () => {
        setFormData((prevData) => ({ ...prevData, skills4: [...prevData.skills4, ''] }));
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await dispatch(makeCv(formData));
        if (!response.bool) {
            setIsLoading(false);
            setIsError(true);
            setIsErrorInfo(response.message);
        } else {
            setIsLoading(false);
            navigate(`/preview/${formData.cvTemplateType}`);
        }
    };

    const closeModal = () => setIsError(false);

    return (
        <>
            {isLoading && <Loader />}
            {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

            <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800 text-center">Create Your CV</h2>

                        {/* Personal Information */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-700">Personal Information</h3>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="jobTitle"
                                placeholder="Job Title"
                                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="aboutMe"
                                placeholder="About Me"
                                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Experiences Section */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-700">Experience</h3>
                            {formData.experiences.map((experience, index) => (
                                <div key={index} className="experience-entry space-y-4">
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Job Title"
                                        className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                        value={experience.title}
                                        onChange={(e) => handleExperienceChange(index, e)}
                                    />
                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="Company"
                                        className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                        value={experience.company}
                                        onChange={(e) => handleExperienceChange(index, e)}
                                    />
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="Location"
                                        className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                        value={experience.location}
                                        onChange={(e) => handleExperienceChange(index, e)}
                                    />
                                    <input
                                        type="text"
                                        name="dateRange"
                                        placeholder="Date Range"
                                        className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                        value={experience.dateRange}
                                        onChange={(e) => handleExperienceChange(index, e)}
                                    />
                                    {experience.responsibilities.map((responsibility, resIndex) => (
                                        <input
                                            key={resIndex}
                                            type="text"
                                            placeholder="Responsibility"
                                            className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
                                            value={responsibility}
                                            onChange={(e) => handleResponsibilityChange(index, resIndex, e.target.value)}
                                        />
                                    ))}
                                    <button
                                        type="button"
                                        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                        onClick={() => handleAddResponsibility(index)}
                                    >
                                        Add Responsibility
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                onClick={handleAddExperience}
                            >
                                Add Experience
                            </button>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 focus:outline-none"
                            >
                                Generate CV
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CVForm4;

