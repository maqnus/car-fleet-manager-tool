import { Car } from "@/lib/types";
import { Card, CardProps, Heading, List, Paragraph } from "@digdir/designsystemet-react";

type CarListProps = {
  cars: Car[];
}

export function CarList({ cars }: CarListProps) {
  return (
    <div>
      <Heading level={2}>Car List</Heading>
      <Paragraph>List of cars with their details.</Paragraph>
      <Paragraph>Total cars: {cars.length}</Paragraph>
      <Paragraph>Sorted by ID.</Paragraph>
      <Paragraph>Click on a car to view more details.</Paragraph>
      <List.Unordered style={{ listStyleType: 'none', padding: 0 }}>
        {cars
          .sort((a, b) => a.id - b.id)
          .map((car) => {
            return (
              <List.Item key={car.id}>
                <Card data-variant='tinted' data-color='brand3' asChild>
                  <a href={`/car/${car.id}`}>
                    <Heading level={3}>{car.regNr} - {car.status}</Heading>
                    <Paragraph>{car.merke} {car.modell} ({car.årsmodell})</Paragraph>
                  </a>
                  {/* <p>Oppdrag: {car.oppdrag}</p> */}
                </Card>
              </List.Item>
            );
          })
        }
      </List.Unordered>
    </div>
  );
}

function getColorFromStatus(status: string): CardProps['data-color'] {
  switch (status) {
    case 'In use':
      return 'brand1';
    case 'Available':
      return 'brand2';
    case 'Maintenance':
      return 'brand3';
    case 'Out of service':
      return 'accent';
    default:
      return 'neutral';
  }
}
