import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const {userLogin , googleSignIn } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate form
    validateForm({ ...formData, [name]: value });
  };

  const validateForm = (data) => {
    const isValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
      data.password.length >= 6;
    setIsFormValid(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = formData.email
    const password = formData.password
    // console.log(email, password);
    userLogin(email, password)
    .then(() => {
      toast.success('Login Successfull!')
      navigate(location.state || "/")
    })
    .catch(err => toast.error(err))
  };
  //google signin
  const handleGoogleSignIn = () =>{
    googleSignIn() 
    .then(() =>
      toast.success("Login successfully!")
    
    )
    .catch((err) => toast.error(err))
    navigate(location.state || "/")
  }

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPasswordValid = formData.password.length >= 6;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full flex flex-col-reverse lg:flex-row items-center gap-8">
        {/* Login Form */}
        <div className="w-full lg:w-1/2">
          <div className="relative bg-gradient-to-t from-[#f1f1f1] to-[#f4f7fb] rounded-[40px] p-2 border-4 border-white shadow-2xl shadow-blue-300/50 m-5 animate-border-glow">
            <div className="relative bg-gradient-to-t from-[#f1f1f1] to-[#f4f7fb] rounded-[36px] p-6">
              <h2 className="text-center font-extrabold text-3xl text-[#1089d3] mb-2">
                Welcome Back
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Sign in to your account
              </p>

              <form className="mt-5" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="mb-4">
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
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

                {/* Password Field */}
                <div className="mb-2">
                  <input
                    required
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full bg-white border-2 border-transparent py-4 px-5 rounded-2xl shadow-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                  {formData.password && (
                    <div
                      className={`text-xs mt-1 ml-2 ${
                        isPasswordValid ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {isPasswordValid
                        ? "✓ Password meets requirements"
                        : "✗ Password must be at least 6 characters"}
                    </div>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="flex justify-between items-center mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/auth/forgot"
                    className="text-sm text-[#0099ff] hover:text-blue-700 transition-colors hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full font-bold py-4 mt-2 rounded-2xl shadow-xl border-none transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                    isFormValid
                      ? "bg-gradient-to-r from-[#1089d3] to-[#12b1d1] text-white hover:shadow-2xl cursor-pointer"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                >
                  {isFormValid ? "Sign In" : "Please enter valid credentials"}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <div className="px-3 text-sm text-gray-500">Or continue with</div>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Social Login */}
              <div className="flex justify-center">
                <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-3 bg-white text-gray-700 w-full py-4 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
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
                  Sign in with Google
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/auth/register"
                    className="text-[#1089d3] hover:text-blue-700 font-semibold hover:underline transition-colors"
                  >
                    Sign up now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="w-full lg:w-1/2">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center lg:text-left">
              Welcome Back!
            </h1>

            {formData.email && (
              <div className="mb-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-400 text-center lg:text-left">
                <p className="text-blue-700">
                  <strong>Signed in as:</strong> {formData.email}
                </p>
              </div>
            )}

            <div className="space-y-4 text-gray-600">
              <p className="text-lg leading-relaxed text-center lg:text-left">
                We're glad to see you again! Sign in to access your account and continue from where you left off.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center lg:text-left">
                  What you can do:
                </h3>
                <ul className="space-y-3 text-blue-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Manage your services and bookings
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Connect with service providers
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Track your appointments
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Access exclusive features
                  </li>
                </ul>
              </div>

              {/* Quick Tips */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="flex items-start">
                  <span className="text-yellow-600 text-lg mr-2">💡</span>
                  <div>
                    <p className="text-sm text-yellow-800">
                      <strong>Tip:</strong> Use the same email you used during registration. 
                      If you forgot your password, click "Forgot Password" to reset it.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Login Status */}
            {isFormValid && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-pulse">
                <div className="flex items-center text-green-700">
                  <span className="text-lg mr-2">✓</span>
                  <span className="font-semibold">
                    Credentials validated! Ready to sign in.
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

export default Login;