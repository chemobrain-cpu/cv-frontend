import React, { useRef, useState, useEffect, useCallback } from 'react';
import html2pdf from 'html2pdf.js';
import { Document, Packer, Paragraph } from 'docx';
import { useNavigate} from 'react-router-dom';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCv, fetchSpecificCv } from "../store/action/userAppStorage";
import './CVPreview.css';
import { useParams } from 'react-router-dom/dist';
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";



const CVPreview = () => {
    const cvRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isErrorInfo, setIsErrorInfo] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { cv: formData, isCvAvailable, } = useSelector((state) => state.userAuth);
    const [dummyData, setDummyData] = useState({})
    //fetch data from backend server just incase a user outside which to acess the application
    const { id, cv: cvId } = useParams();

    const handleFetchHandler = useCallback(
        async (cvId) => {
            setIsLoading(true);

            // Dispatch action or handle form submission
            let response = await dispatch(fetchSpecificCv(cvId));
            if (!response.bool) {
                setIsLoading(false);
                setIsError(true);
                setIsErrorInfo(response.message);
                return;
            }
            setDummyData(response.message);
            setIsLoading(false);
        },
        [dispatch] // Dependencies to avoid unnecessary re-creation
    );

    // Use the function in an effect or other logic to ensure it runs only once
    useEffect(() => {
        if (!cvId) {
            setDummyData(formData)

            if (!isCvAvailable) {
                return navigate('/template');
            }
            setIsLoading(false)
            return;
        }
        if (!isCvAvailable) {
            handleFetchHandler(cvId);
        }
        // If both `isCvAvailable` and `cvId` are true, do nothing (implicitly handled).
    }, [isCvAvailable, cvId, handleFetchHandler]);



     const shareUrl = window.location.origin + `/preview/${id}` + `/${cvId?cvId:formData._id}`;

    const downloadPDF = () => {
        const element = cvRef.current;
        if (element) {
            const options = {
                margin: 1,
                filename: 'CV.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter' }
            };
            html2pdf().from(element).set(options).save();
        }
    };

    const downloadDOCX = async () => {
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph(dummyData.name || ''),
                        new Paragraph(dummyData.contact?.address || ''),
                        new Paragraph(dummyData.contact?.phone || ''),
                        new Paragraph(dummyData.contact?.email || ''),
                        new Paragraph(dummyData.profile || '')
                    ]
                }
            ]
        });

        const blob = await Packer.toBlob(doc);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'CV.docx';
        a.click();
    };

    const editHandler = () => {
        navigate(`/editcv/${dummyData.cvTemplateType}`);
    };

    const deleteHandler = async () => {
        setIsLoading(true);
        const response = await dispatch(deleteCv(dummyData));
        setIsLoading(false);
        if (!response.bool) {
            setIsError(true);
            setIsErrorInfo(response.message);
        } else {
            navigate('/cvs');
        }
    };




    if (isLoading) {
        return <Loader />
    }


    if (isError) {
        return <Modal content={isErrorInfo} closeModal={() => setIsError(false)} />
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100vw',  }}>
            <div className="mt-4" style={{backgroundColor:'white'}}>
                <div className="shadow p-4 mb-5  text-dark mx-auto" style={{ maxWidth: '800px'}} ref={cvRef}>
                    <header className="text-center">
                        <h1 className="h3 mb-2 mb-sm-3">
                            {dummyData.name}
                        </h1>
                        <div className="row">
                            <div className="col-12 col-md-4">
                                <p><i className="fas fa-map-marker-alt"></i> {dummyData.contact.address}</p>
                            </div>
                            <div className="col-12 col-md-4">
                                <p><i className="fas fa-phone"></i> {dummyData.contact.phone}</p>
                            </div>
                            <div className="col-12 col-md-4">
                                <p><i className="fas fa-envelope"></i> {dummyData.contact.email}</p>
                            </div>
                        </div>
                    </header>

                    <section>
                        <h3><i className="fas fa-user-circle"></i> Profile</h3>
                        <p>{dummyData.profile}</p>
                    </section>

                    <section>
                        <h3><i className="fas fa-briefcase"></i> Employment History</h3>
                        {dummyData.employmentHistory.map((job, idx) => (
                            <div key={idx}>
                                <h4>{job.title} — {job.location}</h4>
                                <p>{job.date}</p>
                                <ul>
                                    {job.responsibilities.map((task, i) => <li key={i}>{task}</li>)}
                                </ul>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h3><i className="fas fa-graduation-cap"></i> Education</h3>
                        {dummyData.education.map((edu, idx) => (
                            <div key={idx}>
                                <h4>{edu.degree} — {edu.location}</h4>
                                <p>{edu.date}</p>
                                <p>{edu.honors}</p>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h3><i className="fas fa-cogs"></i> skills</h3>
                        <ul>
                            {dummyData.skillset.map((skill, idx) => (
                                <li key={idx}><strong>{skill.skill}</strong>: {skill.level}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h3><i className="fas fa-users"></i> References</h3>
                        {dummyData.references.map((ref, idx) => (
                            <div key={idx}>
                                <p><strong>{ref.name}</strong></p>
                                <p>{ref.email} | {ref.phone}</p>
                            </div>
                        ))}
                    </section>
                </div>

                {isCvAvailable ? <>


                    <div className="d-flex flex-column flex-sm-row justify-content-between mt-4">
                        <button onClick={downloadPDF} className="btn btn-primary shadow-sm mb-2 mb-sm-0">
                            Download PDF
                        </button>
                        <button onClick={downloadDOCX} className="btn btn-primary shadow-sm mb-2 mb-sm-0">
                            Download DOCX
                        </button>
                        <button onClick={editHandler} className="btn btn-primary shadow-sm mb-2 mb-sm-0">
                            Edit CV
                        </button>
                        <button onClick={deleteHandler} className="btn btn-primary shadow-sm mb-2 mb-sm-0">
                            Delete CV
                        </button>
                    </div>

                    <div className="mt-4 social-share-buttons text-center mt-3">
                        <h3>Share your CV</h3>
                        <div className="share-buttons-container d-flex flex-sm-row justify-content-center">
                            <FacebookShareButton url={shareUrl} quote="Check out my CV!" className="share-button">
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <TwitterShareButton url={shareUrl} title="Check out my CV!" className="share-button">
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <LinkedinShareButton url={shareUrl} className="share-button">
                                <LinkedinIcon size={32} round />
                            </LinkedinShareButton>
                            <WhatsappShareButton url={shareUrl} title="Check out my CV!" className="share-button">
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                        </div>
                    </div>



                </> : <></>}


            </div>
        </div>

    );
};

export default CVPreview;











