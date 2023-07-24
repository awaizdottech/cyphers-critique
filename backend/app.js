import express from "express";
//import mongoose, { Collection } from 'mongoose'
import mongoose from "mongoose";
import admin from "./models/admin.js";
import student from "./models/student.js";
import stuDetails from "./controllers/rollno.js";
// import resultGenerator from "./controllers/resultGenerator.js";
import csvWriter from "./controllers/csvWriter.js";
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
import morgan from "morgan";
import { log } from "console";
import cors from 'cors'

//initialising server using express
const app = express();
app.listen(4000);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin:['https://cyphers-critique.onrender.com']
}))

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
  let found = false;
  admin
    .find()
    .then((result) => {
      result.forEach((element) => {
        if (
          element.email == req.body.email &&
          element.password == req.body.password
        ) found=true;
      });
      found?res.json('successful'):res.json("unsuccessful");
    })
    .catch((err) => {
      res.json(err.message);
    });
});

app.get("/admin-list",(req,res)=>{
  console.log('called');
  admin
    .find()
    .then((result) => {
      res.json(result)
      console.log(result);
    })
    .catch((err) => {
      res.json(err.message);
    });
})

app.post("/add-admin", (req, res) => {
  //checking if admin already exists
  console.log('called');
  admin
    .findOne({ email: req.body.email })
    .then((result) => {
      // result ? res.json("already exists") : null;
      if (!result) {
        const newAdmin = new admin(req.body);
        newAdmin
          .save()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err.message, req.body);
            res.json(err.message);
          });
      } else {
        res.json("already exists");
      }
    })
    .catch((err) => {
      res.json(err.message);
    });
});

app.delete("/delete-admin", (req, res) => {
  
  admin
    .deleteOne({ email: req.body.email })
    .then((result) => res.json(result))
    .catch((err) => res.json(err.message));
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

let studentDetails, currentSem;
let oddSems = { 1: 1, 2: 3, 3: 5, 4: 7 };
let evenSems = { 1: 2, 2: 4, 3: 6, 4: 8 };

app.get("/even-sem-subjects", (req, res) => {
  currentSem = {...evenSems};
  res.json('sem configurated')
});
app.get("/odd-sem-subjects", (req, res) => {
  currentSem = {...oddSems};
  res.json('sem configurated')
});

let lecturerSubjectAarray=[]
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
        const newStudent = new student(req.body);
        newStudent
          .save()
          .then((result) => {
            studentDetails = stuDetails(req.body.email.slice(0, 12));
            select[studentDetails.collection]
              .find({ "subjects.yr": studentDetails.yr })
              .then((result) => {
                result.forEach((lecturer_object) => {
                  lecturer_object.subjects.forEach((sub) => {
                    //change even to odd for odd semester subjects
                    let sem = currentSem[studentDetails.yr];
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
                res.json("u r in");
              });
          })
          .catch((err) => console.log(err.message));
      }
    })
    .catch((err) => {
      res.json(err.message);
    });
});

app.get("/lecture-subjects",(req,res)=>res.json(lecturerSubjectAarray))

app.post("/feedback-submit", (req, res) => {
  //[{Subject: "subject", Feedback: []}]
  console.log(studentDetails);
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
  const lecturers = await select[`${dept}Lecturers`].find();
  // res.json(lecturers);
  await csvWriter(dept, lecturers);
  res.sendFile(path.resolve(`./Result.csv`));
});

app.delete("/delete-all", async (req, res) => {
  const deleted = [];
  function pushToDeleted(...params) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < params.length; i++) {
        deleted.push(params[i]);
      }
      resolve();
    });
  }
  try {
    const result1 = await itLecturers.deleteMany({});
    const result2 = await aidsLecturers.deleteMany({});
    const result3 = await aimlLecturers.deleteMany({});
    const result4 = await civilLecturers.deleteMany({});
    const result5 = await cseLecturers.deleteMany({});
    const result6 = await eceLecturers.deleteMany({});
    const result7 = await eeeLecturers.deleteMany({});
    const result8 = await mechLecturers.deleteMany({});
    const result9 = await prodLecturers.deleteMany({});
    const result10 = await student.deleteMany({});

    pushToDeleted(
      result1,
      result2,
      result3,
      result4,
      result5,
      result6,
      result7,
      result8,
      result9,
      result10
    ).then(() => res.json("all deleted successfully"));
  } catch (err) {
    res.json(err.message);
  }
});
