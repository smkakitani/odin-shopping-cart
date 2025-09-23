import { describe, it, expect } from "vitest";
import { getByRole, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavBar from "../src/components/NavBar";
// import { MemoryRouter, Route, Routes } from "react-router";
import { createMemoryRouter, Router, RouterProvider } from "react-router";

import routes from "../src/app/routes";


describe('NavBar component', () => {
  it('renders navbar correctly', () => {
    const router = createMemoryRouter(routes/* , { initialEntries: ["/"] } */);

    render(<RouterProvider router={router}/>);

    expect(screen.getByRole('navigation'));
  });

  it('renders 3 links of navbar', () => {
    const router = createMemoryRouter(routes);
    
    render(<RouterProvider router={router}/>);

    expect(screen.getAllByRole('link')).toHaveLength(3);
  });
});

