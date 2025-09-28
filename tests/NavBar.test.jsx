import { describe, it, expect } from "vitest";
import { logRoles, render, screen, within } from "@testing-library/react";
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
  });
});

describe("Cart view", () => {
  it("show cart onMouseOver", async () => {
    const router = createMemoryRouter(routes);
    const user = userEvent.setup();
    
    render(<RouterProvider router={router}/>);

    const cart = screen.getByRole('link', { name: /cart/i });

    await user.hover(cart);

    const myCart = screen.getByRole('heading', { name: /my cart/i });

    expect(myCart).toBeInTheDocument();
    
    await user.unhover(cart);
    
    expect(myCart).not.toBeInTheDocument();
  });

  it("should have some item on cart view", async () => {
    const router = createMemoryRouter(routes, { 
      initialEntries: ["/", "/store"], 
      initialIndex: 1, 
    });

    const user = userEvent.setup();
    
    render(<RouterProvider router={router}/>);

    const increaseItem = screen.getAllByRole('button', { name: '+' })[0];

    await user.click(increaseItem);
    await user.click(increaseItem);
    // logRoles(increaseItem);

    const any = screen.queryAllByText('2');
    expect(any).toHaveLength(1);
    
    const addToCartBtn = screen.getAllByRole('button', { name: /add to cart/i })[0];
    const showCart = screen.getByRole('link', { name: /cart/i });

    await user.click(addToCartBtn);
    await user.hover(showCart);

    const cartView = screen.getByRole('dialog');
    const cartItems = within(cartView).getAllByRole('listitem');

    expect(cartItems).toHaveLength(1);
  });
});