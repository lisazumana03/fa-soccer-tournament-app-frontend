import { useState } from 'react';
import './LoginPage.css';

export default function LoginPage() {
    return (
        <div className="login-page">
            <h1>Login to GoalGrid</h1>
            <form className="login-form">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Login</button>
                <p>Don't have an account? <a href="/register">Register here</a></p>
            </form>
        </div>
    )
}