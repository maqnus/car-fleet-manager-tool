'use client';

import { use } from 'react'; // Import React's `use` function
import { useCars } from '@/api/client';
import {
  Spinner,
  Paragraph,
  Heading,
  Breadcrumbs,
} from '@digdir/designsystemet-react';

export default function CarDetailsView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Unwrap the `params` Promise
  const carId = Number(id); // Convert the ID to a number
  const { data, isLoading, isError } = useCars(carId);

  if (isLoading) {
    return <Spinner data-size='lg' aria-label='Laster biler...' />;
  }
  if (isError) {
    console.error('Error fetching car details:', data);
    return <Paragraph>Error loading car details.</Paragraph>;
  }
  if (!data) {
    return <Paragraph>No details found.</Paragraph>;
  }

  return (
    <div>
      <Breadcrumbs aria-label='Du er her:'>
        <Breadcrumbs.Link
          aria-label='Tilbake til oversikt over bilder'
          href='/'
        >
          Oversikt over bilder
        </Breadcrumbs.Link>
        <Breadcrumbs.List>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link href='/'>Oversikt over bilder</Breadcrumbs.Link>
          </Breadcrumbs.Item>
          <Breadcrumbs.Item>
            <Breadcrumbs.Link>{data.id}</Breadcrumbs.Link>
          </Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs>
      <Heading level={3}>
        {data.merke} {data.modell} ({data.årsmodell})
      </Heading>
      <Paragraph>
        {data.regNr ?? 'N/A'} - {data.status ?? 'N/A'}
      </Paragraph>
      <Paragraph>
        More details, and options to change status, etc. will be added later.
        Oppdrag: {'oppdrag' in data ? data.oppdrag : 'N/A'}
      </Paragraph>
    </div>
  );
}
