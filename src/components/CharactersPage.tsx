import React, { useEffect, useState } from 'react';
import './Table.css';

interface Character {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
}

const CharactersPage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/people/')
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, []);

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
          {characters.map((character, index) => (
            <tr key={index}>
              <td>{character.name}</td>
              <td>{character.height}</td>
              <td>{character.mass}</td>
              <td>{character.birth_year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharactersPage;
