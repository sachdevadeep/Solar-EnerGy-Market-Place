import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thanks ${formData.name}! We received your message.`);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>Contact Support</h1>
                <p>Have questions? We're here to help.</p>
            </div>

            <div className="contact-form-wrapper">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Your Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            placeholder="How can we help you?"
                        ></textarea>
                    </div>

                    <button type="submit" className="btn-send">Send Message</button>
                </form>
            </div>
        </div>
    );
}
