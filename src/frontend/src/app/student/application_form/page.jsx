"use client"

import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';


export default function Page() {
  const [regnumber, setRegnumber] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [session, setSession] = useState('');
  const [email, setEmail] = useState('');
  const [departmentName, setDepartmentName] = useState('');

  const apply = async (event) => {
    event.preventDefault();
    console.log(regnumber, fname, lname, fatherName, motherName, currentYear, session, email, departmentName);
    try {
      const response = await axios.post('http://localhost:5555/apply', {
        regnumber: regnumber,
        fname: fname,
        lname: lname,
        fatherName: fatherName,
        motherName: motherName,
        currentYear: currentYear,
        session: session,
        email: email,
        departmentName: departmentName,
      });
      console.log(response.data.msg);
      toast.success("Application submitted successfully")
    } catch (error) {
      toast.error(error.response?.data.msg || error.message || "Internel Server error")
      console.log('Error: ' + (error.response?.data.msg || error.message));
    }
  };

  return (
    <section className="contact py-5">
      <div className="container">
        <div className="heading text-[48px] font-bold text-capitalize mb-sm-5 mb-4 bg-green-300 p-3 w-fit">Application Form</div>
        <div className="mail_grid_w3l">
          <form onSubmit={apply}>
            <div className="row">
              <div className="col-md-6 contact_left_grid bg-slate-100 rounded-lg p-5" data-aos="fade-right" >

                <label>Student Registration No :</label>
                <div className="contact-fields-w3ls">
                  <input
                    type="text"
                    className="form-control"
                    style={{ textTransform: 'none' }}
                    name="student_registration_no"
                    placeholder="Registration No"
                    required
                    
                   
                    onChange={(e) => setRegnumber(e.target.value)}
                  />
                </div>

                <label>First Name :</label>
                <div className="contact-fields-w3ls">
                  <input
                    type="text"
                    className="form-control"
                    style={{ textTransform: 'none' }}
                    name="student_fname"
                    placeholder="First Name"
                    required
                  
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>

                <label>Last Name :</label>
                <div className="contact-fields-w3ls">
                  <input
                    type="text"
                    className="form-control"
                    style={{ textTransform: 'none' }}
                    name="student_lname"
                    placeholder="Last Name"
                    required
                  
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>

                <label>Father's Name :</label>
                <div className="contact-fields-w3ls">
                  <input
                    type="text"
                    className="form-control"
                    style={{ textTransform: 'none' }}
                    name="father_name"
                    placeholder="Father's Name"
                    required
                    
                    onChange={(e) => setFatherName(e.target.value)}
                  />
                </div>

                <label>Mother's Name :</label>
                <div className="contact-fields-w3ls">
                  <input
                    type="text"
                    className="form-control"
                    style={{ textTransform: 'none' }}
                    name="mother_name"
                    placeholder="Mother's Name"
                    required
                    
                    onChange={(e) => setMotherName(e.target.value)}
                  />
                </div>

                <label>Current Year :</label>
                <div className="contact-fields-w3ls">
                  <input
                    type="text"
                    className="form-control"
                    style={{ textTransform: 'none' }}
                    name="current_year"
                    placeholder="Current Year"
                    required
                 
                    onChange={(e) => setCurrentYear(e.target.value)}
                  />
                </div>

                <label>Session :</label>
                <div className="contact-fields-w3ls">
                  <input
                    type="text"
                    className="form-control"
                    style={{ textTransform: 'none' }}
                    name="session"
                    placeholder="Session"
                    required
          
                    onChange={(e) => setSession(e.target.value)}
                  />
                </div>

                <label>Email Id :</label>
                <div className="contact-fields-w3ls">
                  <input
                    type="email"
                    className="form-control"
                    style={{ textTransform: 'none' }}
                    name="email"
                    placeholder="abc@gmail.com"
                    required
               
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <label>Department Name :</label>
                <div className="contact-fields-w3ls">
                  <input
                    type="text"
                    className="form-control"
                    style={{ textTransform: 'none' }}
                    name="department_name"
                    placeholder="Department Name"
                    required
                
                    onChange={(e) => setDepartmentName(e.target.value)}
                  />
                </div>

                <input type="submit"  value="Click to Apply" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
