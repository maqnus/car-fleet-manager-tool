import { render, screen } from '@testing-library/react';
import { CarList } from '../CarList';
import { setMockNavigation } from '@setup';
import { getStatusKeyByLabel } from '../CarFilter';
import { axe } from 'vitest-axe';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('CarList', () => {
  const MOCK_CARS = [
    {
      id: 2,
      regNr: 'XYZ789',
      status: 'I oppdrag',
      merke: 'Honda',
      modell: 'Civic',
      årsmodell: 2019,
      oppdrag: 'Delivery',
    },
    {
      id: 1,
      regNr: 'ABC123',
      status: 'Tilgjengelig',
      merke: 'Toyota',
      modell: 'Corolla',
      årsmodell: 2020,
      oppdrag: '',
    },
    {
      id: 3,
      regNr: 'DEF456',
      status: 'Under vedlikehold',
      merke: 'Ford',
      modell: 'Focus',
      årsmodell: 2018,
      oppdrag: '',
    },
  ];

  it('should render a list of cars', () => {
    const { getByText } = render(<CarList cars={MOCK_CARS} />);
    expect(getByText('1: ABC123 - Tilgjengelig')).toBeInTheDocument();
    expect(getByText('Toyota Corolla (2020)')).toBeInTheDocument();
    expect(getByText('2: XYZ789 - I oppdrag')).toBeInTheDocument();
    expect(getByText('Honda Civic (2019)')).toBeInTheDocument();
  });
  it('rendered list of cars should have no violations', async () => {
    const { container } = render(<CarList cars={MOCK_CARS} />);
    expect(
      await axe(container, {
        runOnly: ['wcag2aaa', 'wcag21a', 'wcag21aa'],
      }),
    ).toHaveNoViolations();
  });
  it('should render a message when no cars are available', () => {
    const { getByText } = render(<CarList cars={[]} />);
    expect(getByText('Ingen biler funnet')).toBeInTheDocument();
  });
  it('should render a sorted list of cars', () => {
    render(<CarList cars={MOCK_CARS} />);
    const carItems = screen.getAllByRole('listitem');
    expect(carItems).toHaveLength(3);
    expect(carItems[0]).toHaveTextContent('1: ABC123 - Tilgjengelig');
    expect(carItems[1]).toHaveTextContent('2: XYZ789 - I oppdrag');
    expect(carItems[2]).toHaveTextContent('3: DEF456 - Under vedlikehold');
  });
  it('should filter cars based on statusFilter', () => {
    const statusFilters = getStatusKeyByLabel('Tilgjengelig') ?? '';
    setMockNavigation({ statusFilters }, '/cars');

    const { getByText, queryByText } = render(<CarList cars={MOCK_CARS} />);

    expect(getByText('1: ABC123 - Tilgjengelig')).toBeInTheDocument();
    expect(getByText('Toyota Corolla (2020)')).toBeInTheDocument();
    expect(queryByText('2: XYZ789 - I oppdrag')).not.toBeInTheDocument();
    expect(queryByText('Honda Civic (2019)')).not.toBeInTheDocument();
    expect(
      queryByText('3: DEF456 - Under vedlikehold'),
    ).not.toBeInTheDocument();
  });
  it('should not render cars that do not match the filter', () => {
    const statusFilters = getStatusKeyByLabel('Tilgjengelig') ?? '';
    setMockNavigation({ statusFilters }, '/cars');

    const { getByText, queryByText } = render(<CarList cars={MOCK_CARS} />);

    expect(getByText('1: ABC123 - Tilgjengelig')).toBeInTheDocument();
    expect(queryByText('2: XYZ789 - I oppdrag')).not.toBeInTheDocument();
    expect(
      queryByText('3: DEF456 - Under vedlikehold'),
    ).not.toBeInTheDocument();
  });
});
