import React, { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    // calling  authentication function here
    const { name, email, photoURL, password } = formData;

    // Firebase Auth - Only email & password
    createUser(email, password)
      .then((result) => {
        console.log("Firebase user created:", result.user);
        const createdAt = result?.user?.metadata?.creationTime;

        // Prepare MongoDB user object
        const newUser = {
          name,
          email,
          photoURL,
          createdAt,
        };

        // Send user to MongoDB
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                title: "Success!",
                text: "Registration Successful",
                icon: "success",
                confirmButtonText: "OK",
              }).then(() => {
                window.location.href = "/SignIn";
              });
            }
          });
      })
      .catch((error) => {
        console.error("Firebase Error:", error);
      });

    // Optional: Clear form fields
    e.target.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2A2438] px-4">
      <div className="w-full max-w-md bg-[#352F44] p-8 rounded-2xl shadow-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#DBD8E3]">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label text-[#DBD8E3]">Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="input input-bordered w-full bg-[#5C5470] text-white placeholder-gray-300"
              onChange={handleChange}
            />
          </div>
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
            <label className="label text-[#DBD8E3]">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="Profile picture URL"
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
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[#DBD8E3]">
          Already have an account?{" "}
          <a href="/signIn" className="underline hover:text-white">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
