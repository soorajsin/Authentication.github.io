import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Dashboard = () => {


  const history=useNavigate();





  //1
  const DashboardValid = async () => {
    let token = localStorage.getItem("userdatatoen");
    //console.log("get token access for dashboard....      " + token);

    const res = await fetch("http://localhost:4000/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    // console.log(data);

    if (data.status === 401 || !data) {
      // console.log("error page redirect");
      history("*");
    } else {
      console.log("User Verify");
      history("/dash")
    }
  };

  //2
  useEffect(() => {
    DashboardValid();
  }, []);

  return (
    <>
      <div className="dash">
        <h1>Dashboard</h1>
        <br />
        <div className="form">Email:soorajsingh7505@gmail.com</div>
      </div>
    </>
  );
};

export default Dashboard;
