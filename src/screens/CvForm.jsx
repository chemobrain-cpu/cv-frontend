import React from 'react';
import { useParams } from 'react-router-dom';
import CvForm1 from './cvForm2';
import CvForm2 from './cvForm2';
import CVForm3 from './cvForm3';
import CVForm4 from './cvForm4';


const CVForm = () => {
    
    let { id } = useParams()
    if(id == 'template1'){
        return <CvForm1/>
    }else if(id == 'template2'){
        return <CvForm2/>
    }else if(id == 'template3'){
        return <CVForm3/>
    }else if(id == 'template4'){
        alert('template4')
        return <CVForm4/>
    }

};

export default CVForm;
