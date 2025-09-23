import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import userEvent from "@testing-library/user-event";

import Store from "../src/components/Store";
import routes from "../src/app/routes";




describe("Store component", () => {
  it("renders Store on main page when user clicks 'Store' on NavBar", async () => {
    const router = createMemoryRouter(routes, { 
      initialEntries: ["/", "/store"], 
      initialIndex: 0,    
    });
    const user = userEvent.setup();

    render(<RouterProvider router={router}/>);

    const linkStore = screen.getByRole('link', { name: /store/i });

    await user.click(linkStore);

    const mainContent = screen.getByRole('main');
    const headingStore = screen.getByRole('heading', { name: /store page/i });

    expect(mainContent).toContainElement(headingStore);
  });
});

