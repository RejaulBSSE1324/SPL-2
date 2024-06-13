"use client"
import Link from "next/link";
import axios from 'axios';
import { useState } from "react";

export default function Page() {

    const [name, setName] = useState('');
    const [registrationNo, setRegistrationNo] = useState('');
    const [session, setSession] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const submitContactForm = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5555/contact', {
                name,
                registrationNo,
                session,
                subject,
                message,
            });
            console.log(response.data.msg);
        } catch (error) {
            console.log('Error: ' + (error.response?.data.msg || error.message));
        }
    };

    return(<>
        <section class="contact py-5">
        <div class="container bg-slate-50 p-5 rounded-lg">
            <h2 class="heading text-capitalize mb-sm-5 mb-4"> Contact Us </h2>
                <div class="mail_grid_w3l">
                    <form onSubmit={submitContactForm}>
                        <div class="row">
                            <div class="col-md-6 contact_left_grid" data-aos="fade-right">
                               
                                <div class="contact-fields-w3ls">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Name"
                                        required
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                               
                                <div class="contact-fields-w3ls">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="registration_no"
                                        placeholder="Registration No"
                                        required
                                        onChange={(e) => setRegistrationNo(e.target.value)}
                                    />
                                </div>
                                
                                
                                <div class="contact-fields-w3ls">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="session"
                                        placeholder="Session"
                                        required
                                        onChange={(e) => setSession(e.target.value)}
                                    />
                                </div>  
                                
                                <div class="contact-fields-w3ls">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="subject"
                                        placeholder="Subject"
                                        required
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div class="col-md-6 contact_left_grid" data-aos="fade-left">
                                <div class="contact-fields-w3ls">
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        placeholder="Message"
                                        required
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                                <input type="submit" value="Submit" name="submit"/>
                            </div>
                        </div>
                    </form>
                </div>
        </div>
    </section>
    </>)
}