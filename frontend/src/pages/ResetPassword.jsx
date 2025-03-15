import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResetPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      password: '',
      confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
  
    const validatePassword = (password) => {
      const validations = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*]/.test(password),
      };
  
      return validations;
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = {};
      
      const validations = validatePassword(formData.password);
      if (!validations.length) {
        newErrors.password = 'Password must be at least 8 characters long';
      }
      if (!validations.uppercase || !validations.lowercase) {
        newErrors.password = 'Password must contain both uppercase and lowercase letters';
      }
      if (!validations.number) {
        newErrors.password = 'Password must contain at least one number';
      }
      if (!validations.special) {
        newErrors.password = 'Password must contain at least one special character';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
  
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
  
      setIsLoading(true);
      try {
        // API call would go here
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        navigate('/update-password');
      } catch (err) {
        setErrors({ submit: 'Failedpassword to update password. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-3xl font-semibold text-center">Reset Password</h1>
  
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
  
            <div>
              <label className="block mb-2 text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
  
            {errors.submit && (
              <p className="text-sm text-center text-red-500">{errors.submit}</p>
            )}
  
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default ResetPassword;