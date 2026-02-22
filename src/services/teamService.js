const API_URL = 'http://localhost:2932/api/team';

const teamService = {
	async getAllTeams() {
		const res = await fetch(`${API_URL}/get-all`);
		if (!res.ok) throw new Error('Failed to fetch teams');
		return await res.json();
	},
	async createTeam(team) {
		const res = await fetch(`${API_URL}/create`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(team),
		});
		if (!res.ok) throw new Error('Failed to create team');
		return await res.json();
	},
	async updateTeam(id, team) {
		const res = await fetch(`${API_URL}/update/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(team),
		});
		if (!res.ok) throw new Error('Failed to update team');
		return await res.json();
	},
	async deleteTeam(id) {
		const res = await fetch(`${API_URL}/delete/${id}`, {
			method: 'DELETE',
		});
		if (!res.ok) throw new Error('Failed to delete team');
		return true;
	},
	async getTeam(id) {
		const res = await fetch(`${API_URL}/${id}`);
		if (!res.ok) throw new Error('Failed to fetch team');
		return await res.json();
	},
};

export default teamService;
