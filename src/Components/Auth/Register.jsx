import React, { useState } from "react";
import { Link } from "react-router";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState({
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasMinLength: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check password strength when password changes
    if (name === "password") {
      checkPasswordStrength(value);
    }

    // Validate entire form
    validateForm({ ...formData, [name]: value });
  };

  const checkPasswordStrength = (password) => {
    setPasswordStrength({
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasMinLength: password.length >= 8,
    });
  };

  const validateForm = (data) => {
    const isValid =
      data.firstName.length >= 2 &&
      data.lastName.length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
      data.photoURL.length > 0 &&
      passwordStrength.hasUpper &&
      passwordStrength.hasLower &&
      passwordStrength.hasNumber &&
      passwordStrength.hasMinLength &&
      data.password === data.confirmPassword &&
      data.password.length > 0;

    setIsFormValid(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert("Registration successful! Welcome to our site.");
      // Handle registration logic here
    }
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPhotoURLValid = formData.photoURL.length > 0;
  const passwordsMatch =
    formData.password === formData.confirmPassword &&
    formData.password.length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <div className="max-w-6xl w-full flex flex-col-reverse lg:flex-row-reverse items-center gap-8">
        {/* Registration Form */}
        <div className="w-full lg:w-1/2">
          <div className="relative bg-gradient-to-t from-[#f1f1f1] to-[#f4f7fb] rounded-[40px] p-2 border-4 border-white shadow-2xl shadow-blue-300/50 m-5 animate-border-glow">
            <div className="relative bg-gradient-to-t from-[#f1f1f1] to-[#f4f7fb] rounded-[36px] p-6">
              <h2 className="text-center font-extrabold text-3xl text-[#1089d3] mb-2">
                Create Account
              </h2>

              <form className="mt-5" onSubmit={handleSubmit}>
                {/* Name Fields */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="w-full bg-white border-2 border-transparent py-4 px-5 rounded-2xl mt-3 shadow-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="w-full bg-white border-2 border-transparent py-4 px-5 rounded-2xl mt-3 shadow-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="E-mail Address"
                  className="w-full bg-white border-2 border-transparent py-4 px-5 rounded-2xl mt-4 shadow-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
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

                {/* Photo URL Field */}
                <input
                  required
                  type="url"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleInputChange}
                  placeholder="Profile Photo URL"
                  className="w-full bg-white border-2 border-transparent py-4 px-5 rounded-2xl mt-4 shadow-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                {formData.photoURL && (
                  <div
                    className={`text-xs mt-1 ml-2 ${
                      isPhotoURLValid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isPhotoURLValid
                      ? "✓ Photo URL added"
                      : "✗ Please add a photo URL"}
                  </div>
                )}

                {/* Password Fields */}
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <div className="flex-1">
                    <input
                      required
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="w-full bg-white border-2 border-transparent py-4 px-5 rounded-2xl shadow-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      required
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm Password"
                      className="w-full bg-white border-2 border-transparent py-4 px-5 rounded-2xl shadow-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3 p-3 bg-white rounded-xl shadow-md">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Password Requirements:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                      <div
                        className={`flex items-center ${
                          passwordStrength.hasUpper
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {passwordStrength.hasUpper ? "✓" : "✗"} Uppercase letter
                      </div>
                      <div
                        className={`flex items-center ${
                          passwordStrength.hasLower
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {passwordStrength.hasLower ? "✓" : "✗"} Lowercase letter
                      </div>
                      <div
                        className={`flex items-center ${
                          passwordStrength.hasNumber
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {passwordStrength.hasNumber ? "✓" : "✗"} Number
                      </div>
                      <div
                        className={`flex items-center ${
                          passwordStrength.hasMinLength
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {passwordStrength.hasMinLength ? "✓" : "✗"} 8+
                        characters
                      </div>
                    </div>
                    {formData.confirmPassword && (
                      <div
                        className={`text-xs mt-2 ${
                          passwordsMatch ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {passwordsMatch
                          ? "✓ Passwords match"
                          : "✗ Passwords do not match"}
                      </div>
                    )}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full font-bold py-4 mt-6 rounded-2xl shadow-xl border-none transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                    isFormValid
                      ? "bg-gradient-to-r from-[#1089d3] to-[#12b1d1] text-white hover:shadow-2xl cursor-pointer"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                >
                  {isFormValid
                    ? "Create Account"
                    : "Please fill all fields correctly"}
                </button>
              </form>

              <div className="mt-6">
                <span className="block text-center text-sm text-gray-500">
                  Or sign up with
                </span>
                <div className="flex justify-center mt-3">
                  <button className="flex items-center justify-center gap-2 bg-white text-gray-700 w-full py-4 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                    <svg
                      aria-label="Google logo"
                      width="20"
                      height="20"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <path d="m0 0H512V512H0" fill="#fff"></path>
                        <path
                          fill="#34a853"
                          d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                        ></path>
                        <path
                          fill="#4285f4"
                          d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                        ></path>
                        <path
                          fill="#fbbc02"
                          d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                        ></path>
                        <path
                          fill="#ea4335"
                          d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                        ></path>
                      </g>
                    </svg>
                    Sign up with Google
                  </button>
                </div>
                {/* Login Link */}
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-600">
                    Have an account?{" "}
                    <Link
                      to="/auth"
                      className="text-[#1089d3] hover:text-blue-700 font-semibold hover:underline transition-colors"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="w-full lg:w-1/2">
          <div className=" p-8 ">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center lg:text-left">
              {formData.firstName
                ? `Hello! ${formData.firstName} welcome to our site`
                : "Welcome to Our Platform!"}
            </h1>

            {formData.email && (
              <div className="mb-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400 text-center lg:text-left">
                <p className="text-blue-700">
                  <strong>Your Email:</strong> Please check your email. We'll
                  send a confirmation to <strong>{formData.email}</strong>
                </p>
              </div>
            )}

            <div className="space-y-4 text-gray-600">
              <p className="text-lg leading-relaxed text-center lg:text-left">
                {formData.firstName
                  ? `Hi ${formData.firstName}! We're excited to have you on board.`
                  : "Join our community today and experience the best services available."}
              </p>
              <p className="leading-relaxed text-center lg:text-left">
                Create your account to access exclusive features, manage your
                services, and connect with professionals worldwide.
              </p>
              <ul className="list-disc list-inside space-y-2 text-blue-600">
                <h1 className="text-xl font-bold">Our facilities</h1>
                <li>Manage your services efficiently</li>
                <li>Book appointments seamlessly</li>
                <li>Connect with trusted professionals</li>
                <li>24/7 customer support</li>
              </ul>
            </div>

            {/* Registration Status */}
            {isFormValid && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-pulse">
                <div className="flex items-center text-green-700">
                  <span className="text-lg mr-2">✓</span>
                  <span className="font-semibold">
                    All set! You're ready to register.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
