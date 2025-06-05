'use client'

import styles from "./page.module.css";
import { Button } from '@digdir/designsystemet-react';

import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FleetView } from "@/components/car/FleetView";
import { useEffect, useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})



export default function Home() {
  const [persister, setPersister] = useState<ReturnType<typeof createSyncStoragePersister> | null>(null);

  useEffect(() => {
    // Initialize the persister only on the client side
    const syncStoragePersister = createSyncStoragePersister({
      storage: window.localStorage,
    });
    setPersister(syncStoragePersister);
  }, []);

  if (!persister) {
    // Optionally, render a loading state while the persister is being initialized
    return <p>Loading...</p>;
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: persister! }}
    >
      <div className={styles.page}>
        <main className={styles.main}>
          <FleetView />
          <Button>Trykk på meg!</Button>
        </main>
        <footer>
          test footer
        </footer>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </PersistQueryClientProvider>
  );
}
