import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Login from './components/Login/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import CharactersPage from './components/CharactersPage';
import PlanetsPage from './components/PlanetsPage';
import StarshipsPage from './components/StarshipsPage';


const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/characters" /> : <Login />} />
        <Route
          path="/characters"
          element={
            <ProtectedRoute>
              <CharactersPage />
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
          path="/starships"
          element={
            <ProtectedRoute>
              <StarshipsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/characters" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
