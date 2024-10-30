import React, { useEffect, useState } from 'react';
import './Table.css';

interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
}

const PlanetsPage: React.FC = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets/')
      .then((response) => response.json())
      .then((data) => setPlanets(data.results));
  }, []);

  return (
    <div>
      <h2>Planets</h2>
      <table className="galaxy-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Climate</th>
            <th>Terrain</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet, index) => (
            <tr key={index}>
              <td>{planet.name}</td>
              <td>{planet.climate}</td>
              <td>{planet.terrain}</td>
              <td>{planet.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanetsPage;
