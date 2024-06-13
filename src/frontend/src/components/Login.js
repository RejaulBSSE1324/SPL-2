"use client";

import Link from "next/link";
import '../../../web/css/style.css';
import axios from 'axios';
import { useState } from "react";

export default function Login() {
    const [regiNumber, setRegiNumber] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const login = async (event) => {
        event.preventDefault();
        console.log(regiNumber, password);
        try {
            const response = await axios.post('http://localhost:5555/login', {
                regi_number: regiNumber,
                password
            });
            setMessage('Login successful');
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.msg || error.message));
        }
    }

    return (
        <>
            <h1>Hall Seat Management System</h1>
            <div className="w3l-login-form">
                <h2>Login Here</h2>
                <form onSubmit={login}>
                    <div className="w3l-form-group">
                        <label>Student Registration No :</label>
                        <div className="group">
                            <i className="fas fa-id-badge"></i>
                            <input type="text" className="form-control" name="registration_no" placeholder="Registration No" required="required" onChange={(e) => setRegiNumber(e.target.value)} />
                        </div>
                    </div>
                    <div className="w3l-form-group">
                        <label>Password:</label>
                        <div className="group">
                            <i className="fas fa-unlock"></i>
                            <input type="password" className="form-control" name="pwd" placeholder="Password" required="required" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p className="w3l-register-p">Not a member?<Link href="/student/register" className="register"> Register</Link></p>
                {message && <p>{message}</p>}
            </div>
        </>
    );
}
