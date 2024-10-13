import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { fetchIndividual } from '../api/api';


const FetchIndv = () => {
  const { id } = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchIndividual(id),
  });

  //conditional rendering based on loading as well as error;
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error : {error.message}</p>;

  return (
    <ul className='flex flex-col gap-5'>
      <li>ID : {data.id}</li>
      <li className='font-bold text-3xl'>Title : {data.title}</li>
      <li>Body : {data.body}</li>
      <NavLink to={"/rq"}><button className='border border-gray-800 rounded-xl px-5'>Go Back</button></NavLink>
    </ul>
  )
}

export default FetchIndv;