"use client"
import Link from "next/link";
import '../../../web/css/style.css';
import axios from 'axios';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const login = async (event) => {
        event.preventDefault();
        console.log(username, password);
        try {
            const response = await axios.post('http://localhost:5555/admin', {
                username: username,
                password: password,
            });
            console.log(response.data.msg);
            toast.success(response?.data?.msg || "Succesfully login")
            //localStorage.setItem("reg", regiNumber);

            router.push('/admin/');
        } catch (error) {
            toast.error(error.response?.data.msg || error.message || "Internel Server error")
            console.log('Error: ' + (error.response?.data.msg || error.message));
        }
    };

    return (
        <>
            <h1>Hall Seat Management System</h1>
            <div className="w3l-login-form">
                <h2>Admin Login</h2>
                <form onSubmit={login}>
                    <div className="w3l-form-group">
                        <label>Admin Username:</label>
                        <div className="group">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                required
                                onChange={(e) => setUsername(e.target.value)}
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
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
}
