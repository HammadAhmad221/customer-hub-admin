import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl max-h-2xl bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <img src="/Logo.svg" alt="Logo" className="h-16" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-2">
          Welcome back!
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Log in to your Strapi account
        </p>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="your-email@example.com"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3/4 transform -translate-y-2/4 text-gray-500 hover:text-gray-700"
            >
              {passwordVisible ? "🙈" : "👁️"}
            </button>
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-gray-700">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-sm text-red-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
            onClick={()=>navigate('/dashboard')}
          >
            Log in
          </button>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account?
              <a href="/register" className="text-blue-500 hover:underline">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
