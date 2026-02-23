import { useEffect, useState } from 'react';
import './Home.css';

const statsData = [
	{ label: 'Active Leagues', value: 12 },
	{ label: 'Registered Teams', value: 48 },
	{ label: 'Players', value: 1200 },
	{ label: 'Matches Scheduled', value: 320 },
];

const menuItems = [
	{
		title: 'Season Management',
		description: 'Manage seasons, schedules, and league settings.',
		icon: '🏆',
		link: '/season-menu',
	},
	{
		title: 'Tournaments',
		description: 'Create and manage tournaments.',
		icon: '🎫',
		link: '/tournament-menu',
	},
	{
		title: 'Teams',
		description: 'View and manage teams.',
		icon: '👥',
		link: '/team-menu',
	},
	{
		title: 'National Pool',
		description: 'Manage national player pool.',
		icon: '🌍',
		link: '/national-pool',
	},
	{
		title: 'Review Center',
		description: 'Review tournament and league events.',
		icon: '📝',
		link: '/review',
	},
	{
		title: 'Football Court System',
		description: 'Manage court and venue details.',
		icon: '🏟️',
		link: '/court',
	},
	{
		title: 'Export Center',
		description: 'Export tournament and league data.',
		icon: '📤',
		link: '/export',
	},
	{
		title: 'Players',
		description: 'View and manage player profiles.',
		icon: '⚽',
		link: '/players',
	},
	{
		title: 'Matches',
		description: 'Schedule and review matches.',
		icon: '📅',
		link: '/matches',
	},
	{
		title: 'Associations',
		description: 'Manage football associations.',
		icon: '🏛️',
		link: '/associations',
	},
	{
		title: 'Venues',
		description: 'Manage stadiums and venues.',
		icon: '🏟️',
		link: '/venues',
	},
];

const activityFeed = [
	{
		icon: '⚽',
		title: 'Match Scheduled: Team A vs Team B',
		time: '2 hours ago',
		badge: 'Match',
	},
	{
		icon: '🏆',
		title: 'Tournament Created: Spring Cup',
		time: 'Yesterday',
		badge: 'Tournament',
	},
	{
		icon: '👥',
		title: 'New Team Registered: Blue Eagles',
		time: '3 days ago',
		badge: 'Team',
	},
	{
		icon: '📤',
		title: 'Data Exported: Player Stats',
		time: 'Last week',
		badge: 'Export',
	},
];

const Home = () => {
	const [year, setYear] = useState(new Date().getFullYear());

	useEffect(() => {
		setYear(new Date().getFullYear());
	}, []);

	return (
		<div className="home-page">
			{/* Hero Section */}
			<section className="hero">
				<div className="hero-content">
					<h1>⚽ GoalGrid</h1>
					<p>Professional Tournament & League Management System</p>
					<div className="season-badge">🏆 Season 2025/26 Active</div>
				</div>
			</section>

			<main>
				{/* Quick Stats Dashboard */}
				<section className="stats-dashboard">
					{statsData.map((stat, idx) => (
						<div className="stat-card" key={idx}>
							<div className="value">{stat.value}</div>
							<div className="label">{stat.label}</div>
						</div>
					))}
				</section>

				{/* Main Navigation */}
				<h2 className="section-title">Main Menu</h2>
				<section className="nav-grid">
					{menuItems.map((item, idx) => (
						<div
							className="nav-card"
							key={idx}
							onClick={() => window.location.href = item.link}
						>
							<div className="nav-card-header">
								<span className="nav-card-icon">{item.icon}</span>
								<div className="nav-card-title">{item.title}</div>
							</div>
							<div className="nav-card-body">
								<div className="nav-card-description">{item.description}</div>
								<a className="nav-card-link" href={item.link}>Go</a>
							</div>
						</div>
					))}
				</section>

				{/* Recent Activity */}
				<h2 className="section-title">Recent Activity</h2>
				<section className="activity-feed">
					{activityFeed.map((activity, idx) => (
						<div className="activity-item" key={idx}>
							<div className="activity-icon">{activity.icon}</div>
							<div className="activity-content">
								<div className="activity-title">{activity.title}</div>
								<div className="activity-time">{activity.time}</div>
							</div>
							<div className="activity-badge">{activity.badge}</div>
						</div>
					))}
				</section>
			</main>

			{/* Footer */}
			<footer className="app-footer">
				<p>© 1994/95–{year} GoalGrid</p>
				<p>Simulation environment for football governance & scheduling</p>
			</footer>
		</div>
	);
};

export default Home;
