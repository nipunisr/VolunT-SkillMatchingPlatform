// src/layouts/AuthLayout.jsx
import { Outlet } from 'react-router-dom';
import logo from "../assets/images/logo.png";

const AuthLayout = () => {
 return (
 <div className="flex min-h-screen">
 {/* Left side with logo/image */}
 <div className="hidden lg:flex lg:w-1/2 bg-[#E17335] bg-opacity-70">
 <div className="flex items-center justify-center w-full p-12 ml-4">
 <img 
 src={logo}
 alt="VolunT Logo" 
 className="max-w-md w-full"
 />
 </div>
 </div>
 
 {/* Right side with auth forms */}
 <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
 <div className="w-full max-w-md">
 <Outlet />
 </div>
 </div>
 </div>
 );
};

export default AuthLayout;