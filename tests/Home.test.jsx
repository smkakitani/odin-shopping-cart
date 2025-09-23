import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import userEvent from "@testing-library/user-event";

import Home from "../src/components/Home";
import routes from "../src/app/routes";




describe("Home component", () => {
  it("renders <Home> in <main> as default", () => {
    const router = createMemoryRouter(routes, { 
      initialEntries: ["/", "/home"], 
      initialIndex: 0, 
    });

    render(<RouterProvider router={router}/>);

    const mainContent = screen.getByRole('main');
    const headingOfMain = screen.getByRole('heading', { name: /home page/i });

    expect(mainContent).toContainElement(headingOfMain);
  });

  it("renders Home on main page when user clicks 'Home' on NavBar", async () => {
    const router = createMemoryRouter(routes, { 
      initialEntries: ["/", "/home", "/store"], 
      initialIndex: 2, 
    });
    const user = userEvent.setup();

    render(<RouterProvider router={router}/>);
    // screen.debug();
    const homePage = screen.getByRole('link', { name: /home/ });

    await user.click(homePage);

    const mainContent = screen.getByRole('main');
    const headingOfMain = screen.getByRole('heading', { name: /home page/i });

    expect(mainContent).toContainElement(headingOfMain);
    // screen.debug();
  });
});