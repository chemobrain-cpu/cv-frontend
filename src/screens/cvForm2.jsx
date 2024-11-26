import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeCv } from "../store/action/userAppStorage";
import Modal from "../components/Modal/Modal";
import Loader from "../components/loader";

const CvForm2 = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    education: [
      { degree: "", institution: "", year: "", details: "" },
      { degree: "", institution: "", year: "", details: "" },
    ],
    publications: [
      { title: "", journal: "", year: "", pages: "" },
      { title: "", journal: "", year: "", pages: "" },
      { title: "", journal: "", year: "", pages: "" },
    ],
    researchExperience: [
      { role: "", institution: "", duration: "", description: "" },
    ],
    awards: [
      { title: "", institution: "", year: "" },
      { title: "", institution: "", year: "" },
    ],
    skills: { R: "", Spanish: "", Mandarin: "" },
    cvTemplateType: "template2",
  });

  const { user } = useSelector((state) => state.userAuth); // Fetch user from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isErrorInfo, setIsErrorInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login page if user is not found
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitHandler = async (e) => {
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

  const closeModal = () => {
    setIsError(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}

      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <form className="space-y-6" onSubmit={handleSubmitHandler}>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
              CV Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-1">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Education
              </h3>
              {formData.education.map((edu, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => {
                      const education = [...formData.education];
                      education[index].degree = e.target.value;
                      setFormData({ ...formData, education });
                    }}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                  />
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => {
                      const education = [...formData.education];
                      education[index].institution = e.target.value;
                      setFormData({ ...formData, education });
                    }}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => {
                      const education = [...formData.education];
                      education[index].year = e.target.value;
                      setFormData({ ...formData, education });
                    }}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                  />
                  <textarea
                    placeholder="Details"
                    value={edu.details}
                    onChange={(e) => {
                      const education = [...formData.education];
                      education[index].details = e.target.value;
                      setFormData({ ...formData, education });
                    }}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-300"
                  />
                </div>
              ))}
            </div>

            {/* Similar structure for Publications, Research Experience, Awards, and Skills */}
            <button
              type="submit"
              className="w-full mt-6 py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Generate CV
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CvForm2;

