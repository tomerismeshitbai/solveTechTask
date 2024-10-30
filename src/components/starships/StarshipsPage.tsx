import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Table.css';

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  url: string; 
}

const StarshipsPage: React.FC = () => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://swapi.dev/api/starships/?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setStarships(data.results);
        setTotalPages(Math.ceil(data.count / 10)); 
      });
  }, [currentPage]);

  const handleRowClick = (starship: Starship) => {
    navigate(`/starships/${starship.url.split('/')[5]}`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

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
          {starships.map((starship) => (
            <tr key={starship.name} onClick={() => handleRowClick(starship)}>
              <td>{starship.name}</td>
              <td>{starship.model}</td>
              <td>{starship.manufacturer}</td>
              <td>{starship.cost_in_credits}</td>
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

export default StarshipsPage;
