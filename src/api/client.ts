import 'dotenv/config';

import { Car } from '@/lib/types';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const fetchCars = async (): Promise<{
  data: Car[];
  metadata?: Record<string, string | number | boolean>;
}> => {
  const response = await fetch('https://api.politiet.no/case/politibiler');
  const { data: cars = [], metadata } = await response.json();
  if (!cars.length) throw new Error('No cars found');
  return { data: cars, metadata };
};

export function useCars(id: number): UseQueryResult<Car, Error>;
export function useCars(): UseQueryResult<Car[], Error>;
export function useCars(id?: number) {
  return useQuery({
    queryKey: id ? ['cars', id] : ['cars'],
    queryFn: fetchCars,
    select: (result) => {
      if (id) {
        const car = result.data.find((car) => car.id == id);
        if (!car) throw new Error('Requested car not found');
        return car;
      }
      return result.data;
    },
  });
}

export function useCarImage(car?: Car): UseQueryResult<string, Error> {
  const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
  if (!apiKey) {
    throw new Error('RAPIDAPI_KEY is not set in the environment variables');
  }
  return useQuery({
    queryKey: ['carImage', car?.modell],
    queryFn: async () => {
      if (!car) throw new Error('Car is required to fetch image');
      if (!car.modell || !car.merke || !car.årsmodell) {
        throw new Error(
          'Car model, make, and year are required to fetch image',
        );
      }
      const response = await fetch(
        `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=${car.modell}&make=${car.merke}&year=${car.årsmodell}`,
        {
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
          },
        },
      );

      console.log('Response from car image API:', response);

      if (!response.ok) throw new Error('Image not found');
      return response.url;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
