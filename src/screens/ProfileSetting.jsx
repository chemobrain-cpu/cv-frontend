import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Navbar, Button, Form } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/action/userAppStorage';
import { updateUser } from '../store/action/userAppStorage';



const ProfileSettings = () => {
    const [activeTab, setActiveTab] = useState('profileSettings');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Loader state
    const [isError, setIsError] = useState(false); // Error state
    const [isErrorInfo, setIsErrorInfo] = useState('');
    const [isUser, setIsUser] = useState(null);
    let navigate = useNavigate();
    let { user } = useSelector(state => state.userAuth);
    let dispatch = useDispatch()


    // Protect the dashboard - if no user is present, redirect to login
    useEffect(() => {
        if (!user) {
            navigate('/login'); // Redirect to login page if user is not found
        } else {
            setIsUser(user);
            setIsLoading(false)
        }
    }, [user, navigate]);


    const handleLogout = async () => {
        await dispatch(logout())
        navigate('/login')
    };




    const handleChange = (e) => {
        const { name, value } = e.target;
        setIsUser({ ...isUser, [name]: value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        let response = await dispatch(updateUser(isUser))

        if (!response.bool) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(response.message)
        }
        setIsLoading(false)
        setIsError(true)
        setIsErrorInfo(response.message.message)
        setIsUser(response.message.user)
    }


    const dashboardUrl = "https://crea8cv-v3.vercel.app"
    const renderContent = () => {
        return (
            <>
                {isUser && (
                    <main className="bg-white p-8 shadow-lg rounded-lg max-w-3xl mx-auto mt-10 animate-fadeIn">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            Profile Settings
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Profile Information */}
                            <div>
                                <h3 className="text-xl font-medium text-gray-700 mb-4">
                                    Profile Information
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="formFullName" className="block text-gray-600 font-medium">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="formFullName"
                                            name="fullName"
                                            value={isUser.fullName}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="formEmail" className="block text-gray-600 font-medium">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="formEmail"
                                            name="email"
                                            value={isUser.email}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="formPhone" className="block text-gray-600 font-medium">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        id="formPhone"
                                        name="phone"
                                        value={isUser.phone}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="formUsername" className="block text-gray-600 font-medium">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="formUsername"
                                        name="username"
                                        value={isUser.username}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Password Section */}
                            <div>
                                <h3 className="text-xl font-medium text-gray-700 mb-4">
                                    Change Password
                                </h3>
                                <label htmlFor="formPassword" className="block text-gray-600 font-medium">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="formPassword"
                                    name="password"
                                    value={isUser.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter new password"
                                />
                            </div>

                            {/* Payment Information Section */}
                            <div>
                                <h3 className="text-xl font-medium text-gray-700 mb-4">
                                    Payment Information
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="formCardNumber" className="block text-gray-600 font-medium">
                                            Card Number
                                        </label>
                                        <input
                                            type="text"
                                            id="formCardNumber"
                                            name="cardNumber"
                                            value={isUser.cardNumber}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter your card number"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="formExpiryDate" className="block text-gray-600 font-medium">
                                            Expiry Date
                                        </label>
                                        <input
                                            type="text"
                                            id="formExpiryDate"
                                            name="expiryDate"
                                            value={isUser.expiryDate}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="MM/YY"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="formCVV" className="block text-gray-600 font-medium">
                                            CVV
                                        </label>
                                        <input
                                            type="text"
                                            id="formCVV"
                                            name="cvv"
                                            value={isUser.cvv}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="CVV"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="formBillingAddress" className="block text-gray-600 font-medium">
                                            Billing Address
                                        </label>
                                        <input
                                            type="text"
                                            id="formBillingAddress"
                                            name="billingAddress"
                                            value={isUser.billingAddress}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter your billing address"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 rounded-md font-medium shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                            >
                                Save Changes
                            </button>
                        </form>
                    </main>
                )}
            </>
        );
    };


    return (
        <>
            {isLoading && <Loader />} {/* Loader Component */}
            {isError && <Modal content={isErrorInfo} closeModal={() => setIsError(false)} />} {/* Modal for Error */}
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <div className={`w-64 h-full bg-blue-800 text-white ${sidebarOpen ? 'block' : 'hidden'} sm:block`}>
                    <div className="flex justify-between items-center p-6 border-b border-blue-900">
                        <h4 className="text-xl font-semibold text-center">Dashboard</h4>
                        <button
                            className="text-white sm:hidden"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            ☰
                        </button>
                    </div>
                    <nav className="flex flex-col px-4 py-6">
                        <button
                            onClick={() => { window.location.href = dashboardUrl }}
                            className="text-white py-3 px-4 rounded-md hover:bg-blue-700 mb-2"
                        >
                            Create with AI
                        </button>
                        <button
                            onClick={() => { setActiveTab('myCVs'); navigate('/cvs'); }}
                            className={`text-white py-3 px-4 rounded-md ${activeTab === 'myCVs' ? 'bg-blue-700' : 'hover:bg-blue-700'} mb-2`}
                        >
                            My CVs
                        </button>
                        <button
                            onClick={() => { setActiveTab('templates'); navigate('/template'); }}
                            className={`text-white py-3 px-4 rounded-md ${activeTab === 'templates' ? 'bg-blue-700' : 'hover:bg-blue-700'} mb-2`}
                        >
                            Templates
                        </button>
                        <button
                            onClick={() => { setActiveTab('profileSettings'); navigate('/profilesetting'); }}
                            className={`text-white py-3 px-4 rounded-md ${activeTab === 'profileSettings' ? 'bg-blue-700' : 'hover:bg-blue-700'} mb-2`}
                        >
                            Profile Settings
                        </button>
                        <button
                            onClick={() => { setActiveTab('pricing'); navigate('/pricing'); }}
                            className={`text-white py-3 px-4 rounded-md ${activeTab === 'pricing' ? 'bg-blue-700' : 'hover:bg-blue-700'} mb-2`}
                        >
                            Pricing Plans
                        </button>
                        <button
                            onClick={handleLogout}
                            className="text-white py-3 px-4 rounded-md hover:bg-blue-700 mb-2"
                        >
                            Logout
                        </button>
                    </nav>
                </div>

                <div className="flex-1 p-3 pt-0" >
                    <div className="flex justify-between items-center mb-6 bg-white shadow-lg p-4">
                        <div className="flex items-center space-x-6" style={{ width: '100%', padding: '15px' }}>
                            <FaUserCircle size={35} className="text-blue-600" />
                            <button
                                onClick={handleLogout}
                                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
                            >
                                Logout
                            </button>
                        </div>
                        <button
                            className="sm:hidden text-white bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-700"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            ☰
                        </button>
                    </div>

                    <div className="content">
                        {renderContent()}
                    </div>
                </div>
            </div>

        </>

    );
};

export default ProfileSettings;







