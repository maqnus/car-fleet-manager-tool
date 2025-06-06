import { useCars } from '@/api/client';
import {
  Checkbox,
  Fieldset,
  useCheckboxGroup,
  ValidationMessage,
} from '@digdir/designsystemet-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';

type Choices = {
  [key: string]: {
    label: string;
  };
};

export const statuses: Choices = {
  available: {
    label: 'Tilgjengelig',
  },
  enRouteToEvent: {
    label: 'På vei til hendelse',
  },
  onMission: {
    label: 'I oppdrag',
  },
  underMaintenance: {
    label: 'Under vedlikehold',
  },
};

export function getStatusLabel(key: string): string {
  return statuses[key]?.label || 'Unknown Status';
}

export function getStatusKeyByLabel(label: string): string | undefined {
  return Object.keys(statuses).find((key) => statuses[key].label === label);
}

export function CarFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { current: filters } = useCarFilter();
  const { data, isSuccess } = useCars();

  const { getCheckboxProps, validationMessageProps } = useCheckboxGroup({
    value: filters.map((filter) => filter.value), // Default selected values
    onChange: (values) => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (values.length > 0) {
        newParams.set('statusFilters', values.join(',')); // Combine values into a single parameter
      } else {
        newParams.delete('statusFilters'); // Remove the parameter if no values are selected
      }
      router.push(`?${newParams.toString()}`);
    },
  });
  return (
    <>
      <Fieldset>
        <Fieldset.Legend>Status</Fieldset.Legend>
        {Object.entries(statuses).map(([value, { label }]) => (
          <Checkbox
            key={value}
            label={`${label} (${(isSuccess && data?.filter((car) => car.status === label).length) || 0})`}
            {...getCheckboxProps(value)}
          />
        ))}
        <ValidationMessage {...validationMessageProps} />
      </Fieldset>
    </>
  );
}

export function useCarFilter() {
  const searchParams = useSearchParams();

  const filters = useMemo(() => {
    const statusFilters = searchParams.get('statusFilters');
    return statusFilters
      ? statusFilters.split(',').map((value) => ({
          value,
          label: statuses[value]?.label || 'Unknown Status',
        }))
      : [];
  }, [searchParams]);

  return {
    current: filters,
  };
}
