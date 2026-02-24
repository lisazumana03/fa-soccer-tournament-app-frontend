import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './components/common/Home.jsx';
import CurrenciesPage from "./components/misc/CurrenciesPage.jsx";

// Imports for authentication features
import LoginPage from "./components/authentication/LoginPage.jsx";
import RegisterPage from "./components/authentication/RegisterPage.jsx";

// Imports for association features
import AssociationPage from "./components/association/Association/AssociationPage.jsx";
import AssociationDetails from "./components/association/Association/AssociationDetails.jsx";

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

          // Authentication routes
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          // Association routes
          <Route path="/association" element={<AssociationPage />} />
          <Route path="/association/:associationId" element={<AssociationDetails />} />
          // Tournament Routes
          // Season routes
          // Match routes
          // Team Routes
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

