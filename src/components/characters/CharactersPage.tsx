import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Table.css';

interface Character {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  url: string; 
}

const CharactersPage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setTotalPages(Math.ceil(data.count / 10)); 
      });
  }, [currentPage]);

  const handleRowClick = (character: Character) => {
    navigate(`/characters/${character.url.split('/')[5]}`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div>
      <h2>Characters</h2>
      <table className="galaxy-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Birth Year</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <tr key={character.name} onClick={() => handleRowClick(character)}>
              <td>{character.name}</td>
              <td>{character.height}</td>
              <td>{character.mass}</td>
              <td>{character.birth_year}</td>
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

export default CharactersPage;
