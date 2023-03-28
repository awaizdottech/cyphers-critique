import { createObjectCsvWriter } from "csv-writer";

function csvWriter(LecturerArr, dept) {
  return new Promise((resolve, reject) => {
    const csvWriter = createObjectCsvWriter({
      path: `./results/${dept}Result.csv`,
      header: [
        { id: "yr", title: "Year" },
        { id: "sem", title: "Semester" },
        { id: "section", title: "Section" },
        { id: "lecturer", title: "Lecturer" },
        { id: "subject", title: "Subject" },
        { id: "feedback1", title: "Feedback 1" },
        { id: "feedback2", title: "Feedback 2" },
        { id: "feedback3", title: "Feedback 3" },
        { id: "feedback4", title: "Feedback 4" },
        { id: "feedback5", title: "Feedback 5" },
        { id: "feedback6", title: "Feedback 6" },
        { id: "feedback7", title: "Feedback 7" },
        { id: "feedback8", title: "Feedback 8" },
        { id: "feedback9", title: "Feedback 9" },
        { id: "feedback10", title: "Feedback 10" },
      ],
      append: true,
    });

    try {
      let data = [];
      LecturerArr.forEach((lecturerObj) => {
        lecturerObj.subjects.forEach((subjectObj) => {
          let copy = { ...subjectObj };
          copy["lecturer"] = lecturerObj.lecturer;
          data.push(copy);
        });
      });
      csvWriter
        .writeRecords(data)
        .then(() => {
          console.log("finished");
          resolve(true);
        })
        .catch((error) => {
          console.error(error);
          reject(false);
        });
    } catch (error) {
      console.error(error);
      reject(false);
    }
  });
}

export default csvWriter;
