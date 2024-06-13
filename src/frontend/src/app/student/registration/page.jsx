"use client"
import Link from "next/link";
//import { useRouter } from "next/router"; 
import '../../../web/css/style.css';
import axios from 'axios';
import { useState } from "react";
import { useRouter } from 'next/navigation';



export default function Page() {
    const [firstname, setFirstname] = useState('');

    const [lastname, setLastname] = useState('');
    const [regi_number, setRegi_number] = useState(''); // Update this line
    const [departmant_name, setDepartmant_name] = useState('');
    const [session, setSession] = useState(''); 
    const [study_year, setStudy_year] = useState(''); 
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    
    const router = useRouter(); // Initialize router
    //const navigate = useNavigate()

    const register = async (event) => {
        event.preventDefault();
        console.log(firstname, lastname, regi_number, departmant_name, session, study_year, email, mobile, password); // Update this line
        try {
            const response = await axios.post('http://localhost:5555/register', {
                firstname,
                lastname,
                regi_number, // Update this line
                departmant_name,
                session,
                study_year,
                email,
                mobile,
                password,
            });
            console.log(response.data.msg);
            router.push('/student/'); // Navigate to login page
            //navigate('/student/login')
            //redirectToLoginPage();
        } catch (error) {
            console.log('Error: ' + (error.response?.data.msg || error.message));
        }
    };

    const redirectToLoginPage = () => {
        window.location.href = "/student/";
    };

    return (
        <>
            <h1>Hall Seat Management System</h1>
            <div className="w3l-login-form">
                <h2>Sign Up Here</h2>
                <form onSubmit={register}>
                    <div className="w3l-form-group">
                        <label>Student Registration No :</label>
                        <div className="group">
                            <i className="fas fa-id-badge"></i>
                            <input
                                type="text"
                                className="form-control"
                                name="registration_no"
                                placeholder="Registration No"
                                required
                                onChange={(e) => setRegi_number(e.target.value)} // Update this line
                            />
                        </div>
                    </div>
                    <div className="w3l-form-group">
                        <label>First Name :</label>
                        <div className="group">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                className="form-control"
                                name="student_fname"
                                placeholder="First Name"
                                required
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w3l-form-group">
                        <label>Last Name :</label>
                        <div className="group">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                className="form-control"
                                name="student_lname"
                                placeholder="Last Name"
                                required
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w3l-form-group">
                        <label>Department Name :</label>
                        <div className="group">
                            <i className="fas fa-graduation-cap"></i>
                            <input
                                type="text"
                                className="form-control"
                                name="department"
                                placeholder="Department"
                                required
                                onChange={(e) => setDepartmant_name(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w3l-form-group">
                        <label>Session :</label>
                        <div className="group">
                            <i className="fas fa-graduation-cap"></i>
                            <input
                                type="text"
                                className="form-control"
                                name="session"
                                placeholder="Session"
                                required
                                onChange={(e) => setSession(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w3l-form-group">
                        <label>Year of Study :</label>
                        <div className="group">
                            <i className="fas fa-calendar"></i>
                            <input
                                type="text"
                                className="form-control"
                                name="year_of_study"
                                placeholder="Year of Study"
                                required
                                onChange={(e) => setStudy_year(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w3l-form-group">
                        <label>Email :</label>
                        <div className="group">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w3l-form-group">
                        <label>Mobile No :</label>
                        <div className="group">
                            <i className="fas fa-phone"></i>
                            <input
                                type="tel"
                                className="form-control"
                                name="mobile_no"
                                placeholder="Mobile No"
                                required
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w3l-form-group">
                        <label>Password:</label>
                        <div className="group">
                            <i className="fas fa-unlock"></i>
                            <input
                                type="password"
                                className="form-control"
                                name="pwd"
                                placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w3l-form-group">
                        <label>Confirm Password:</label>
                        <div className="group">
                            <i className="fas fa-unlock"></i>
                            <input
                                type="password"
                                className="form-control"
                                name="confirmpwd"
                                placeholder="Confirm Password"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                <p className="w3l-register-p">Already a member?<Link href="/student/login" className="register"> Login</Link></p>
            </div> 
        </>
    );
}
