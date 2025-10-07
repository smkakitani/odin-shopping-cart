import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, logRoles, render, screen, waitFor, within } from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";
import userEvent from "@testing-library/user-event";

import { Cart } from "../src/components/Cart";
// import App from "../src/app/App";
import routes from "../src/app/routes";
import { useState } from "react";



const mockData = {
  id: 666,
  title: 'Mock title',
  price: 6.66,
  description: 'mocking some description for API data',
  category: 'am I using it? @_@',
  image: 'http://example.com',
  quantity: 0,
};

const mockCart = [
  {
    id: 1,
    title: '1-Mock title',
    price: 6.66,
    description: 'mocking some description for API data',
    image: 'http://example.com',
    quantity: 1,
  },
  {
    id: 2,
    title: '2-Mock title',
    price: 3.33,
    description: 'mocking some description for API data',
    image: 'http://example.com',
    quantity: 2,
  },
  {
    id: 3,
    title: '3-Mock title',
    price: 1.11,
    description: 'mocking some description for API data',
    image: 'http://example.com',
    quantity: 3,
  },
];

const decreaseItem = vi.fn();
const increaseItem = vi.fn();

const renderMockApp = (mockingCart) => {
  const MockApp = () => {  
    const [cart, setCart] = useState(mockingCart);
    let cartTotal = 0;
    mockingCart.forEach(item => {
      const value = item.price * item.quantity;
      const roundValue = (Math.round(value * 100)/100)
      cartTotal += roundValue;
    });

    const mockRemove = (id) => {
      const newCart = cart.filter(item => item.id !== id);

      setCart(newCart);
    };

    const mockOutletContext = {
      onDecreaseProduct: decreaseItem,
      onIncreaseProduct: increaseItem,
      handleRemoveFromCart: mockRemove,
      cart,
      cartTotal,
    };

    return (
      <>
        <h1>My shopping cart</h1>
        <main>
          <Outlet context={mockOutletContext}/>
        </main>
      </>
    );
  }

  const mockRoutes = [
    {
      path: "/",
      element: <MockApp />,
      children: [
        {
          path: "cart",
          element: <Cart />,
        }
      ]
    }
  ];

  const router = createMemoryRouter(mockRoutes, { initialEntries: ["/cart"] });
  render(<RouterProvider router={router} />);  
};

afterEach(cleanup);

describe("Cart component", () => {
  it("renders Cart component on <main>", () => {
    const router = createMemoryRouter(routes, { 
      initialEntries: ["/", "/cart"], 
      initialIndex: 1,
    });

    render(<RouterProvider router={router}/>);

    const mainEle = screen.getByRole('main');
    const cartHeading = within(mainEle).getByRole('heading', { name: /my shopping cart/i });

    expect(cartHeading).toBeInTheDocument;
  });

  it("should have some products in shopping cart", () => {
    renderMockApp(mockCart);

    const cartList = screen.getAllByRole('listitem');
    const cartTotal = screen.getByText(/estimated total/i);

    expect(cartList).toHaveLength(3);
    expect(cartTotal).toBeInTheDocument();
  });

  it("should remove a product from cart", async () => {
    const user = userEvent.setup();

    renderMockApp(mockCart);

    const main = screen.getByRole('main');
    const removeBtn = within(main).getAllByRole('button', { name: /remove item/i })[0];
    const cartListBeforeRemove = within(main).getAllByRole('listitem');

    expect(cartListBeforeRemove).toHaveLength(3);

    await user.click(removeBtn);

    const cartList = await within(main).findAllByRole('listitem');

    await waitFor(() => expect(cartList).toHaveLength(2));
  });
});