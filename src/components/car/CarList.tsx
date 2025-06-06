import { Car } from '@/lib/types';
import Link from 'next/link';
import { Card, Heading, List, Paragraph } from '@digdir/designsystemet-react';
import { useMemo } from 'react';
import { useCarFilter } from './CarFilter';

type CarListProps = {
  cars: Car[];
};

export function CarList({ cars }: CarListProps) {
  const { current: filters } = useCarFilter();
  const filteredCars = useMemo(() => {
    if (!cars) return [];

    if (filters.length === 0) return cars;

    return cars.filter((car: Car) =>
      filters.some((filter) => filter.label === car['status']),
    );
  }, [cars, filters]);

  return (
    <List.Unordered style={{ listStyleType: 'none', padding: 0 }}>
      {filteredCars.map((car) => {
        return (
          <List.Item key={car.id}>
            <Card
              data-variant='tinted'
              data-color={getDataColorByStatus(car.status)}
              asChild
            >
              <Link href={`/${car.id}`}>
                <Heading level={3}>
                  {car.id}: {car.regNr} - {car.status}
                </Heading>
                <Paragraph>
                  {car.merke} {car.modell} ({car.årsmodell})
                </Paragraph>
              </Link>
            </Card>
          </List.Item>
        );
      })}
    </List.Unordered>
  );
}

function getDataColorByStatus(
  status: string | undefined,
): 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral' | undefined {
  switch (status) {
    case 'Tilgjengelig':
      return 'brand3';
    case 'På vei til hendelse':
      return 'brand2';
    case 'I oppdrag':
      return 'brand1';
    case 'Under vedlikehold':
      return 'accent';
    default:
      return 'neutral'; // Default color for unknown status
  }
}
