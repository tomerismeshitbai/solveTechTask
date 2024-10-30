import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Login from './components/login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/navbar/Navbar';
import CharactersPage from './components/characters/CharactersPage';
import CharacterDetail from './components/characters/CharacterDetail';
import PlanetsPage from './components/planets/PlanetsPage';
import StarshipsPage from './components/starships/StarshipsPage';
import PlanetDetail from './components/planets/PlanetDetail';
import StarshipDetail from './components/starships/StarshipDetail';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/characters" /> : <Login />} />
      <Route path="/login" element={<Login />} />
        <Route
          path="/characters"
          element={
            <ProtectedRoute>
              <CharactersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/characters/:id"
          element={
            <ProtectedRoute>
              <CharacterDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/planets"
          element={
            <ProtectedRoute>
              <PlanetsPage />
            </ProtectedRoute>
          }
        />
            <Route
          path="/planets/:id"
          element={
            <ProtectedRoute>
              <PlanetDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/starships"
          element={
            <ProtectedRoute>
              <StarshipsPage />
            </ProtectedRoute>
          }
        />
          <Route
          path="/starships/:id"
          element={
            <ProtectedRoute>
              <StarshipDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
