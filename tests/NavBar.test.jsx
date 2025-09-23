import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import userEvent from "@testing-library/user-event";

import NavBar from "../src/components/NavBar";
import routes from "../src/app/routes";


describe('NavBar component', () => {
  it('renders <menu> inside <nav>', () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });

    render(<RouterProvider router={router}/>);

    const navElement = screen.getByRole('navigation');
    const menuElement = screen.getByRole('list');

    expect(navElement).toContainElement(menuElement);
  });

  it('renders 3 links of navbar: "home", "store" and "cart" ', () => {
    const router = createMemoryRouter(routes);
    
    render(<RouterProvider router={router}/>);

    const menuItems = screen.getAllByRole('link');

    expect(menuItems).toHaveLength(3);
    expect(menuItems[0]).toHaveTextContent(/home/i);
    expect(menuItems[1]).toHaveTextContent(/store/i);
    expect(menuItems[2]).toHaveTextContent(/cart/i);
  });

  it("should change class to active when user clicks on link", async () => {
    const router = createMemoryRouter(routes);
    const user = userEvent.setup();
    
    render(<RouterProvider router={router}/>);

    const linkHome = screen.getByRole('link', { name: /home/i });
    const linkStore = screen.getByRole('link', { name: /store/i });
    const linkCart = screen.getByRole('link', { name: /cart/i });
    // const linkList = screen.getAllByRole('link');

    await user.click(linkHome);

    expect(linkCart).not.toHaveClass(/active/);
    expect(linkStore).not.toHaveClass(/active/);
    expect(linkHome).toHaveClass(/active/);    
    

    await user.click(linkStore);

    expect(linkCart).not.toHaveClass(/active/);
    expect(linkHome).not.toHaveClass(/active/);
    expect(linkStore).toHaveClass(/active/);
    screen.debug();
  });
});

