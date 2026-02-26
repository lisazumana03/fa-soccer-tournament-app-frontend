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
                    <div className="nav-dropdown">
                        <Link to="/players" className="nav-link">Players</Link>
                        <div className="dropdown-menu">
                            <Link to="/players" className="dropdown-link">View Players</Link>
                            <Link to="/create-player" className="dropdown-link">Create Player</Link>
                            <Link to="/player-management" className="dropdown-link">Player Management</Link>
                        </div>
                    </div>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                    <Link to="/login" className="nav-link auth-link login-link">Login</Link>
                    <Link to="/register" className="nav-link auth-link register-link">Register</Link>
                </nav>
            </div>
        </header>
    );
}
