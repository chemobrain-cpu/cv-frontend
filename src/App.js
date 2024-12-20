import React, { Suspense, useEffect,useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import FallBackComponent from './components/Fallback';
import { autoLogin } from './store/action/userAppStorage'; 


// Lazy loading components
const ProfileSettings = React.lazy(() => import("./screens/ProfileSetting"));
const Cvs = React.lazy(() => import("./screens/CVS"));
const Home = React.lazy(() => import("./screens/Home"));
const PricingPlan = React.lazy(() => import("./screens/Pricing"));
const EditCv = React.lazy(() => import("./screens/EditCv"));
const Preview = React.lazy(() => import("./screens/Preview"));
const Template = React.lazy(() => import("./screens/Template"));
const Form = React.lazy(() => import("./screens/CvForm"));
const Login = React.lazy(() => import("./screens/Login"));
const Signup = React.lazy(() => import("./screens/Signup"));
const Help = React.lazy(() =>import("./screens/Help"));
const P = React.lazy(() => import("./screens/Preview5"));


function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { user } = useSelector(state => state.userAuth);

  useEffect(() => {
    const checkAutoLogin = async () => {
      const result = await dispatch(autoLogin());

      if (!result.bool) {
        // Redirects to "/login" if not logged in
  
      } 

    };
    checkAutoLogin();
  }, [dispatch, navigate]);

  return (
    <div className="App">
      <Suspense fallback={<FallBackComponent />}>
        <div className="d-flex">
          <div className="content-area">

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/help' element={<Help />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />


            {/* protected route*/}
              <Route path='/editcv/:id' element={user?<EditCv />:<Login />} />
              <Route path='/template' element={user?<Template />:<Login />} />
              <Route path='/form/:id' element={user?<Form />:<Login />} />
              <Route path='/preview/:id' element={user?<Preview />:<Login />} />
              <Route path='/preview/:id/:cv' element={<Preview />} />
              <Route path='/profilesetting' element={user?<ProfileSettings />:<Login />} />
              <Route path='/cvs' element={user?<Cvs />:<Login />} />
              <Route path='/pricing' element={user?<PricingPlan />:<Login />} />
              <Route path='/test' element={user?<P />:<Login />} />
              
            </Routes>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default App;

