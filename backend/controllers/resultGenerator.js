import fs from "fs";
function csvWriter(LecturerArr, dept) {
  return new Promise((resolve, reject) => {
    const xResult = fs.createWriteStream(`./results/${dept}Result.csv`, {
      flags: "a",
    });
    
    xResult.on("finish", () => {
        console.log('finished');
        resolve(true)});
    try {
      let [firstyr, secondyr, thirdyr, fourthyr] = [
        [[], []],
        [[], []],
        [[], []],
        [[], []],
      ];
      let copy;
      LecturerArr.forEach((lecturerObj) => {
        lecturerObj.subjects.forEach((subjectObj) => {
          if (subjectObj.yr == 1 && subjectObj.section == "A") {
            copy = { ...subjectObj };
            copy["lecturer"] = lecturerObj.lecturer;
            firstyr[0].push(copy);
          } else if (subjectObj.yr == 1 && subjectObj.section == "B") {
            copy = { ...subjectObj };
            copy["lecturer"] = lecturerObj.lecturer;
            firstyr[1].push(copy);
          }
          if (subjectObj.yr == 2 && subjectObj.section == "A") {
            copy = { ...subjectObj };
            copy["lecturer"] = lecturerObj.lecturer;
            secondyr[0].push(copy);
          } else if (subjectObj.yr == 2 && subjectObj.section == "B") {
            copy = { ...subjectObj };
            copy["lecturer"] = lecturerObj.lecturer;
            secondyr[1].push(copy);
          }
          if (subjectObj.yr == 3 && subjectObj.section == "A") {
            copy = { ...subjectObj };
            copy["lecturer"] = lecturerObj.lecturer;
            thirdyr[0].push(copy);
          } else if (subjectObj.yr == 3 && subjectObj.section == "B") {
            copy = { ...subjectObj };
            copy["lecturer"] = lecturerObj.lecturer;
            thirdyr[1].push(copy);
          }
          if (subjectObj.yr == 4 && subjectObj.section == "A") {
            copy = { ...subjectObj };
            copy["lecturer"] = lecturerObj.lecturer;
            fourthyr[0].push(copy);
          } else if (subjectObj.yr == 4 && subjectObj.section == "B") {
            copy = { ...subjectObj };
            copy["lecturer"] = lecturerObj.lecturer;
            fourthyr[1].push(copy);
          }

          let demo = {
            subject: "operations research",
            yr: 2,
            section: "B",
            sem: 4,
            lecturer: "",
            feedback: [1, 2, 3, 4, 5, 4, 3, 2, 1, 2],
          };
        });
      });
      firstyr.forEach((sectionSubjectsArr) => {
        sectionSubjectsArr.forEach((subjectObj) => {
          subjectObj.feedback.forEach((b) => {
            xResult.write("\n" + subjectObj.yr + ",");
            xResult.write(subjectObj.sem + ",");
            xResult.write(subjectObj.section + ",");
            xResult.write(subjectObj.lecturer + ",");
            xResult.write(subjectObj.subject + ",");
            for (let i = 0; i < b.length; i++) xResult.write(b[i] + ",");
          });
        });
      });
      secondyr.forEach((sectionSubjectsArr) => {
        sectionSubjectsArr.forEach((subjectObj) => {
          subjectObj.feedback.forEach((b) => {
            xResult.write("\n" + subjectObj.yr + ",");
            xResult.write(subjectObj.sem + ",");
            xResult.write(subjectObj.section + ",");
            xResult.write(subjectObj.lecturer + ",");
            xResult.write(subjectObj.subject + ",");
            for (let i = 0; i < b.length; i++) xResult.write(b[i] + ",");
          });
        });
      });
      thirdyr.forEach((sectionSubjectsArr) => {
        sectionSubjectsArr.forEach((subjectObj) => {
          subjectObj.feedback.forEach((b) => {
            xResult.write("\n" + subjectObj.yr + ",");
            xResult.write(subjectObj.sem + ",");
            xResult.write(subjectObj.section + ",");
            xResult.write(subjectObj.lecturer + ",");
            xResult.write(subjectObj.subject + ",");
            for (let i = 0; i < b.length; i++) xResult.write(b[i] + ",");
          });
        });
      });
      fourthyr.forEach((sectionSubjectsArr) => {
        sectionSubjectsArr.forEach((subjectObj) => {
          subjectObj.feedback.forEach((b) => {
            xResult.write("\n" + subjectObj.yr + ",");
            xResult.write(subjectObj.sem + ",");
            xResult.write(subjectObj.section + ",");
            xResult.write(subjectObj.lecturer + ",");
            xResult.write(subjectObj.subject + ",");
            for (let i = 0; i < b.length; i++) xResult.write(b[i] + ",");
          });
        });
      });
      xResult.end()
    } catch (error) {
      console.error(error);
      reject(false);
    }
  });
}
let arr = [
  {
    lecturer: "g prasanna kumar sir",
    subjects: [
      {
        subject: "operations research",
        yr: 2,
        section: "B",
        sem: 4,
        feedback: [
          [1, 2, 3, 4, 5, 4, 1, 2, 1, 2],
          [1, 2, 3, 5, 5, 4, 3, 2, 2, 2],
        ],
      },
    ],
    __v: 0,
  },
  {
    lecturer: "pal sir",
    subjects: [{ subject: "dc", yr: 2, section: "B", sem: 3, feedback: [] }],
    __v: 0,
  },
  {
    lecturer: "wajid sir",
    subjects: [
      {
        subject: "comp",
        yr: 2,
        section: "A",
        sem: 3,
        feedback: [[1, 2, 3, 4, 5, 4, 3, 2, 1, 2]],
      },
    ],
    __v: 0,
  },
  {
    lecturer: "sucharita mam",
    subjects: [{ subject: "ss", yr: 2, section: "B", sem: 4, feedback: [] }],
    __v: 0,
  },
  {
    lecturer: "azhar sir",
    subjects: [
      {
        subject: "at",
        yr: 3,
        section: "B",
        sem: 5,
        feedback: [
          [1, 2, 3, 4, 5, 4, 3, 2, 1, 2],
          [1, 2, 5, 4, 5, 4, 1, 2, 1, 2],
          [1, 2, 3, 1, 5, 4, 3, 5, 1, 2],
        ],
      },
    ],
    __v: 0,
  },
];
// csvWriter(arr,'it')
export default csvWriter;
