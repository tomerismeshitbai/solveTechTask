import React, { useEffect, useState } from 'react';
import './Table.css';

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
}

const StarshipsPage: React.FC = () => {
  const [starships, setStarships] = useState<Starship[]>([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/starships/')
      .then((response) => response.json())
      .then((data) => setStarships(data.results));
  }, []);

  return (
    <div>
      <h2>Starships</h2>
      <table className="galaxy-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Cost in Credits</th>
          </tr>
        </thead>
        <tbody>
          {starships.map((starship, index) => (
            <tr key={index}>
              <td>{starship.name}</td>
              <td>{starship.model}</td>
              <td>{starship.manufacturer}</td>
              <td>{starship.cost_in_credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StarshipsPage;
