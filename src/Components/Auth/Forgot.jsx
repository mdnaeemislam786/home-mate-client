import React, { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";

const Forgot = () => {
  const {forgotPassword} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid) return;
    setIsLoading(true);
    
    const email = formData.email;
    // console.log(email);
    forgotPassword(email)
    .then(() => {
      toast.success('Please check your email')
    })
    .catch(err => toast.error(err))
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ email: "" });
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-cyan-100">
      <div className="max-w-2xl w-full">
        {/* Forgot Password Form */}
        <div className="relative rounded-[40px] p-2 border-4 border-white shadow-2xl shadow-blue-300/50 m-5 animate-border-glow">
          
          <div className="relative bg-gradient-to-t from-[#f1f1f1] to-[#f4f7fb] rounded-[36px] p-8">
            {/* Back Button */}
            <Link
              to='/auth'
              className="flex items-center text-sm text-gray-600 hover:text-blue-600 mb-6 transition-colors"
            >
              <svg 
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Login
            </Link>

            <div className="text-center mb-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg 
                  className="w-8 h-8 text-blue-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-extrabold text-[#1089d3] mb-2">
                Forgot Password?
              </h2>
              <p className="text-gray-600 mb-8">
                {isSubmitted 
                  ? "Check your email for reset instructions" 
                  : "Enter your email address and we'll send you a link to reset your password."
                }
              </p>
            </div>

            {!isSubmitted ? (
              <form className="mt-5" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your registered email"
                    className="w-full bg-white border-2 border-transparent py-4 px-5 rounded-2xl shadow-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                  {formData.email && (
                    <div
                      className={`text-xs mt-1 ml-2 ${
                        isEmailValid ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isEmailValid
                        ? "✓ Valid email format"
                        : "✗ Please enter a valid email"}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isEmailValid || isLoading}
                  className={`w-full font-bold py-4 rounded-2xl shadow-xl border-none transition-all transform ${
                    isEmailValid && !isLoading
                      ? "bg-gradient-to-r from-[#1089d3] to-[#12b1d1] text-white hover:shadow-2xl cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Reset Link...
                    </div>
                  ) : (
                    "Send Password Reset Email"
                  )}
                </button>

                {/* Additional Help */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-start">
                    <span className="text-yellow-600 text-lg mr-2">💡</span>
                    <div>
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> The reset link will be valid for 1 hour. 
                        If you don't see the email, check your spam folder.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              /* Success Message */
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg 
                    className="w-10 h-10 text-green-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-green-600 mb-4">
                  Reset Email Sent!
                </h3>
                
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
                  <p className="text-green-800 mb-4">
                    We've sent a password reset link to:
                  </p>
                  <p className="text-lg font-semibold text-green-900 mb-4">
                    {formData.email}
                  </p>
                  <p className="text-sm text-green-700">
                    Please check your inbox and follow the instructions to reset your password.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/auth"
                    className="px-6 py-3 bg-gradient-to-r from-[#1089d3] to-[#12b1d1] text-white rounded-2xl hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    Back to Login
                  </Link>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all"
                  >
                    Resend Email
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="text-center mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center justify-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Secure password reset
            </div>
            <div className="flex items-center justify-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Instant email delivery
            </div>
            <div className="flex items-center justify-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              24/7 support available
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;