import { Outlet } from 'react-router';
import { createPortal } from 'react-dom';
import { useState } from 'react';

// Component
import NavBar from '../components/NavBar';
import { CartView } from '../components/Cart';

// Style
import '../styles/App.css';



const mockData = {
  id: 666/* crypto.randomUUID() */,
  title: 'Mock title',
  price: 6.66,
  description: 'mocking some description for API data',
  category: 'am I using it? @_@',
  image: 'http://example.com',
  quantity: 0,
};

const createTestingProducts = () => {
  const initialProducts = [];
  for (let i = 0; i < 9; i++) {
    initialProducts.push({
      ...mockData,
      id: crypto.randomUUID(),
    });
  }

  return initialProducts;
};


// Main App
const App = () => {
  const [products, setProducts] = useState(createTestingProducts);
  const [showCart, setShowCart] = useState(false); // state for CartView
  const [cart, setCart] = useState({
    total: 0,
    items: [],
  });

  function handleMouseOverCart() {
    setShowCart(true);
  };

  function handleMouseOutCart() {
    setShowCart(false);
  };
  
  function onDecreaseProduct(productId) {
    setProducts(products.map(p => {
      if (p.id === productId) {
        if(p.quantity === 0) {
          return p;
        } else {
          p.quantity--
          console.log(p.quantity);
          return p;
        }        
      } else {
        return p;
      }
    }));
  };

  function onIncreaseProduct(productId) {
    setProducts(products.map(p => {

      if (p.id === productId) {
        p.quantity++
        return p;
      } else {
        return p;
      }
    }));
  };

  function handleCartProduct(productId) {
    products.map(product => {
      if (product.id === productId) {
        const result = product.quantity * product.price;
        setCart({
          total: cart.total + result,
          items: [
            ...cart.items,
            product
          ]
        });
      }
    });
  }

  return (
    <>
      <h1>My shopping cart</h1>
      <NavBar 
        onMouseOverCart={handleMouseOverCart} 
        onMouseOutCart={handleMouseOutCart}
      />
      {showCart && createPortal(
        <CartView cart={cart}/>,
        document.body
      )}
      <p>
        Hi
      </p>
      <main>
        <Outlet context={[ 
          products, 
          onDecreaseProduct, 
          onIncreaseProduct, 
          handleCartProduct, 
          cart, 
          ]}
        />
      </main>
    </>
  )
};

export default App;