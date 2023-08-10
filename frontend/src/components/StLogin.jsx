import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StLogin() {
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  return (
    <div className="Login">
      <div className="content">
        <h1>CYPHER'S CRITIQUE</h1>
        <h3>Student Feedback form</h3>
        <form
          action=""
          onSubmit={(e) => {
            console.log(email);
            e.preventDefault();
            const emailSend = {
              email: email,
            };
            axios
              .get(
                "https://cypher-backend.onrender.com/even-sem-subjects",
                emailSend
              )
              .then((res) => console.log(res))
              .catch((e) => console.log(e));
            axios
              .post(
                "https://cypher-backend.onrender.com/student-login-submit",
                emailSend
              )
              .then((res) => {
                console.log(res);
                if (res.data === "u r in") {
                  nav("/form");
                  console.log(res);
                } else if (res.data === null) {
                  alert("please login with mj college id");
                } else {
                  alert("Already logged in once");
                }
              })
              .catch((e) => console.log(e));

            // axios.get('/even-sem-subjects', emailSend).then((res) => console.log(res)).catch(e => console.log(e))
            // axios.post('/student-login-submit', emailSend).then((res) => console.log(res)).catch(e => console.log(e))
          }}
        >
          <label htmlFor="text">Enter your email ID</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <div className="btns">
            <button type="submit">Submit</button>
            <button className="btn" onClick={() => nav("/admin-login")}>
              Admin Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StLogin;
