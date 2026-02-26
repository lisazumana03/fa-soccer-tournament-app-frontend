import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './components/common/Home.jsx';
import CurrenciesPage from "./components/misc/CurrenciesPage.jsx";
import About from './components/common/About.jsx';
import Contact from './components/common/Contact.jsx';

// Imports for authentication features
import LoginPage from "./components/authentication/LoginPage.jsx";
import RegisterPage from "./components/authentication/RegisterPage.jsx";

// Imports for association features
import CreateAssociation from "./components/association/Association/CreateAssociation.jsx";
import AssociationPage from "./components/association/Association/AssociationPage.jsx";
import AssociationDetails from "./components/association/Association/AssociationDetails.jsx";

// Import for teams
import TeamDetails from "./components/team/Team/TeamDetails.jsx";
import TeamManagement from "./components/team/Team/TeamManagement.jsx";
import TeamPage from "./components/team/Team/TeamPage.jsx";

// Import for players
import PlayerDetails from "./components/team/Player/PlayerDetails.jsx";
import PlayerPage from "./components/team/Player/PlayerPage.jsx";
import CreatePlayer from "./components/team/Player/CreatePlayer.jsx";
import PlayerList from "./components/team/Player/PlayerList.jsx";

// Import for stadiums
import StadiumList from "./components/team/Stadium/StadiumList.jsx";
import StadiumPage from "./components/team/Stadium/StadiumPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          // Authentication routes
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          // Association routes
          <Route path="/association" element={<AssociationPage />} />
          <Route path="/association/:associationId" element={<AssociationDetails />} />
          <Route path="/create-association" element={<CreateAssociation />} />
          // Tournament Routes
          // Season routes
          // Match routes
          // Team Routes
          <Route path="/team-management" element={<TeamManagement />} />
          <Route path="/create-team" element={<TeamPage />} />
          <Route path="/team/:teamId" element={<TeamDetails />} />

          // Player routes
          <Route path="/players" element={<PlayerList />} />
          <Route path="/player/:playerId" element={<PlayerDetails />} /> 
          <Route path="/create-player" element={<CreatePlayer />} />
          <Route path="/player-management" element={<PlayerPage />} />

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

