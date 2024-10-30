import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Table.css';

interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  url: string; 
}

const PlanetsPage: React.FC = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data.results);
        setTotalPages(Math.ceil(data.count / 10)); 
      });
  }, [currentPage]);

  const handleRowClick = (planet: Planet) => {
    navigate(`/planets/${planet.url.split('/')[5]}`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

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
          {planets.map((planet) => (
            <tr key={planet.name} onClick={() => handleRowClick(planet)}>
              <td>{planet.name}</td>
              <td>{planet.climate}</td>
              <td>{planet.terrain}</td>
              <td>{planet.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PlanetsPage;
