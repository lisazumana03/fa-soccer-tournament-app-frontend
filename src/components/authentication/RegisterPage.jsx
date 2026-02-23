import { useEffect, useState } from 'react';
import './RegisterPage.css';

export default function RegisterPage() {
    return (
        <div className="register-page">
            <h1>Register for GoalGrid</h1>
            <form className="register-form">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Register</button>
                <p>Already have an account? <a href="/login">Login here</a></p>
            </form>
        </div>
    )
}