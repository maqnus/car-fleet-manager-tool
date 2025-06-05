import { useCars } from "@/api/client";
import { CarFilter } from "./CarFilter";
import { CarList } from "./CarList";
import { Heading, Paragraph, Spinner } from "@digdir/designsystemet-react";

export function FleetView() {
  const { data, isLoading, isSuccess } = useCars();

  if (isLoading) {
    return <Spinner data-size="lg" aria-label="Laster biler..." />;
  }
  if (!isSuccess || !data || !data.data || data.data.length === 0) {
    return <Paragraph>No cars found.</Paragraph>;
  }
  return (
    <div>
      <Heading level={1}>Car Fleet</Heading>
      <CarFilter />
      <CarList cars={data?.data} />
    </div>
  );
}
