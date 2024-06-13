"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../web_profile/css/style.css";
import { useRouter } from "next/navigation";

function App() {
  const [student, setStudent] = useState({
    firstname: "",
    lastname: "",
    regi_number: "",
    departmant_name: "",
    session: "",
    study_year: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("reg");
        if (!token) {
          console.error("No token found");
          return;
        }

        const reg = localStorage.getItem("reg");

        const response = await axios.get(
          `http://localhost:5555/student/profile/${reg}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudent(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <div className="main">
      <div id="wrapper" className="bg-gray-500">
        <div
          id="steps"
          style={{ margin: "0 auto" }}
          className="agileits w3_steps"
        >
          <form
            id="formElem"
            name="formElem"
            action="#"
            method="post"
            className="w3_form w3l_form_fancy"
          >
            <fieldset className="step agileinfo w3ls_fancy_step">
              <legend>Personal Info</legend>
              <div className="abt-agile">
                <div className="abt-agile-left"></div>
                <div className="abt-agile-right">
                  <h3>
                    {student.firstname} {student.lastname}
                  </h3>
                  <h5>Student</h5>
                  <ul className="address">
                    <li>
                      <ul className="address-text">
                        <li>
                          <b>Registration No </b>
                        </li>
                        <li>: {student.regi_number}</li>
                      </ul>
                    </li>
                    <li>
                      <ul className="address-text">
                        <li>
                          <b>DEPT </b>
                        </li>
                        <li>: {student.departmant_name}</li>
                      </ul>
                    </li>
                    <li>
                      <ul className="address-text">
                        <li>
                          <b>Session </b>
                        </li>
                        <li>: {student.session}</li>
                      </ul>
                    </li>
                    <li>
                      <ul className="address-text">
                        <li>
                          <b>YEAR OF STUDY </b>
                        </li>
                        <li>: {student.study_year}</li>
                      </ul>
                    </li>
                    <li>
                      <ul className="address-text">
                        <li>
                          <b>PHONE </b>
                        </li>
                        <li>: {student.mobile}</li>
                      </ul>
                    </li>
                    <li>
                      <ul className="address-text">
                        <li>
                          <b>Email </b>
                        </li>
                        <li>: {student.email}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="clear"></div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

export const Logout = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        localStorage.clear("reg");
        router.push("/login/student");
      }}
      className="h-2/3 flex-1 bg-red-500 text-white rounded-sm flex items-center justify-center"
    >
      Logout
    </button>
  );
};
