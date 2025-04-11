import React, { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Destructure formData values
    const { email, password } = formData;

    // Call your sign in function here
    console.log("Signing in with", email, password);
    // clear fields after sign in
    e.target.reset();
  };

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
