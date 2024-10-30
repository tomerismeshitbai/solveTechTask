import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../Detail.css';


interface Character {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  height: Yup.string().required('Height is required'),
  mass: Yup.string().required('Mass is required'),
  birth_year: Yup.string().required('Birth Year is required'),
});

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);

  const { register, handleSubmit, setValue } = useForm<Character>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setCharacter(data);
        setValue('name', data.name);
        setValue('height', data.height);
        setValue('mass', data.mass);
        setValue('birth_year', data.birth_year);
      });
  }, [id, setValue]);

  const onSubmit = (data: Character) => {
    console.log('Updated Character:', data);
    navigate('/characters');
  };

  if (!character) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Character: {character.name}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input type="text" {...register('name')} />
        </div>
        <div>
          <label>Height</label>
          <input type="text" {...register('height')} />
        </div>
        <div>
          <label>Mass</label>
          <input type="text" {...register('mass')} />
        </div>
        <div>
          <label>Birth Year</label>
          <input type="text" {...register('birth_year')} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CharacterDetail;
