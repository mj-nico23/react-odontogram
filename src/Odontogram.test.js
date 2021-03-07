import React from 'react';
import { render } from '@testing-library/react';
import Odontogram from './Odontogram';

test('renders learn react link', () => {
  const { getByText } = render(<Odontogram />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
