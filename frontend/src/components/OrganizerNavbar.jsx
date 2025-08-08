// import React from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../assets/images/logo.png';


// const OrganizerNavbar = () => (
//   <nav className="flex justify-between items-center py-4 bg-white container px-4 mx-auto">
//     <div className="flex items-center gap-2">
//       <img 
//             src={logo} 
//             alt="Volunteer Connect Logo"
//             className="w-28 h-28"
//           />
//       {/* <span className="font-bold text-xl text-[#E17335]">VolunT</span> */}
//     </div>
//     <div className="flex gap-8">
//       <Link to="/organizer/dashboard" className="font-semibold text-[#E17335]">Home</Link>
//       <Link to="/organizer/applicants">Applicants</Link>
//       <Link to="/organizer/notifications">Notifications</Link>
//       <Link to="/about">About Us</Link>
//     </div>
//     <div className="flex items-center gap-4">
//       <button className="bg-[#2D0C3E] text-white px-4 py-2 rounded">LogOut</button>
//     </div>
//   </nav>
// );

// export default OrganizerNavbar;




import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import { useAuth } from '../context/AuthContext';  // Adjust the path if needed
import logo from '../assets/images/logo.png';
import LogoutButton from './LogoutButton';


const OrganizerNavbar = () => {
 //const { logout } = useAuth();
//  const navigate = useNavigate();

  // const handleLogout = () => {
  //   logout();            // Clear token and user context state
  //   navigate('/login');  // Redirect to login page after logout
  // };

  return (
    <nav className="flex justify-between items-center py-4 bg-white container px-4 mx-auto">
      <div className="flex items-center gap-2">
        <img 
          src={logo} 
          alt="Volunteer Connect Logo"
          className="w-28 h-28"
        />
        {/* <span className="font-bold text-xl text-[#E17335]">VolunT</span> */}
      </div>
      <div className="flex gap-8">
        <Link to="/organizer/dashboard" className="font-semibold text-[#E17335]">Home</Link>
        <Link to="/organizer/applicants">Applicants</Link>
        <Link to="/organizer/notifications">Notifications</Link>
        <Link to="/about">About Us</Link>
      </div>
      <div className="flex items-center gap-4">
        <div 
          className="bg-[#2D0C3E] text-white px-4 py-2 rounded" >
         <LogoutButton />
        </div>
      </div>
    </nav>
  );
};

export default OrganizerNavbar;
