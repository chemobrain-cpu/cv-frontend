import React, { Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import FallBackComponent from './components/Fallback';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Home = React.lazy(() => import("./screens/Home"))
const Preview = React.lazy(() => import("./screens/Preview"))
const Template = React.lazy(() => import("./screens/Template"))
const Form = React.lazy(() => import("./screens/Form"))
const Login = React.lazy(() => import("./screens/Login"))
const Signup = React.lazy(() => import("./screens/Signup"))



function App() {

  return (
    
    <div className = "App">
    <Suspense fallback={<FallBackComponent />} >
      <Routes>
        {/* General*/}
        <Route path='/' element={<Home />} />
        <Route path='/preview' element={<Preview />} />
        <Route path='/template' element={<Template />} />
        <Route path='/form' element={<Form />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        
      </Routes>

    </Suspense>
  </div>


    


  );
}

export default App;