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
  const [newForm, setForm] = useState([]);

  const [last, setlast] = useState(index === newForm.length - 1);

  const sendform = (e) => {
    e.preventDefault();
    console.log(student)
    axios
      .post("/feedback-submit", student)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("nhi mlm hora");
  };
  

  useEffect(() => {
    setlast(index === newForm.length - 1);
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
      </form>
    </div>
  );
}
export default MegaForm;