import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../Detail.css';

interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  climate: Yup.string().required('Climate is required'),
  terrain: Yup.string().required('Terrain is required'),
  population: Yup.string().required('Population is required'),
});

const PlanetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [planet, setPlanet] = useState<Planet | null>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<Planet>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setPlanet(data);
        setValue('name', data.name);
        setValue('climate', data.climate);
        setValue('terrain', data.terrain);
        setValue('population', data.population);
      });
  }, [id, setValue]);

  const onSubmit = (data: Planet) => {
    console.log('Updated Planet Data:', data);
    navigate('/planets'); 
  };

  if (!planet) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Planet</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input type="text" {...register('name')} />
        </div>
        <div>
          <label>Climate:</label>
          <input type="text" {...register('climate')} />
        </div>
        <div>
          <label>Terrain:</label>
          <input type="text" {...register('terrain')} />
        </div>
        <div>
          <label>Population:</label>
          <input type="text" {...register('population')} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default PlanetDetail;
