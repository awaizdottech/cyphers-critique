import express from "express";
//import mongoose, { Collection } from 'mongoose'
import mongoose from "mongoose";
import admin from "./models/admin.js";
import student from "./models/student.js";
import stuDetails from "./controllers/rollno.js";
import resultGenerator from "./controllers/resultGenerator.js";
import csvWriter from "./controllers/new.js";
import itLecturers from "./models/itLecturers.js";
import aidsLecturers from "./models/aidsLecturers.js";
import aimlLecturers from "./models/aimlLecturers.js";
import civilLecturers from "./models/civilLecturers.js";
import cseLecturers from "./models/cseLecturers.js";
import eceLecturers from "./models/eceLecturers.js";
import eeeLecturers from "./models/eeeLecturers.js";
import mechLecturers from "./models/mechLecturers.js";
import prodLecturers from "./models/prodLecturers.js";
import path from "path";

//initialising server using express
const app = express();
app.listen(4000);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//connecting to database
const dburi =
  "mongodb+srv://AWAIZ:ALPHA25742@data.o7tmfv0.mongodb.net/data?retryWrites=true&w=majority";
mongoose.connect(dburi).then((x) => {
  console.log("connected to db");
});

//collection selection object
let select = {
  itLecturers,
  aidsLecturers,
  aimlLecturers,
  civilLecturers,
  cseLecturers,
  eceLecturers,
  eeeLecturers,
  mechLecturers,
  prodLecturers,
};

// requesting forms
app.get("/data-entry-form", (req, res) => {
  res.render("data-entry-form");
});
app.get("/student-login-form", (req, res) => {
  res.render("student-login-form");
});
app.get("/admin-login-form", (req, res) => {
  res.render("admin-login-form");
});
app.get("/feedback-form", (req, res) => {
  res.render("feedback-form");
});

// sending form submits
app.post("/admin-login-submit", (req, res) => {
  //adding new admin
  // const newAdmin = new admin(req.body)
  // newAdmin.save().then(result=>{
  //     // res.redirect('/data-entry-form')
  //     res.send(result)
  // })
  // .catch(err=>{
  //     console.log(err.message,req.body)
  // })
  console.log(req.body);

  admin
    .find({
      email: `${req.body.email}`,
      password: `${req.body.password}`,
    })
    .then((result) => {
      if (result.length == 0) {
        res.json("not found");
      } else res.json("authorised admin");
    })
    .catch((err) => {
      res.json(err.message);
    });
});

app.post("/data-entry-submit", (req, res) => {
  const data = new select[`${req.body.branch}Lecturers`](req.body.obj);
  data
    .save()
    .then((result) => {
      res.json("successful");
    })
    .catch((err) => {
      res.json(err.message);
    });
});

let studentDetails;

app.post("/student-login-submit", (req, res) => {
  //checking and saving id if student is new
  student
    .find({
      email: `${req.body.email}`,
    })
    .then((result) => {
      if (!result.length == 0) {
        //no access page
        res.json("already logged in");
      } else {
        let oddSems = { 1: 1, 2: 3, 3: 5, 4: 7 };
        let evenSems = { 1: 2, 2: 4, 3: 6, 4: 8 };
        const newStudent = new student(req.body);
        newStudent
          .save()
          .then((result) => {
            studentDetails = stuDetails(req.body.email.slice(0, 12));
            let lecturerSubjectAarray = [];
            select[studentDetails.collection]
              .find({ "subjects.yr": studentDetails.yr })
              .then((result) => {
                result.forEach((lecturer_object) => {
                  lecturer_object.subjects.forEach((sub) => {
                    //change even to odd for odd semester subjects
                    let sem = evenSems[studentDetails.yr];
                    if (
                      sub.yr == studentDetails.yr &&
                      sub.sem == sem &&
                      sub.section == studentDetails.section
                    ) {
                      lecturerSubjectAarray.push({
                        Subject: sub.subject,
                        Lecturer: lecturer_object.lecturer,
                      });
                    }
                  });
                });
                res.json(lecturerSubjectAarray);
              });
          })
          .catch((err) => console.log(err.message));
      }
    })
    .catch((err) => {
      res.json(err.message);
    });
});

app.post("/feedback-submit", (req, res) => {
  req.body.forEach((element) => {
    select[studentDetails.collection]
      .updateOne(
        {
          "subjects.subject": element.Subject,
          "subjects.section": studentDetails.section,
        },
        { $push: { "subjects.$.feedback": element.Feedback } }
      )
      .then((result) => {
        console.log(result);
      });
  });
  res.json("successful");
});

app.get("/result", async (req, res) => {
  // let dept = req.body.dept
  let dept = "it";
  // select[`${dept}Lecturers`].find().then(result=>{
      console.log('called1');
  const lecturers = await itLecturers.find();
  // res.json(result)
  console.log('called');
  console.log(await csvWriter(lecturers, dept));
  res.sendFile(path.resolve(`./results/${dept}Result.csv`));
});
