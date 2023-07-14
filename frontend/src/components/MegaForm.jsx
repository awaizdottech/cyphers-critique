import React, { useEffect, useState } from "react";
import StudentForm from "./StudentForm";
import { StudentContextC } from "../contexts/StudentContext";
import axios from "axios";

function MegaForm() {
  const { student, setStudent } = StudentContextC();

  const [index, setIndex] = useState(
    Number(localStorage.getItem("index")) || 0
  );

  const next = (e, val) => {
    e.preventDefault();
    if (index === newForm.length - 1) {
      return;
    }
    setIndex((index) => index + 1);
  };
  const back = (e) => {
    e.preventDefault();
    if (index === 0) {
      return;
    }
    setIndex((index) => index - 1);
  };


  const [newForm, setForm] = useState([{}]);



  const [last, setlast] = useState(index === newForm.length - 1);

  const sendform = async(e) => {
    e.preventDefault();
    console.log({student})
    // window.location.href = "http://localhost:3000/result";
    localStorage.clear();
    // axios
    //   .post("/feedback-submit", student)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
      try {
        const sendData = [];
        newForm.forEach((element, index) => {  
          const obj = {}
          obj.Lecturer = element.Lecturer
          obj.Subject = element.Subject
          obj.Feedback = student[index]
          sendData.push(obj)

        });
        const response = await fetch('/feedback-submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        });
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.log('Error: ', error);
      }
    console.log("nhi mlm hora");
  };


  const fetchLectureSubjects = async () => {
    try {
      const response = await fetch('/lecture-subjects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add any additional request body parameters if required
      });

      if (response.ok) {
        const data = await response.json();
        setForm(data);
        console.log(data); // Process the data as needed
      } else {
        console.log('Failed to fetch lecture subjects');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };



  useEffect(() => {
    setlast(index === newForm.length - 1);
    fetchLectureSubjects()
  }, [index]);

  return (
    <div className="MegaForm">
      <form className="forms">
        <StudentForm
          subject={newForm[index].Subject}
          teacher={newForm[index].Lecturer}
          index={index}
          islast={last}
        />
        <div className="btns">
          {index !== newForm.length - 1 && (
            <button onClick={(e) => next(e, newForm)}>Next</button>
          )}
          <br />
          {index !== 0 && <button onClick={(e) => back(e)}>Back</button>}
          {index === newForm.length - 1 && (
            <button type="submit" onClick={(e) => sendform(e)}>
              submit form
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
export default MegaForm;