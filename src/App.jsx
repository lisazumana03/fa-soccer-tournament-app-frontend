import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './components/common/Home.jsx';
import CurrenciesPage from "./components/misc/CurrenciesPage.jsx";

// Import for teams
import TeamDetails from "./components/team/Team/TeamDetails.jsx";
import TeamManagement from "./components/team/Team/TeamManagement.jsx";
import TeamPage from "./components/team/Team/TeamPage.jsx";

// Import for players
import PlayerDetails from "./components/team/Player/PlayerDetails.jsx";
import PlayerPage from "./components/team/Player/PlayerPage.jsx";

// Import for stadiums
import StadiumList from "./components/team/Stadium/StadiumList.jsx";
import StadiumPage from "./components/team/Stadium/StadiumPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team-management" element={<TeamManagement />} />
          <Route path="/create-team" element={<TeamPage />} />
          <Route path="/team/:teamId" element={<TeamDetails />} />

          // Player routes
          <Route path="/players" element={<PlayerPage />} />
          <Route path="/player/:playerId" element={<PlayerDetails />} /> 
          
          // Stadium links
          <Route path = "/create-stadium" element={<StadiumPage />} />
          <Route path = "/stadiums" element={<StadiumList />} />
          // Misc links
          <Route path="/currency" element={<CurrenciesPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

