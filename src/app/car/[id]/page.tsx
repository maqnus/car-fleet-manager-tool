'use client'

import { useCars } from "@/api/client";
import { Spinner, Paragraph, Heading } from "@digdir/designsystemet-react";
import { useState, useEffect } from "react";

export default function CarDetailsView() {
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const carId = Number(window.location.pathname.split('/').pop());
      setId(carId);
    }
  }, []);

  const { data, isLoading, isSuccess } = useCars(id || undefined);

  if (id === null) {
    return <Spinner data-size="lg" aria-label="Laster biler..." />;
  }

  if (isLoading) {
    return <Spinner data-size="lg" aria-label="Laster biler..." />;
  }
  if (!isSuccess || !data || !data.data || data.data.length === 0) {
    return <Paragraph>No details found.</Paragraph>;
  }

  console.log('Car details data:', data);

  return (
    <div>
      <Heading level={3}>{data.car.regNr} - {data.car.status}</Heading>
      <Paragraph>{data.car.merke} {data.car.modell} ({data.car.årsmodell})</Paragraph>
    </div>
  );
}
