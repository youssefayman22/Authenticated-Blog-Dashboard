import { screen } from '@testing-library/react';
import { renderWithMockStore, createMockAuthState } from '../../mocks/mockStore';
import NavBar from './NavBar';

test('renders dashboard links when authenticated', () => {
  const state = createMockAuthState({
    isAuthenticated: true,
    email: 'user@example.com',
    signedUpEmails: ['user@example.com'],
  });

  renderWithMockStore(<NavBar />, state);

  expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
});
