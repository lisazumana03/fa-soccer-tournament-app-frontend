import Header from './Header.jsx';
import './About.css';

export default function About() {
    return (
        <>
            <Header />
            <div className="about-page">
                <h1>About GoalGrid</h1>
                <p>GoalGrid is a comprehensive soccer tournament management application designed to streamline the organization and administration of soccer tournaments. Whether you're a league organizer, team manager, or player, GoalGrid provides the tools you need to manage your soccer events efficiently.</p>
                <h2>Key Features</h2>
                <ul>
                    <li><strong>Team Management:</strong> Create and manage teams, assign players, and track team performance throughout the tournament.</li>
                    <li><strong>Match Scheduling:</strong> Schedule matches, manage venues, and keep track of match results and statistics.</li>
                    <li><strong>Player Profiles:</strong> Create detailed player profiles, including stats, performance history, and contact information.</li>
                    <li><strong>Association Management:</strong> Manage football associations, including member teams, tournaments, and events.</li>
                    <li><strong>Stadium Management:</strong> Manage stadiums and venues, including scheduling and availability.</li>
                    <li><strong>Authentication:</strong> Secure login and registration for users, with role-based access control for different user types.</li>
                </ul>
                <h2>Our Mission</h2>
                <p>Our mission is to provide a user-friendly and efficient platform for managing soccer tournaments, helping organizers save time and resources while enhancing the experience for teams and players. We are committed to continuous improvement and welcome feedback from our users to make GoalGrid the best it can be.</p>
            </div>
        </>
    )
}