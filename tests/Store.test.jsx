import { describe, it, expect } from "vitest";
import { logRoles, render, screen, within } from "@testing-library/react";
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

  it("renders 9 items on store", () => {
    const router = createMemoryRouter(routes, { 
      initialEntries: ["/", "/store"], 
      initialIndex: 1,    
    });

    render(<RouterProvider router={router}/>);

    const productTitle = screen.getAllByText(/mock title/i);

    expect(productTitle).toHaveLength(9);
  });

  it("product's quantity should not be less than zero", async () => {
    const router = createMemoryRouter(routes, { 
      initialEntries: ["/", "/store"], 
      initialIndex: 1,    
    });
    const user = userEvent.setup();

    render(<RouterProvider router={router}/>);
    
    const decreaseButton = screen.getAllByRole('button', { name: '-'})[0];    

    await user.click(decreaseButton);
    await user.click(decreaseButton);
    await user.click(decreaseButton);

    const itemCard = screen.getAllByRole('list');
    const productItem = within(itemCard[1]).getAllByText('0');
    
    expect(productItem).toHaveLength(1);
  });

  it("product's quantity should be more than zero", async () => {
    const router = createMemoryRouter(routes, { 
      initialEntries: ["/", "/store"], 
      initialIndex: 1,    
    });
    const user = userEvent.setup();

    render(<RouterProvider router={router}/>);

    const increaseButton = screen.getAllByRole('button', { name: '+'})[0];    

    await user.click(increaseButton);
    await user.click(increaseButton);
    

    const itemCard = screen.getAllByRole('list');
    const productItem = within(itemCard[1]).getAllByText('3');
    const productItemOther = within(itemCard[1]).getAllByText('1');

    expect(productItem).toHaveLength(1);
    expect(productItemOther.length).toBe(8);
  });
});

