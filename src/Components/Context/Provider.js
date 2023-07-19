import { useEffect, useState } from "react";
import axios from "axios";
import Context from "../Context/Context";

export default function Provider(props) {
  let studentsInitialValue = {
    name: "",
    email: "",
    phoneno: "",
    department: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    id: "",
    teacher: "",
  };
  let teachersInitialValue = {
    name: "",
    email: "",
    phoneno: "",
    department: "",
    salary: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    id: "",
  };
  const [studentData, setStudentData] = useState(studentsInitialValue);
  const [newStudentData, setnewStudentData] = useState(studentsInitialValue);
  const [createstudent, setcreatestudent] = useState("");
  const [teacherData, setteacherData] = useState(studentsInitialValue);
  const [newteacherData, setnewteacherData] = useState(studentsInitialValue);
  const [createteacher, setcreateteacher] = useState("");

 

  const getstudentData = () => {
    axios
      .get("https://649c087004807571923757eb.mockapi.io/Users")
      .then((res) => {
        if (res.status === 200) {
          setStudentData(res.data);
        }
      });
  };

  useEffect(() => {
    getstudentData();
  }, []);

  
  const handleDeleteStudent = (id) => {
    axios
      .delete("https://649c087004807571923757eb.mockapi.io/Users/" + id)
      .then((res) => {
        getstudentData();
      });
  };

  const createStudent = (id) => {
    if (id) {
      axios
        .put(
          "https://649c087004807571923757eb.mockapi.io/Users/" + id,
          newStudentData
        )
        .then((res) => {
          if (res.status === 200) {
            console.log(newStudentData);
            setnewStudentData(studentsInitialValue);
          }
          getstudentData();
        });
    } else {
      axios
        .post(
          "https://649c087004807571923757eb.mockapi.io/Users",
          newStudentData
        )
        .then((res) => {
          if (res.status === 200) {
            setnewStudentData(studentsInitialValue);
          }
          getstudentData();
        });
    }
  };

  const getstudentById = (id) => {
    let index = studentData.findIndex((value) => value.id === id);
    setnewStudentData(studentData[index]);
  };


  const getteacherData = () => {
    axios
      .get("https://649c087004807571923757eb.mockapi.io/Users")
      .then((res) => {
        if (res.status === 200) {
          setteacherData(res.data);
        }
      });
  };

  useEffect(() => {
    getteacherData();
  }, []);


  const handleDeleteteacher = (id) => {
    axios
      .delete("https://649c087004807571923757eb.mockapi.io/Users/" + id)
      .then((res) => {
        getteacherData();
      });
  };

  
  const createTeacher = (id) => {
    if (id) {
      axios
        .put(
          "https://649c087004807571923757eb.mockapi.io/Users/" + id,
          newteacherData
        )
        .then((res) => {
          if (res.status === 200) {
            setnewteacherData(teachersInitialValue);
          }
          getteacherData();
        });
    } else {
      axios
        .post(
          "https://649c087004807571923757eb.mockapi.io/Users",
          newteacherData
        )
        .then((res) => {
          if (res.status === 200) {
            setnewteacherData(teachersInitialValue);
          }
          getteacherData();
        });
    }
  };
  const getteacherById = (id) => {
    let index = teacherData.findIndex((value) => value.id === id);
    setnewteacherData(teacherData[index]);
  };

  return (
    <Context.Provider
      value={{
        studentsInitialValue,
        teachersInitialValue,
        newStudentData,
        setnewStudentData,
        studentData,
        setStudentData,
        createStudent,
        getstudentById,
        handleDeleteStudent,
        createstudent,
        setcreatestudent,
        createteacher,
        setcreateteacher,
        newteacherData,
        setnewteacherData,
        teacherData,
        setteacherData,
        getteacherById,
        createTeacher,
        handleDeleteteacher,
        getteacherData,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
