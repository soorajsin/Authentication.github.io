import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./mix.css";

const Login = () => {
  const [inpVal, setInpVal] = useState({
    email: "",
    password: "",
  });


  const history=useNavigate();

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

  const loginUser = async (e) => {
    e.preventDefault();

    const { email, password } = inpVal;

    if (email === "") {
      alert("Email id is required");
    } else if (!email.includes("@")) {
      alert("Invalid Email");
    } else if (password === "") {
      alert("Password field cannot be empty.");
    } else if (password.length < 6) {
      alert(`Minimum length of the Password should be 6 characters`);
    } else {
      //console.log("login successfully...");

      const data = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();

      //console.log(res.status);

      if (res.status === 201) {
        //         alert("login Successfully....");
        localStorage.setItem("userdatatoen", res.result.token);
        history("/dash");
        setInpVal({ ...inpVal, email: "", password: "" });
      }
    }
  };
  return (
    <>
      <div className="container">
        <h1>Welcome to Login...</h1>
        <br />
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
          <button onClick={loginUser}>Login</button>
        </div>
        <div className="form">
          <p>
            Your Already Account? <NavLink to={"/"}>Sign Up</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
