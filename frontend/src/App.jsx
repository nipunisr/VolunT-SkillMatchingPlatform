// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { UserProvider } from './context/UserContext'; // Import your AuthProvider


import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import OrganizerLayout from './layouts/OrganizerLayout';

import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import CreateAccount from './pages/CreateAccount';
import EmailCode from './pages/EmailCode';
import VerificationSuccess from './pages/EmailSuccess';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PasswordUpdated from './pages/UpdatePassword';
import MainLayout from "./layouts/VolunteerLayout";
import HomePage from "./pages/VolunteerDashboard";
import EventPage from './pages/Opportunity';
import MyEvents from './pages/MyEvents';
import VolunteerProfile from './pages/VolunteerProfile';
import Notifications from './pages/Notifications';
import UpdatedCreation from './pages/UpdatedAccountCreation';
import OrgDashboard from './pages/OrganizerDashboard';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute'; 


// const App = () => {
//  return (
//  <BrowserRouter>
//  <UserProvider>
//  <Routes>
//  <Route element={<AuthLayout />}>
//    <Route path="/login" element={<Login />} />
//    <Route path="/verify-email" element={<VerifyEmail />} />
//    <Route path="/register" element={<CreateAccount />} />
//    <Route path="/email-code" element={<EmailCode/>} />
//    <Route path="/email-success" element={<VerificationSuccess/>} />
//    <Route path="/forgot-password" element={<ForgotPassword/>} />
//    <Route path="/reset-password" element={<ResetPassword/>} />
//    <Route path="/update-password" element={<PasswordUpdated/>} />
//    <Route path='/updated-creation' element={<UpdatedCreation/>}/>
//  </Route>

// <Route element={<DashboardLayout />}>
//   <Route path="/" element={<HomePage />} />
// </Route>

// <Route element={<MainLayout />}>
  
//   <Route path='/selected-opportunity' element={<EventPage/>}/>
//   <Route path='/my-events' element={<MyEvents/>}/>
//   <Route path='/volunteer-profile' element={<VolunteerProfile/>}/>
//   <Route path='/notifications' element={<Notifications/>}/>
// </Route>

// <Route element={<OrganizerLayout />}>
//   <Route path='/organizer/dashboard' element={<OrgDashboard/>}/>
  
// </Route>
 
       

//  </Routes>
//  </UserProvider>
//  </BrowserRouter>
//  );
// };






const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>

          {/* Public Auth routes (no protection) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/register" element={<CreateAccount />} />
            <Route path="/email-code" element={<EmailCode />} />
            <Route path="/email-success" element={<VerificationSuccess />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-password" element={<PasswordUpdated />} />
            <Route path="/updated-creation" element={<UpdatedCreation />} />
          </Route>



          <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          </Route>


          {/* Volunteer dashboard & related routes protected for volunteers */}
          <Route
            element={
              <ProtectedRoute allowedRoles={['volunteer']}>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            
            
            <Route path="/selected-opportunity" element={<EventPage />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/volunteer-profile" element={<VolunteerProfile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Organizer dashboard and related routes protected for organizers */}
          <Route
            element={
              <ProtectedRoute allowedRoles={['organizer']}>
                <OrganizerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/organizer/dashboard" element={<OrgDashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Fallback DashboardLayout, if you have general users or other roles */}
          {/* Or you can add here more protected routes for other roles */}
          <Route
            element={
              <ProtectedRoute allowedRoles={['volunteer', 'organizer']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Add any generic protected routes here */}
          </Route>

        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;

