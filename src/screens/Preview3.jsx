import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { Document, Packer, Paragraph } from "docx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from '../components/Modal/Modal';
import Loader from "../components/loader";
import { deleteCv } from "../store/action/userAppStorage";


const Preview3 = () => {
  const { cv: formData, isCvAvailable } = useSelector((state) => state.userAuth);
  const cvRef = useRef();
  let navigate = useNavigate()
  const [isError, setIsError] = useState(false);
  const [isErrorInfo, setIsErrorInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const downloadPDF = () => {
    const element = cvRef.current;
    const options = {
      margin: 1,
      filename: "CV.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  const downloadDOCX = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({ text: formData?.name || "Full Name", heading: "Title" }),
            new Paragraph({ text: formData?.profile || "Profile Title", heading: "Heading2" }),
            new Paragraph(formData?.phone || "Phone"),
            new Paragraph(formData?.email || "Email"),
            new Paragraph(formData?.linkedin || "LinkedIn"),
            new Paragraph(formData?.location || "Location"),
            new Paragraph("PROFILE"),
            new Paragraph(formData?.profile || "Profile Description"),

            new Paragraph("PROFESSIONAL EXPERIENCE"),
            ...(formData?.experiences || []).map(
              (job) =>
                new Paragraph(
                  `${job.role} - ${job.company} | ${job.startDate} - ${job.endDate} | ${job.location}`
                )
            ),

            new Paragraph("EDUCATION"),
            ...(formData?.education || []).map(
              (edu) =>
                new Paragraph(
                  `${edu.degree} - ${edu.institution} | ${edu.startDate} - ${edu.endDate}`
                )
            ),

            new Paragraph("CERTIFICATION"),
            ...(formData?.certifications || []).map(
              (cert) => new Paragraph(`${cert.title} | ${cert.organization}`)
            ),

            new Paragraph("TECHNICAL SKILLS"),
            new Paragraph(formData?.skills3 ? formData.skills3.join(", ") : ""),

            new Paragraph("Powered by Enhancv"),
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
    navigate(`/editcv/${formData.cvTemplateType}`);
  };

  if (!isCvAvailable) {
    return <div>No CV available</div>;
  }


  //deleteCv
  const deleteHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await dispatch(deleteCv(formData));
    if (!response.bool) {
      setIsLoading(false);
      setIsError(true);
      setIsErrorInfo(response.message);
    } else {
      setIsLoading(false);
      navigate(`/cvs`);
    }
  };


  let closeModal = () => {
    setIsError(false)
  }

  return (
    <> {isLoading && <Loader />}
      {isError && <Modal content={isErrorInfo} closeModal={closeModal} />}
      <div
        ref={cvRef}
        style={{
          fontFamily: "Arial, sans-serif",
          padding: "20px",
          maxWidth: "800px",
          margin: "auto",
          lineHeight: 1.5,
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <header style={{ textAlign: "left", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "36px", margin: 0 }}>{formData?.name || "Full Name"}</h1>
          <p style={{ fontSize: "18px", fontStyle: "italic", margin: "5px 0" }}>
            {formData?.profile || "Profile Title"}
          </p>
          <div style={{ fontSize: "14px", marginTop: "10px" }}>
            <p>
              <span>📞 {formData?.phone || "+1-000-000"} </span> |
              <span> ✉️ {formData?.email || "email@example.com"} </span> |
              <span>
                🔗 <a href={formData?.linkedin || "#"}>{formData?.linkedin || "linkedin.com"}</a>
              </span>
            </p>
            <p>📍 {formData?.location || "New York City, NY"}</p>
          </div>
        </header>

        <section>
          <h2 style={{ borderBottom: "2px solid black", paddingBottom: "5px" }}>PROFILE</h2>
          <p>{formData?.profile || "Result-oriented project team leader with experience covering project and product management."}</p>
        </section>

        <section>
          <h2 style={{ borderBottom: "2px solid black", paddingBottom: "5px" }}>PROFESSIONAL EXPERIENCE</h2>
          {(formData?.experiences || []).map((job, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <h3>{job.role}</h3>
              <p>
                <strong>{job.company}</strong> | {job.startDate} - {job.endDate} | {job.location}
              </p>
              <ul>
                {job.responsibilities.map((responsibility, resIndex) => (
                  <li key={resIndex}>{responsibility}</li>
                ))}

              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 style={{ borderBottom: "2px solid black", paddingBottom: "5px" }}>EDUCATION</h2>
          {(formData?.education || []).map((edu, index) => (
            <div key={index}>
              <p><strong>{edu.degree || "Degree"}</strong></p>
              <p>{edu.institution || "Institution"}</p>
              <p>{edu.startDate || "Start Date"} - {edu.endDate || "End Date"}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 style={{ borderBottom: "2px solid black", paddingBottom: "5px" }}>CERTIFICATION</h2>
          {(formData?.certifications || []).map((cert, index) => (
            <p key={index}>{cert.title || "Certification"} | {cert.organization || "Organization"}</p>
          ))}
        </section>

        <section>
          <h2 style={{ borderBottom: "2px solid black", paddingBottom: "5px" }}>TECHNICAL SKILLS</h2>
          <p>{formData?.skills3 ? formData.skills3.join(", ") : "Technical Skills"}</p>
        </section>

        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
          <button onClick={downloadPDF} style={buttonStyle} className="btn btn-primary m-2">Download PDF</button>
          <button onClick={downloadDOCX} style={buttonStyle} className="btn btn-primary m-2">Download DOCX</button>
          <button onClick={editHandler} style={buttonStyle} className="btn btn-primary m-2">Edit CV</button>
          <button onClick={deleteHandler} style={buttonStyle} className="btn btn-primary m-2">Delete CV</button>
        </div>
      </div>
    </>

  );
};

const buttonStyle = {
  padding: "10px 20px",
  margin: "10px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Preview3;






