import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DataEntry() {
  const nav = useNavigate();

  const goBack = () => {
    nav("/");
  };

  const [lecturer, setLecturer] = useState([]);
  const [branch, setBranch] = useState();
  const [details, setDetails] = useState([
    {
      subject: "",
      year: "",
      section: "",
      sem: "",
    },
  ]);

  const handleChange = (index, event) => {
    let data = [...details];
    data[index][event.target.name] = event.target.value;
    setDetails(data);
  };

  const addFields = () => {
    let newField = {
      subject: "",
      year: "",
      section: "",
      sem: "",
    };
    setDetails([...details, newField]);
  };
  const PostData = async (e) => {
    try {
      e.preventDefault();
      let sendDetails = {
        branch: branch,
        obj: {
          lecturer: lecturer,
          subjects: [details],
        },
      };
      const res = await fetch(
        "https://cypher-backend.onrender.com/data-entry-submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendDetails),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data) window.alert("connected to backend");
      nav("/form");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="DataEntry">
      <h2>Data Entry by Admin</h2>
      <form>
        <div>
          <div>
            <span>Branch</span>
            <span>
              <select
                name="branch"
                id=""
                value={branch}
                onChange={(event) => setBranch(event.target.value)}
              >
                <option value="aids">AIDS</option>
                <option value="aiml">AIML</option>
                <option value="civil">CIVIL</option>
                <option value="cse">CSE</option>
                <option value="ece">ECE</option>
                <option value="eee">EEE</option>
                <option value="it">IT</option>
                <option value="mech">MECH</option>
              </select>
            </span>
            <br />
            <label>Lecturer:</label>
            <input
              type="text"
              name="lecturer"
              id=""
              onChange={(e) => setLecturer(e.target.value)}
              value={lecturer}
            />
            {/* To be repeated */}

            {details.map((input, index) => {
              return (
                <div className="repeat" key={index}>
                  <label>subject1</label>
                  <input
                    type="text"
                    name="subject"
                    id=""
                    value={input.subject}
                    onChange={(event) => handleChange(index, event)}
                  />
                  <br />

                  <span>Year</span>
                  <span>
                    <select
                      name="year"
                      id=""
                      value={input.year}
                      onChange={(event) => handleChange(index, event)}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </span>
                  <br />
                  <span>Section</span>
                  <span>
                    <select
                      name="section"
                      id=""
                      value={input.section}
                      onChange={(event) => handleChange(index, event)}
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                  </span>
                  <br />
                  <span>sem</span>
                  <span>
                    <select
                      name="sem"
                      id=""
                      value={input.sem}
                      onChange={(event) => handleChange(index, event)}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <button type="button" id="plus" onClick={addFields}>
          <span className="material-symbols-outlined">add_circle</span>
        </button>
        <br />
        <div className="dataBtns">
          <button type="submit" onClick={PostData}>
            Submit
          </button>
          <button onClick={goBack}>Go Back</button>
        </div>
      </form>
    </div>
  );
}

export default DataEntry;
