import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import FormInput from '../components/Input';
import SubmitBtn from '../components/Submit';
import { login } from '../store/action/userAppStorage';

function LoginPage() {
    let [userEmail, setUserEmail] = useState("")
    let [userEmailError, setUserEmailError] = useState("")
    let [userPassword, setUserPassword] = useState("")
    let [userPasswordError, setUserPasswordError] = useState("")
    let [preloader, setPreloader] = useState(true)
    let [isError, setIsError] = useState(false)
    let [isErrorInfo, setIsErrorInfo] = useState('')
    let [isLoading, setIsLoading] = useState(false)
    let [isUrl, setIsUrl] = useState(false)
    //initialising redux
    let dispatch = useDispatch()
    let { color } = useSelector(state => state.userAuth)
    //initialize router
    let navigate = useNavigate()

    const toLogin = () => {
        navigate('/Login')
    }

    const toForget = () => {
        navigate('/forgetpassword')
    }

    let isFormValid = userEmail && !userEmailError && userPassword

    useEffect(() => {
        setTimeout(() => {
            setPreloader(false)
        }, 5000)
    }, [])

    let setFormDetails = useCallback(e => {
        setIsError(false)
        if (e.formName === "userEmail") {
            let formValue = e.value
            setUserEmail(formValue)
            setUserEmailError(e.error)
        } else if (e.formName === "userPassword") {
            let formValue = e.value
            setUserPassword(formValue)
            setUserPasswordError(e.error)
        }
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!isFormValid) {
            return
        }
        setIsLoading(true)

        let response = await dispatch(login({
            email: userEmail,
            password: userPassword
        }))

        if (!response.bool) {
            setIsLoading(false)
            setIsError(true)
            setIsErrorInfo(response.message)
            setIsUrl(response.url)
        }
        setIsLoading(false)
        setIsError(true)
        setIsErrorInfo(response.message)
        setIsUrl(response.url)
    }

    let closeModal = () => {
        setIsError(false)
        if (isUrl) {
            navigate(isUrl)
        }
    }

    let navigateBackward = () => {
        navigate(-1)
    }

    return (
        <div className="flex items-center justify-center h-screen w-full">
            {isLoading && <Loader />}
            {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}
            
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <form onSubmit={submitHandler} className="space-y-6">

                    <div className="flex items-center mb-4">
                        <span className="material-icons mr-2 cursor-pointer" onClick={navigateBackward}>arrow_back</span>
                        <h2 className="text-2xl font-bold">Login</h2>
                    </div>

                    <div className="mb-4">
                        <FormInput
                            icon="edit"
                            type="email"
                            formName="userEmail"
                            placeholder="Email"
                            setFormDetails={setFormDetails}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <FormInput
                            icon="edit"
                            type="password"
                            formName="userPassword"
                            placeholder="Password"
                            setFormDetails={setFormDetails}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="d-grid">
                        <SubmitBtn className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition" text="Login" />
                    </div>

                    <p className="mt-3 text-center text-sm text-gray-600">
                        Don't have an account? 
                        <span className="text-indigo-500 cursor-pointer" onClick={toLogin}>Signup</span><br />
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
