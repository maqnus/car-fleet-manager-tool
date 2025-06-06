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
      return result.data.sort((a, b) => a.id - b.id);
    },
  });
}
