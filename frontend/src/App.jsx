// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { UserProvider } from './context/UserContext'; // Import your AuthProvider
import { useAuth } from './context/AuthContext';

import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import OrganizerLayout from './layouts/OrganizerLayout';
import VolunteerLayout from './layouts/VolunteerLayout';

import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import CreateAccount from './pages/CreateAccount';
import EmailCode from './pages/EmailCode';
import VerificationSuccess from './pages/EmailSuccess';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PasswordUpdated from './pages/UpdatePassword';
import MainLayout from "./layouts/VolunteerLayout";
import HomePage from "./pages/CommonDashboard";
import EventPage from './pages/Opportunity';

import MyRegisteredEvents from './pages/MyRegisteredEvents';
import OrganizerApplications from './pages/OrganizerApplications';

import VolunteerProfileEdit from './pages/VolunteerProfilePage';
import Notifications from './pages/Notifications';
import UpdatedCreation from './pages/UpdatedAccountCreation';

import OrgDashboard from './pages/OrganizerDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';

import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute'; 

import EventDetails from './pages/EventDetails';
import VolunteerEventDetails from './pages/VolunteerEventDetails';

import AboutUs from './pages/AboutUs';

//import ErrorBoundary from './components/ErrorBoundary';
//import VolunEventDetails from './components/VolunEventDetails';

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
  const { user, loading } = useAuth();

  // While auth state is loading, show loading or empty div
  if (loading) return <div>Loading...</div>;

  // Get currentUserId safely (might be undefined if not logged in)
  const currentUserId = user?.userId;

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>

          {/* Public Auth routes */}
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

          <Route path="/about-us" element={<AboutUs />} />



          <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
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
            {/* <Route path="/my-events" element={<MyEvents />} /> */}

            <Route path="/notifications" element={<Notifications />} />
            
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
            <Route path="/events/:opportunityId" element={<EventDetails currentUserId={currentUserId} />} />
            <Route path="/organizer/applications" element={<OrganizerApplications />} />
            
          </Route>

          
         <Route
            element={
              <ProtectedRoute allowedRoles={['volunteer']}>
                <VolunteerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
            <Route path="/volunteer/profile/edit" element={<VolunteerProfileEdit />}  />
            <Route path="/volunteer/dashboard/:opportunityId" element={<VolunteerEventDetails />} />
            <Route path="/my-events" element={<MyRegisteredEvents />} />
            
            


          </Route>


          <Route
            element={
              <ProtectedRoute allowedRoles={['volunteer', 'organizer']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
          
          </Route>

        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;

