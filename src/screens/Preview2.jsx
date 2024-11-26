
import './preview2.css';
import { Document, Packer, Paragraph, TextRun, Header, Footer, PageBreak } from "docx"; // Import necessary classes from docx
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import html2pdf from "html2pdf.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCv, fetchSpecificCv } from "../store/action/userAppStorage";



const Preview2 = () => {
  const { cv: formData, isCvAvailable } = useSelector((state) => state.userAuth);

  const pdfRef = useRef();



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


  const shareUrl = window.location.origin + `/preview/${id}` + `/${cvId ? cvId : formData._id}`;


  const downloadPDF = () => {
    if (!pdfRef.current) return;
    const element = pdfRef.current;
    const options = {
      margin: 1,
      filename: `${dummyData?.name || 'CV'}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
  };

  const downloadDOCX = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          headers: {
            default: new Header({
              children: [new Paragraph("Header Text")],
            }),
          },
          footers: {
            default: new Footer({
              children: [new Paragraph("Footer Text")],
            }),
          },
          children: [
            new Paragraph({
              text: `${dummyData?.name || 'Your Name'}'s CV`,
              heading: "TITLE",
            }),
            new Paragraph({
              text: `Phone: ${dummyData?.phone || 'N/A'}`,
            }),
            new Paragraph({
              text: `Location: ${dummyData?.location || 'N/A'}`,
            }),
            new Paragraph({
              text: `Email: ${dummyData?.email || 'N/A'}`,
            }),
            new Paragraph({
              text: "Education",
              heading: "HEADING_1",
            }),
            ...dummyData.education.map(edu =>
              new Paragraph({
                children: [
                  new TextRun(edu?.year || ''),
                  new TextRun({
                    text: ` ${edu?.degree || 'Degree'}, ${edu?.institution || 'Institution'}`,
                    bold: true,
                  }),
                  new TextRun({
                    text: ` - ${edu?.details || 'Details'}`,
                  }),
                ],
              })
            ),
            new PageBreak(),
            new Paragraph({
              text: "Additional Skills",
              heading: "HEADING_1",
            }),
            new Paragraph(`R: ${dummyData?.skills?.R || 'N/A'}`),
            new Paragraph(`Spanish: ${dummyData?.skills?.Spanish || 'N/A'}`),
            new Paragraph(`Mandarin: ${dummyData?.skills?.Mandarin || 'N/A'}`),
            new PageBreak(),
            new Paragraph({
              text: "Publications",
              heading: "HEADING_1",
            }),
            ...dummyData.publications.map(pub =>
              new Paragraph({
                text: `${pub?.title || 'Title'}. ${pub?.journal || 'Journal'} (${pub?.year || 'Year'}): ${pub?.pages || 'Pages'}.`,
              })
            ),
            new PageBreak(),
            new Paragraph({
              text: "Research Experience",
              heading: "HEADING_1",
            }),
            ...dummyData.researchExperience.map(exp =>
              new Paragraph({
                children: [
                  new TextRun(exp?.duration || ''),
                  new TextRun({
                    text: ` ${exp?.role || 'Role'}, ${exp?.institution || 'Institution'}`,
                    bold: true,
                  }),
                  new TextRun({
                    text: ` - ${exp?.description || 'Description'}`,
                  }),
                ],
              })
            ),
            new PageBreak(),
            new Paragraph({
              text: "Awards & Honors",
              heading: "HEADING_1",
            }),
            ...dummyData.awards.map(award =>
              new Paragraph({
                text: `${award?.year || ''} - ${award?.title || 'Title'}, ${award?.institution || 'Institution'}`,
              })
            ),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${dummyData?.name || 'CV'}.docx`;
      link.click();
      URL.revokeObjectURL(url);
    }).catch(error => {
      console.error("Error creating DOCX file:", error);
    });
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
    <div style={{ width: '100vw' }}>

      <div className="cv-container shadow-lg p-4" ref={pdfRef} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <div className="cv-header">
          <h1 className="cv-title">{dummyData?.name || 'Your Name'}</h1>
          <div className="contact-info">
            <p><i className="fas fa-phone"></i> {dummyData?.phone || 'N/A'}</p>
            <p><i className="fas fa-map-marker-alt"></i> {dummyData?.location || 'N/A'}</p>
            <p><i className="fas fa-envelope"></i> {dummyData?.email || 'N/A'}</p>
          </div>
        </div>
        <div className="cv-main">
          <div className="cv-left">
            <section className="section education">
              <h3>Education</h3>
              {dummyData?.education?.map((edu, index) => (
                <div className="education-item" key={index}>
                  <p>{edu?.year || ''}</p>
                  <div>
                    <h4>{edu?.degree || 'Degree'}</h4>
                    <p>{edu?.institution || 'Institution'}</p>
                    <p>{edu?.details || 'Details'}</p>
                  </div>
                </div>
              ))}
            </section>
            <section className="section skills">
              <h3>Additional Skills</h3>
              <ul>
                <li>R: {dummyData?.skills?.R || 'N/A'}</li>
                <li>Spanish: {dummyData?.skills?.Spanish || 'N/A'}</li>
                <li>Mandarin: {dummyData?.skills?.Mandarin || 'N/A'}</li>
              </ul>
            </section>
          </div>
          <div className="cv-right">
            <section className="section publications">
              <h3>Publications</h3>
              {dummyData?.publications?.map((pub, index) => (
                <p key={index}>
                  {pub?.title || 'Title'}. <i>{pub?.journal || 'Journal'}</i> ({pub?.year || 'Year'}): {pub?.pages || 'Pages'}.
                </p>
              ))}
            </section>
            <section className="section research-experience">
              <h3>Research Experience</h3>
              {dummyData?.researchExperience?.map((exp, index) => (
                <div key={index}>
                  <p>{exp?.duration || ''}</p>
                  <div>
                    <h4>{exp?.role || 'Role'}</h4>
                    <p>{exp?.institution || 'Institution'}</p>
                    <p>{exp?.description || 'Description'}</p>
                  </div>
                </div>
              ))}
            </section>
            <section className="section awards">
              <h3>Awards & Honors</h3>
              {dummyData?.awards?.map((award, index) => (
                <p key={index}>{award?.year || ''} - {award?.title || 'Title'}, {award?.institution || 'Institution'}</p>
              ))}
            </section>
          </div>
        </div>
      </div>



      {isCvAvailable ? (
        <>
      
          <div className="flex flex-col sm:flex-row justify-center mt-4 space-y-[5px] sm:space-y-0 sm:space-x-[5px]">
            <button
              onClick={downloadPDF}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-600"
            >
              Download PDF
            </button>
            <button
              onClick={downloadDOCX}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-600"
            >
              Download DOCX
            </button>
            <button
              onClick={editHandler}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-600"
            >
              Edit CV
            </button>
            <button
              onClick={deleteHandler}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-600"
            >
              Delete CV
            </button>
          </div>

          <div className="text-center mt-3">
            <h3 className="text-lg font-semibold">Share your CV</h3>
            <div className="flex justify-center space-x-2">
              <FacebookShareButton url={shareUrl} quote="Check out my CV!" className="hover:opacity-80">
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title="Check out my CV!" className="hover:opacity-80">
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <LinkedinShareButton url={shareUrl} className="hover:opacity-80">
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
              <WhatsappShareButton url={shareUrl} title="Check out my CV!" className="hover:opacity-80">
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </div>
        </>
      ) : null}


    </div>


  );
};

export default Preview2;