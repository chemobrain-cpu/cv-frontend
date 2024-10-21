import React, { Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import FallBackComponent from './components/Fallback';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Home = React.lazy(() => import("./screens/Home"))
const JobCvPreview = React.lazy(() => import("./screens/Preview"))
const EducationCvPreview = React.lazy(() => import("./screens/EducationPreview"))
const EditJobCvPreview = React.lazy(() => import("./screens/EditPreview"))
const EditEducationCvPreview = React.lazy(() => import("./screens/EditEducationalCv"))



const Preview_3= React.lazy(() => import("./screens/Preview_3"))


const Template = React.lazy(() => import("./screens/Template"))
const Form = React.lazy(() => import("./screens/Form"))
const Form2 = React.lazy(() => import("./screens/Form2"))
const Form3 = React.lazy(() => import("./screens/Form3"))
const Login = React.lazy(() => import("./screens/Login"))
const Signup = React.lazy(() => import("./screens/Signup"))





function App() {

  return (
    
    <div className = "App">
    <Suspense fallback={<FallBackComponent />} >
      <Routes>
        {/* General*/}
        <Route path='/' element={<Home />} />
        <Route path='/jobcvpreview' element={< JobCvPreview />} />
        <Route path='/educationcvpreview' element={<EducationCvPreview/>} />

        <Route path='/jobcvpreview/edit' element={< EditJobCvPreview />} />
        <Route path='/educationcvpreview/edit' element={<EditEducationCvPreview/>} />
        <Route path='/template' element={<Template />} />
        <Route path='/form_job' element={<Form />} />
        <Route path='/form_education' element={<Form2 />} />
        <Route path='/form_3' element={<Form3 />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        
        <Route path='/preview_3' element={<Preview_3 />} />
      </Routes>

    </Suspense>
  </div>


    


  );
}

export default App;