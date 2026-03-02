import { useState } from 'react';
import './RegisterPage.css';

export default function RegisterPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const getStrength = (value) => {
        let score = 0;

        if (value.length >= 8) score += 1;
        if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
        if (/\d/.test(value)) score += 1;
        if (/[^A-Za-z\d]/.test(value)) score += 1;

        const labels = ['Weak', 'Fair', 'Good', 'Strong'];
        const colors = ['weak', 'fair', 'good', 'strong'];
        const index = Math.max(0, score - 1);

        return {
            score,
            label: score === 0 ? 'Too short' : labels[index],
            tone: score === 0 ? 'weak' : colors[index],
            percent: Math.min(100, (score / 4) * 100),
        };
    };

    const strength = getStrength(password);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match.');
            return;
        }
        setPasswordError('');
    };

    return (
        <div className="register-page">
            <h1>Register for GoalGrid</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                {password.length > 0 && (
                    <div className="strength-meter" role="status" aria-live="polite">
                        <div className="strength-track">
                            <div
                                className={`strength-bar ${strength.tone}`}
                                style={{ width: `${strength.percent}%` }}
                            />
                        </div>
                        <span className="strength-label">Strength: {strength.label}</span>
                    </div>
                )}
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(event) => {
                        setConfirmPassword(event.target.value);
                        if (passwordError) {
                            setPasswordError('');
                        }
                    }}
                    required
                />
                {passwordError && (
                    <p className="password-error" role="alert">{passwordError}</p>
                )}
                <button type="submit">Register</button>
                <p>Already have an account? <a href="/login">Login here</a></p>
            </form>
        </div>
    )
}