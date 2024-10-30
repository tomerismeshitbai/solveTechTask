import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../Detail.css';

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  model: Yup.string().required('Model is required'),
  manufacturer: Yup.string().required('Manufacturer is required'),
  cost_in_credits: Yup.string().required('Cost in Credits is required'),
});

const StarshipDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [starship, setStarship] = useState<Starship | null>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<Starship>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    fetch(`https://swapi.dev/api/starships/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setStarship(data);
        setValue('name', data.name);
        setValue('model', data.model);
        setValue('manufacturer', data.manufacturer);
        setValue('cost_in_credits', data.cost_in_credits);
      });
  }, [id, setValue]);

  const onSubmit = (data: Starship) => {
    console.log('Updated Starship Data:', data);
    navigate('/starships'); 
  };

  if (!starship) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Starship</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input type="text" {...register('name')} />
        </div>
        <div>
          <label>Model:</label>
          <input type="text" {...register('model')} />
        </div>
        <div>
          <label>Manufacturer:</label>
          <input type="text" {...register('manufacturer')} />
        </div>
        <div>
          <label>Cost in Credits:</label>
          <input type="text" {...register('cost_in_credits')} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default StarshipDetail;
