'use client';

import { useCars } from '@/api/client';
import { CarFilter } from '@/components/car/CarFilter';
import { CarList } from '@/components/car/CarList';
import { Heading, Paragraph, Spinner } from '@digdir/designsystemet-react';
import { HGrid, HStack, Page, VStack } from '@navikt/ds-react';
// TODO: Add Persisted state management for query data
// import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
// import { useState, useEffect } from 'react';

export default function FleetView() {
  // const [persister, setPersister] = useState<ReturnType<
  //   typeof createSyncStoragePersister
  // > | null>(null);

  const { data, isSuccess, isPending } = useCars();

  // useEffect(() => {
  //   // Initialize the persister only on the client side
  //   const syncStoragePersister = createSyncStoragePersister({
  //     storage: window.localStorage,
  //   });
  //   setPersister(syncStoragePersister);
  // }, []);

  // if (!persister) {
  //   // Optionally, render a loading state while the persister is being initialized
  //   return <p>Loading...</p>;
  // }

  if (isPending) {
    return <Spinner data-size='lg' aria-label='Laster biler...' />;
  }
  if (!isSuccess || !data || data.length === 0) {
    return <Paragraph>No cars found.</Paragraph>;
  }
  return (
    <Page>
      <VStack gap='4'>
        <Page.Block as='header' width='lg' gutters>
          <Heading
            level={1}
            data-size='xl'
            style={{
              marginBottom: '0',
            }}
          >
            🚗 Bilflåte
          </Heading>
          <Paragraph>
            Her kan du se en oversikt over alle politibiler, deres status og
            annen relevant informasjon.
          </Paragraph>
        </Page.Block>
        <Page.Block as='main' width='lg' gutters>
          <HStack gap='0'>
            <CarFilter />
            <HGrid>
              <HStack gap='4'>
                <CarList cars={data} />
              </HStack>
            </HGrid>
          </HStack>
        </Page.Block>
      </VStack>
    </Page>
  );
}
