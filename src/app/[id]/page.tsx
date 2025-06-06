'use client';

import { use, useState } from 'react'; // Import React's `use` function
import { useCars } from '@/api/client';
import {
  Spinner,
  Paragraph,
  Heading,
  Breadcrumbs,
  Dialog,
  Alert,
  Button,
} from '@digdir/designsystemet-react';
import { getStatusLabel } from '@/components/car/CarFilter';

export default function CarDetailsView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Unwrap the `params` Promise
  const carId = Number(id); // Convert the ID to a number
  const { data, isLoading, isError } = useCars(carId);
  const [open, setOpen] = useState(false);

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
            <Breadcrumbs.Link>{data.regNr ?? 'N/A'}</Breadcrumbs.Link>
          </Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs>
      <Heading level={3}>
        {data.merke} {data.modell} ({data.årsmodell})
      </Heading>
      <Paragraph>{data.status ?? 'N/A'}</Paragraph>
      <Paragraph>Oppdrag: {'oppdrag' in data ? data.oppdrag : 'N/A'}</Paragraph>

      {data.status == getStatusLabel('available') && (
        <Button variant='primary' onClick={() => setOpen(true)}>
          Sett på hendelse
        </Button>
      )}
      {data.status == getStatusLabel('underMaintenance') && (
        <Button variant='secondary' onClick={() => setOpen(true)}>
          Avslutt vedlikehold
        </Button>
      )}
      {(data.status == getStatusLabel('enRouteToEvent') ||
        data.status == getStatusLabel('onMission')) && (
        <Button variant='tertiary' onClick={() => setOpen(true)}>
          Avbryt aksjon
        </Button>
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Alert data-color='warning'>
          <Heading
            level={2}
            data-size='xs'
            style={{
              marginBottom: 'var(--ds-size-2)',
            }}
          >
            Er du sikker på at du vil endre status?
          </Heading>
          <Paragraph>
            Vi klarer ikke å hente informasjonen du ser etter akkurat nå. Prøv
            igjen litt senere. Hvis vi fortsatt ikke klarer å vise informasjonen
            du trenger, tar du kontakt med kundeservice på telefon 85 44 32 66.
          </Paragraph>
        </Alert>
      </Dialog>
    </div>
  );
}
