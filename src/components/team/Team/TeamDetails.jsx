
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import teamService from '../../../services/teamService';

export default function TeamDetails() {
    const { id } = useParams();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        teamService.getTeam(id)
            .then(data => {
                setTeam(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load team');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!team) return <div>Team not found.</div>;

    return (
        <div>
            <h1>Team Details</h1>
            <div style={{ marginBottom: 24 }}>
                <strong>Name:</strong> {team.teamName}<br />
                <strong>Coach:</strong> {team.coach || 'N/A'}<br />
                <strong>Formation Year:</strong> {team.teamFormationYear || 'N/A'}<br />
                <strong>Location:</strong> {team.teamLocation ? `${team.teamLocation.city}, ${team.teamLocation.country}` : 'N/A'}<br />
                <strong>Home Ground:</strong> {team.teamHomeGround ? team.teamHomeGround.venueName : 'N/A'}<br />
                <strong>Type:</strong> {team.teamType || 'N/A'}<br />
                <strong>Value:</strong> {team.teamValue || 'N/A'}<br />
                <strong>Group:</strong> {team.groupName || 'N/A'}<br />
                <strong>Owner:</strong> {team.owner ? team.owner.ownerName : 'N/A'}<br />
            </div>
            <div>
                <h2>Stats</h2>
                <ul>
                    <li>Games Played: {team.gamesPlayed}</li>
                    <li>Wins: {team.wins}</li>
                    <li>Draws: {team.draws}</li>
                    <li>Losses: {team.losses}</li>
                    <li>Goals For: {team.goalsFor}</li>
                    <li>Goals Against: {team.goalsAgainst}</li>
                    <li>Goal Difference: {team.goalsFor - team.goalsAgainst}</li>
                    <li>Points: {team.points}</li>
                </ul>
            </div>
            {/* Optionally: show players, recent matches, fixtures, etc. */}
        </div>
    );
}