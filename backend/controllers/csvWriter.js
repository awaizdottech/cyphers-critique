import { createObjectCsvWriter } from "csv-writer";
import lodash from 'lodash'

async function fun(dept, data) {
  const csvWriter = createObjectCsvWriter({
    path: './Result.csv',
    headerIdDelimiter: ".",
    header: [
      { id: "subject", title: "Subject" },
      { id: "yr", title: "Year" },
      { id: "section", title: "Section" },
      { id: "lecturer", title: "Lecturer" },
      { id: "feedback.a", title: "Subject Knowledge" },
      { id: "feedback.b", title: "Preparedness and Presentation" },
      { id: "feedback.c", title: "Uniformity of Coverage" },
      { id: "feedback.d", title: "Problem Solving" },
      { id: "feedback.e", title: "Regularity" },
      { id: "feedback.f", title: "Student Participation" },
      { id: "feedback.g", title: "Doubt Clearing" },
      { id: "feedback.h", title: "Teacher's Commitment" },
      { id: "feedback.i", title: "Evaluation Procedures" },
      { id: "feedback.j", title: "Overall Rating" },
      { id: "feedback.k", title: "Remarks" },
    ],
  });
  let fb, copy, fbObj;
  let finalJSON = [];
  let obj = { feedback: {} };

  data.map((lecturerObj) => {
    lecturerObj.subjects.map((subjectObj) => {
      while (subjectObj.feedback.length != 0) {
        fbObj = subjectObj.feedback.pop();
        console.log(fbObj);
        fb = Object.values(fbObj)
        obj["lecturer"] = lecturerObj.lecturer;
        obj["subject"] = subjectObj.subject;
        obj["yr"] = subjectObj.yr;
        obj["section"] = subjectObj.section;
        obj.feedback["a"] = fb[0];
        obj.feedback["b"] = fb[1];
        obj.feedback["c"] = fb[2];
        obj.feedback["d"] = fb[3];
        obj.feedback["e"] = fb[4];
        obj.feedback["f"] = fb[5];
        obj.feedback["g"] = fb[6];
        obj.feedback["h"] = fb[7];
        obj.feedback["i"] = fb[8];
        obj.feedback["j"] = fb[9];
        obj.feedback['k'] = fb[10]
        copy = lodash.cloneDeep(obj)
        finalJSON.push(copy);
      }
    });
  });
  // console.log(finalJSON);

  try {
    await csvWriter.writeRecords(finalJSON);
  } catch (error) {
    console.log(error);
  }
}

export default fun