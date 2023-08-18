import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./mix.css";

const Register = () => {
  const [inpVal, setInpVal] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpVal({
      ...inpVal,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(inpVal);
  }, [inpVal]);

  const addUser = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = inpVal;

    if (name === "") {
      alert("Name is required");
    } else if (email === "") {
      alert("Email id is required");
    } else if (!email.includes("@")) {
      alert("Invalid Email");
    } else if (password === "") {
      alert("Password field cannot be empty.");
    } else if (password.length < 6) {
      alert(`Minimum length of the Password should be 6 characters`);
    } else if (cpassword === "") {
      alert("Confirm Password field cannot be empty.");
    } else if (password.length < 6) {
      alert(`Minimum length of the Confirm Password should be 6 characters`);
    } else if (password !== cpassword) {
      alert("Both passwords must match.");
    } else {
      console.log("Register successfully...");

      const data = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          cpassword,
        }),
      });

      const result = await data.json();

      console.log(result);

      if (result.status === 201) {
        alert("Registration Successfully....");
        setInpVal((inpVal) => ({
          ...inpVal,
          name: "",
          email: "",
          password: "",
          cpassword: "",
        }));
      }
    }
  };
  return (
    <>
      <div className="container">
        <h1>Register</h1>
        <br />
        <div className="form">
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            onChange={setVal}
            name="name"
            placeholder="Enter here..."
          />
        </div>
        <div className="form">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            onChange={setVal}
            name="email"
            placeholder="Enter here..."
          />
        </div>
        <div className="form">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            onChange={setVal}
            name="password"
            placeholder="Enter here..."
          />
        </div>
        <div className="form">
          <label htmlFor="cpassword">Confirm Password</label>
          <br />
          <input
            type="password"
            onChange={setVal}
            name="cpassword"
            placeholder="Enter here..."
          />
        </div>
        <div className="form">
          <button onClick={addUser}>Register</button>
        </div>
        <div className="form">
          <p>Your Already Account? <NavLink to={"/register"}>Sign In</NavLink></p>
        </div>
      </div>
    </>
  );
};

export default Register;
