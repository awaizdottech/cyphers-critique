import React, { useContext, useState } from "react";
const StudentContext = React.createContext();

// export default StudentContext;



function StudentContextP({children}) {
  
  const [student, setStudent] = useState(JSON.parse(localStorage.getItem("feedback")) || {}
  );
  return (
    <StudentContext.Provider value={{student,setStudent}}>
      {children}
    </StudentContext.Provider>

  )
}

export default StudentContextP



function StudentContextC() {
  const {student,setStudent} = useContext(StudentContext)
  return (
    {student,setStudent}
  )
}

export {StudentContextC}