import React from 'react';

const Preview = () => {
  return (
    <div id="preview-section" className="preview-section">
      <h4>Preview Your CV</h4>

      <div id="cv-preview" className='cv-container'>
        <div className='left-section'>
          <h4>ARIERHI PRECIOUS</h4>
          <p>Software Engineer</p>

          <div className='summary-section'>
            <h3>SUMMARY</h3>
            <hr style={{ backgroundColor: 'black', width: '100%', height: '2px' }} />
            <p style={{fontSize:'.9rem',marginBottom:'2px'}}>+2349071991647</p>
            <p style={{fontSize:'.9rem',marginBottom:'2px'}}>arierhiprecious2gmail.com</p>
            <p style={{fontSize:'.9rem',marginBottom:'2px'}}>112 linciln road box 224</p>





          </div>

        </div>

        <div className='right-section'>


        </div>







      </div>





      <div className="btn-container">
        <button id="download-pdf" className="btn btn-primary">
          Download as PDF
        </button>
        <a className="btn btn-secondary">
          Go Back to Edit
        </a>
      </div>
    </div>
  );

}

export default Preview