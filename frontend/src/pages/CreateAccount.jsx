// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import { motion } from 'framer-motion';

// // const CreateAccount = () => {
// //   const navigate = useNavigate();
// //   const [error, setError] = useState('');
// //   const [showOrgField, setShowOrgField] = useState(false);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: '',
// //     phoneNumber: '',
// //     location: ''
// //   });

// //   const [errors, setErrors] = useState({});

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!formData.name.trim()) {
// //       newErrors.name = showOrgField ? 'Organization name is required' : 'Name is required';
// //     }
// //     if (!formData.email.trim()) {
// //       newErrors.email = 'Email is required';
// //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
// //       newErrors.email = 'Email is invalid';
// //     }
// //     if (!formData.password) {
// //       newErrors.password = 'Password is required';
// //     } else if (formData.password.length < 6) {
// //       newErrors.password = 'Password must be at least 6 characters';
// //     }
// //     if (formData.password !== formData.confirmPassword) {
// //       newErrors.confirmPassword = 'Passwords do not match';
// //     }
// //     if (!formData.phoneNumber && !showOrgField) {
// //       newErrors.phoneNumber = 'Phone number is required';
// //     }
// //     if (!formData.location && !showOrgField) {
// //       newErrors.location = 'Location is required';
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!validateForm()) return;

// //     try {
// //       const userData = {
// //         userName: formData.name,
// //         email: formData.email,
// //         password: formData.password,
// //         phoneNumber: formData.phoneNumber,
// //         location: formData.location,
// //         userType: showOrgField ? 'organizer' : 'volunteer'
// //       };

// //       const response = await axios.post('http://localhost:5800/api/register', userData);      
// //       if (response.data.success) {
// //         navigate('/verify-email', { state: { email: formData.email } });
// //       } else {
// //         setError(response.data.message || 'Registration failed');
// //       }
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Registration failed. Please try again.');
// //       console.error('Registration error:', err);
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gray-50">
// //       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
// //         <h1 className="mb-8 text-3xl font-semibold text-center text-gray-800">
// //           Create {showOrgField ? 'Organizer' : 'Volunteer'} Account
// //         </h1>

// //         <div className="flex justify-center mb-6">
// //           <button
// //             type="button"
// //             onClick={() => setShowOrgField(!showOrgField)}
// //             className="px-4 py-2 text-white bg-[#E17335] rounded-md hover:bg-orange-600 transition-colors"
// //           >
// //             {showOrgField ? 'Switch to Volunteer' : 'Switch to Organizer'}
// //           </button>
// //         </div>

// //         {error && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">{error}</div>}

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <label className="block mb-1 text-gray-700">
// //               {showOrgField ? 'Organization Name' : 'Full Name'}
// //             </label>
// //             <motion.input
// //               type="text"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335]"
// //               animate={{ opacity: 1 }}
// //               transition={{ duration: 0.3 }}
// //             />
// //             {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
// //           </div>

// //           <div>
// //             <label className="block mb-1 text-gray-700">Email</label>
// //             <input
// //               type="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335]"
// //             />
// //             {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
// //           </div>

// //           {!showOrgField && (
// //             <>
// //               <div>
// //                 <label className="block mb-1 text-gray-700">Phone Number</label>
// //                 <input
// //                   type="tel"
// //                   name="phoneNumber"
// //                   value={formData.phoneNumber}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335]"
// //                 />
// //                 {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
// //               </div>

// //               <div>
// //                 <label className="block mb-1 text-gray-700">Location</label>
// //                 <input
// //                   type="text"
// //                   name="location"
// //                   value={formData.location}
// //                   onChange={handleChange}
// //                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335]"
// //                 />
// //                 {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
// //               </div>
// //             </>
// //           )}

// //           <div>
// //             <label className="block mb-1 text-gray-700">Password</label>
// //             <input
// //               type="password"
// //               name="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335]"
// //             />
// //             {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
// //           </div>

// //           <div>
// //             <label className="block mb-1 text-gray-700">Confirm Password</label>
// //             <input
// //               type="password"
// //               name="confirmPassword"
// //               value={formData.confirmPassword}
// //               onChange={handleChange}
// //               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335]"
// //             />
// //             {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
// //           </div>

// //           <div className="flex gap-4 pt-4">
// //             <button
// //               type="button"
// //               onClick={() => navigate('/login')}
// //               className="flex-1 px-4 py-2 text-[#E17335] border border-[#E17335] rounded-md hover:bg-orange-50 transition-colors"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="flex-1 px-4 py-2 text-white bg-[#E17335] rounded-md hover:bg-orange-600 transition-colors"
// //             >
// //               Create Account
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateAccount;


// import React, { useState,useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { useUserContext } from '../context/UserContext'; // Assuming you have a UserContext to get current user info

// const CreateAccount = () => {
//   const { currentUser } = useUserContext;
//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [showOrgField, setShowOrgField] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     phoneNumber: '',
//     location: ''
//     //registeredNumber: ''
//   });



//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData(prev => ({ ...prev, [name]: value }));
//   setErrors(prev => ({ ...prev, [name]: '' }));
//   setError('');
// };




//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = showOrgField ? 'Organization name is required' : 'Full name is required';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Confirm password is required';
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };


//   const updateProfile = async () => {
//     if (!currentUser) {
//       alert('User not logged in');
//       return;
//     }
//     const userId = currentUser.userId || currentUser.id; // adjust as per your user object

//     const userData = {
//       userName: formData.name,
//       email: formData.email,
//       phoneNumber: formData.phoneNumber,
//       location: formData.location,
//       userType: showOrgField ? 'organizer' : 'volunteer'
//     };

//     const childData = showOrgField
//       ? {
//           organizationName: formData.organizationName,
//           registeredNumber: formData.registeredNumber,
//           website: formData.website,
//           contactPerson: formData.contactPerson,
//           address: formData.address
//         }
//       : {
//           skills: formData.skills,
//           availability: formData.availability
//         };

//     try {
//       const response = await axios.put(`http://localhost:5000/user/update/${userId}`, {
//         userData,
//         childData
//       });

//       if (response.data.success) {
//         alert('Profile updated successfully');
//         // Optionally navigate or refresh user data here
//       } else {
//         alert('Update failed: ' + response.data.message);
//       }
//     } catch (error) {
//       alert('Update error: ' + error.message);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       const userData = {
//       userName: formData.name,   
//       email: formData.email,
//       phoneNumber: formData.phoneNumber,
//       location: formData.location,
//       password: formData.password,
//       userType: showOrgField ? 'organizer' : 'volunteer'
//     };


//       const response = await axios.post('http://localhost:5000/user/addUser', userData);

//       if (response.data.success) {
//         navigate('/verify-email', { state: { email: formData.email } });
//       } else {
//         // Show backend error under email if related, else generic error
//         if (response.data.message.toLowerCase().includes('email')) {
//           setErrors(prev => ({ ...prev, email: response.data.message }));
//         } else {
//           setError(response.data.message || 'Registration failed');
//         }
//       }
//     } catch (err) {
//       const backendMessage = err.response?.data?.message || 'Registration failed. Please try again.';
//       if (backendMessage.toLowerCase().includes('email')) {
//         setErrors(prev => ({ ...prev, email: backendMessage }));
//       } else {
//         setError(backendMessage);
//       }
//       console.error('Registration error:', err);
//     }
//   };
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//         <h1 className="mb-8 text-3xl font-semibold text-center text-gray-800">
//           Create {showOrgField ? 'Organizer' : 'Volunteer'} Account
//         </h1>

//         <div className="flex justify-center mb-6">
//           <button
//             type="button"
//             onClick={() => setShowOrgField(!showOrgField)}
//             className="px-4 py-2 text-white bg-[#E17335] rounded-md hover:bg-orange-600 transition-colors"
//           >
//             {showOrgField ? 'Switch to Volunteer' : 'Switch to Organizer'}
//           </button>
//         </div>

//         {error && (
//           <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4" noValidate>
//           <div>
//             <label className="block mb-1 text-gray-700">
//               {showOrgField ? 'Organization Name' : 'Full Name'}
//             </label>
//             <motion.input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335] ${
//                 errors.name ? 'border-red-500' : ''
//               }`}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.3 }}
//             />
//             {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
//           </div>

//           {/* {showOrgField && (
//          <div>
//            <label className="block mb-1 text-gray-700">Registered Number</label>
//            <input
//              type="text"
//              name="registeredNumber"
//              value={formData.registeredNumber}
//              onChange={handleChange}
//              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335] ${
//              errors.registeredNumber ? 'border-red-500' : ''
//        }`}
//            />
//         {errors.registeredNumber && (
//          <p className="mt-1 text-sm text-red-500">{errors.registeredNumber}</p>
//         )}
//        </div>
//         )} */}


//           <div>
//             <label className="block mb-1 text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335] ${
//                 errors.email ? 'border-red-500' : ''
//               }`}
//             />
//             {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
//           </div>

//               <div>
//                 <label className="block mb-1 text-gray-700">Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335] ${
//                     errors.phoneNumber ? 'border-red-500' : ''
//                   }`}
//                 />
//                 {errors.phoneNumber && (
//                   <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block mb-1 text-gray-700">Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335] ${
//                     errors.location ? 'border-red-500' : ''
//                   }`}
//                 />
//                 {errors.location && (
//                   <p className="mt-1 text-sm text-red-500">{errors.location}</p>
//                 )}
//               </div>

//           <div>
//             <label className="block mb-1 text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335] ${
//                 errors.password ? 'border-red-500' : ''
//               }`}
//             />
//             {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-700">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335] ${
//                 errors.confirmPassword ? 'border-red-500' : ''
//               }`}
//             />
//             {errors.confirmPassword && (
//               <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
//             )}
//           </div>

//           <div className="flex gap-4 pt-4">
//             <button
//               type="button"
//               onClick={() => navigate('/login')}
//               className="flex-1 px-4 py-2 text-[#E17335] border border-[#E17335] rounded-md hover:bg-orange-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 px-4 py-2 text-white bg-[#E17335] rounded-md hover:bg-orange-600 transition-colors"
//             >
//               Create Account
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateAccount;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useUserContext } from '../context/UserContext'; // Assuming this exports a hook

const CreateAccount = () => {
  const { currentUser } = useUserContext(); // Correct usage of the hook
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showOrgField, setShowOrgField] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    location: '',
    organizationName: '',
    registeredNumber: '',
    website: '',
    contactPerson: '',
    address: '',
    skills: '',
    availability: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = showOrgField ? 'Organization name is required' : 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!currentUser) { // Only validate password on registration
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    // Optional: Add validation for other fields if needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateProfile = async () => {
    if (!currentUser) {
      alert('User not logged in');
      return;
    }
    const userId = currentUser.userId || currentUser.id;

    const userData = {
      userName: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      location: formData.location,
      userType: showOrgField ? 'organizer' : 'volunteer'
    };

    const childData = showOrgField
      ? {
          organizationName: formData.organizationName,
          registeredNumber: formData.registeredNumber,
          website: formData.website,
          contactPerson: formData.contactPerson,
          address: formData.address
        }
      : {
          skills: formData.skills,
          availability: formData.availability
        };

    try {
      const response = await axios.put(`http://localhost:5000/user/update/${userId}`, {
        userData,
        childData
      });

      if (response.data.success) {
        alert('Profile updated successfully');
      } else {
        alert('Update failed: ' + response.data.message);
      }
    } catch (error) {
      alert('Update error: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (currentUser) {
      // Update existing user profile
      await updateProfile();
    } else {
      // Register new user
      try {
        const userData = {
          userName: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          location: formData.location,
          password: formData.password,
          userType: showOrgField ? 'organizer' : 'volunteer'
        };

        const response = await axios.post('http://localhost:5000/user/addUser', userData);

      //   if (response.data.success) {
      //     navigate('/verify-email', { state: { email: formData.email } });
      //   } else {
      //     if (response.data.message.toLowerCase().includes('email')) {
      //       setErrors(prev => ({ ...prev, email: response.data.message }));
      //     } else {
      //       setError(response.data.message || 'Registration failed');
      //     }
      //   }
      // } catch (err) {
      //   const backendMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      //   if (backendMessage.toLowerCase().includes('email')) {
      //     setErrors(prev => ({ ...prev, email: backendMessage }));
      //   } else {
      //     setError(backendMessage);
      //   }
      //   console.error('Registration error:', err);
      // }

      if (response.data.success) {
      if (userData.userType === 'organizer') {
        navigate('/organizer/dashboard');
      } else {
        navigate('/verify-email', { state: { email: formData.email } });
      }
    } else {
      // handle errors...
    }
  } catch (err) {
    // handle errors...
  }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-8 text-3xl font-semibold text-center text-gray-800">
          Create {showOrgField ? 'Organizer' : 'Volunteer'} Account
        </h1>

        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={() => setShowOrgField(!showOrgField)}
            className="px-4 py-2 text-white bg-[#E17335] rounded-md hover:bg-orange-600 transition-colors"
          >
            {showOrgField ? 'Switch to Volunteer' : 'Switch to Organizer'}
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block mb-1 text-gray-700">
              {showOrgField ? 'Organization Name' : 'Full Name'}
            </label>
            <motion.input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335] ${
                errors.name ? 'border-red-500' : ''
              }`}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* {showOrgField && (
         <div>
           <label className="block mb-1 text-gray-700">Registered Number</label>
           <input
             type="text"
             name="registeredNumber"
             value={formData.registeredNumber}
             onChange={handleChange}
             className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335] ${
             errors.registeredNumber ? 'border-red-500' : ''
       }`}
           />
        {errors.registeredNumber && (
         <p className="mt-1 text-sm text-red-500">{errors.registeredNumber}</p>
        )}
       </div>
        )} */}


          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335] ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

              <div>
                <label className="block mb-1 text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335] ${
                    errors.phoneNumber ? 'border-red-500' : ''
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335] ${
                    errors.location ? 'border-red-500' : ''
                  }`}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                )}
              </div>

          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335] ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E17335] ${
                errors.confirmPassword ? 'border-red-500' : ''
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="flex-1 px-4 py-2 text-[#E17335] border border-[#E17335] rounded-md hover:bg-orange-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-[#E17335] rounded-md hover:bg-orange-600 transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateAccount;