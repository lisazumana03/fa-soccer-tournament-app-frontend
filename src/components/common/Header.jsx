import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <header className="app-header">
            <div className="header-container">
                <div className="header-brand">
                    <Link to="/" className="brand-logo">
                        ⚽ GoalGrid
                    </Link>
                </div>
                <nav className="header-nav">
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                    <Link to="/login" className="nav-link auth-link login-link">Login</Link>
                    <Link to="/register" className="nav-link auth-link register-link">Register</Link>
                </nav>
            </div>
        </header>
    );
}
