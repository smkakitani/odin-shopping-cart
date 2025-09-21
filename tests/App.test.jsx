import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from "react-router";

import App from '../src/app/App';
import routes from "../src/app/routes";

describe('App', () => {
  it('renders App', () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });

    render(<RouterProvider router={router}/>);

    expect(screen.getByRole('heading', { name: /my shopping cart/i}));
  });

  it('renders main content correctly', () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });

    render(<RouterProvider router={router}/>);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});