import React, { useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const SignIn = () => {
  const { signInUser, setFirebaseUser, loading } = useContext(AuthContext);
  const [error, setError] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const friendlyErrors = {
    "auth/invalid-credential": "Invalid-Credential.",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Destructure formData values
    const { email, password } = formData;

    // Calling sign in function here
    //console.log("Signing in with", email, password);
    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        setFirebaseUser(user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((err) => {
        setError({
          ...error,
          login: friendlyErrors[err.code] || "Login failed.",
        });
      });

    // clear fields after sign in
    e.target.reset();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2A2438]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2A2438] px-4">
      <div className="w-full max-w-md bg-[#352F44] p-8 rounded-2xl shadow-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#DBD8E3]">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-[#DBD8E3]">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="input input-bordered w-full bg-[#5C5470] text-white placeholder-gray-300"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label text-[#DBD8E3]">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="input input-bordered w-full bg-[#5C5470] text-white placeholder-gray-300"
              onChange={handleChange}
            />
          </div>
          {error.login && (
            <p className="text-red-400 text-sm text-center">{error.login}</p>
          )}

          <button
            type="submit"
            className="btn w-full mt-4 bg-[#DBD8E3] text-[#2A2438] hover:bg-[#cfcbd8]"
          >
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[#DBD8E3]">
          New to Chill Gamer?{" "}
          <a href="/signUp" className="underline hover:text-white">
            Create an Account
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
