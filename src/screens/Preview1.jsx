
import './preview.css';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import html2pdf from "html2pdf.js";
import { Document, Packer, Paragraph } from "docx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import { deleteCv, fetchSpecificCv } from "../store/action/userAppStorage";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share';


const Preview1 = () => {
  const { cv: formData, isCvAvailable } = useSelector((state) => state.userAuth);
  const cvRef = useRef();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isErrorInfo, setIsErrorInfo] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [dummyData, setDummyData] = useState({})
  const dispatch = useDispatch();

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
    const options = {
      margin: 1,
      filename: 'CV.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(element).set(options).save();
  };

  const downloadDOCX = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({ text: dummyData?.name || "Full Name", heading: "Title" }),
            new Paragraph({ text: dummyData?.jobTitle || "Job Title", heading: "Heading2" }),
            new Paragraph("SUMMARY"),
            new Paragraph(`Phone: ${dummyData.phone}`),
            new Paragraph(`Email: ${dummyData.email}`),
            new Paragraph(`Location: ${dummyData.location}`),
            new Paragraph(`Social Media: ${dummyData.socialMedia}`),

            new Paragraph("AWARDS"),
            ...(dummyData?.awards || []).map(
              (award) =>
                new Paragraph(
                  `${award.title} - ${award.organization} / ${award.year} / ${award.location}`
                )
            ),

            new Paragraph("ACHIEVEMENTS"),
            ...(dummyData?.achievements || []).map(
              (achievement) =>
                new Paragraph(achievement.description)
            ),

            new Paragraph("EDUCATION"),
            ...(dummyData?.education || []).map(
              (edu) =>
                new Paragraph(
                  `${edu.degree} - ${edu.institution} / ${edu.year}`
                )
            ),

            new Paragraph("WORK EXPERIENCE"),
            ...(dummyData?.workExperience || []).map((work) => {
              const responsibilities = work?.responsibilities?.map(
                (responsibility) => new Paragraph(`• ${responsibility}`)
              );
              return [
                new Paragraph(`${work.title} - ${work.company} / ${work.duration}`),
                ...responsibilities,
              ];
            }).flat(),
          ],
        },
      ],
    });

    try {
      const blob = await Packer.toBlob(doc);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "CV.docx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error generating DOCX:", error);
    }
  };

  const editHandler = () => {
    navigate(`/editcv/${dummyData.cvTemplateType}`);
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await dispatch(deleteCv(dummyData));
    if (!response.bool) {
      setIsLoading(false);
      setIsError(true);
      setIsErrorInfo(response.message);
    } else {
      setIsLoading(false);
      navigate(`/cvs`);
    }
  };

  if (isLoading) {
    return <Loader />
  }


  if (isError) {
    return <Modal content={isErrorInfo} closeModal={() => setIsError(false)} />
  }



  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
      <div className="container-cvs">
    

        <div className="cv-containers" ref={cvRef}>
          <div className="left-column">
            <div className="profile-picture">
              {/*<img src="profile.jpg" alt="Profile Picture" />*/}
            </div>
            <h1 className="name">{dummyData.name}</h1>
            <h2 className="job-title">{dummyData.jobTitle}</h2>

            <section className="section summary-section">
              <h3>SUMMARY</h3>
              <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                <li><i className="fas fa-phone"></i> {dummyData.phone}</li>
                <li><i className="fas fa-envelope"></i> {dummyData.email}</li>
                <li><i className="fas fa-map-marker-alt"></i> {dummyData.location}</li>
                <li><i className="fas fa-globe"></i> {dummyData.socialMedia}</li>
              </ul>

            </section>

            <section className="section awards-section">
              <h3>AWARDS</h3>
              {dummyData.awards.map((award, index) => (
                <p key={index}>
                  <strong>{award.title}</strong><br />
                  {award.organization} / {award.year} / {award.location}
                </p>
              ))}
            </section>

            <section className="section achievements-section">
              <h3>ACHIEVEMENTS</h3>
              {dummyData.achievements.map((achievement, index) => (
                <p key={index}>{achievement.description}</p>
              ))}
            </section>
          </div>

          <div className="right-column">
            <section className="section summary">
              <h3>SUMMARY</h3>
              <p>{dummyData.summary}</p>
            </section>

            <section className="section education">
              <h3>EDUCATION</h3>
              {dummyData.education.map((edu, index) => (
                <div className="education-item" key={index}>
                  <h4>{edu.degree}</h4>
                  <p>{edu.institution} / {edu.year}</p>
                  <p>{edu.details}</p>
                </div>
              ))}
            </section>

            <section className="section work-experience">
              <h3>WORK EXPERIENCE</h3>
              {dummyData.workExperience.map((work, index) => (
                <div className="work-item" key={index}>
                  <h4>{work.title}</h4>
                  <p>{work.company} / {work.duration}</p>
                  <ul>
                    {work.responsibilities.map((responsibility, i) => (
                      <li key={i}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          </div>
        </div>

        {isCvAvailable ? <>
        <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-4">
          <button className="btn btn-primary" onClick={downloadPDF}>Download as PDF</button>
          <button className="btn btn-primary" onClick={downloadDOCX}>Download as DOCX</button>
          <button className="btn btn-primary" onClick={editHandler}>Edit CV</button>
          <button className="btn btn-primary" onClick={deleteHandler}>Delete CV</button>
        </div>



        <div className="social-share-buttons text-center mt-3">
          <h3>Share your CV</h3>
          <div className="share-buttons-container">
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
        </div></> : <></>}

      </div>
    </div>

  );
};

export default Preview1;
























































