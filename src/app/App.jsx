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
  quantity: 1,
  // total: this.price * this.quantity,
};

const createTestingProducts = () => {
  const initialProducts = [];
  for (let i = 0; i < 9; i++) {
    initialProducts.push({
      ...mockData,
      id: crypto.randomUUID(),
      title: `${i} - Mock title`,
    });
  }

  return initialProducts;
};


// Main App
const App = () => {
  const [products, setProducts] = useState(createTestingProducts);
  const [showCart, setShowCart] = useState(false); // state for CartView
  // const [cart, setCart] = useState({
  //   total: 0,
  //   items: [],
  // });
  const [cart, setCart] = useState([]);
  let cartTotal = 0;
  
  cart.forEach(item => {
    const value = item.price * item.quantity;
    const roundValue = (Math.round(value * 100)/100)
    cartTotal += roundValue;

  });

  function handleMouseOverCart() {
    setShowCart(true);
    // console.log('mouse over');
  };

  function handleMouseOutCart() {
    setShowCart(false);
    // console.log('mouse out');
  };
  
  function onDecreaseProduct(productId) {
    setProducts(products.map(p => {
      if (p.id === productId) {
        if(p.quantity === 0) {
          return p;
        } else {
          p.quantity--
          return p;
        }        
      } else {
        return p;
      }
    }));
  };

  function onIncreaseProduct(productId) {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        product.quantity++;
        // console.log(`total = ${product.price * product.quantity}`);
        return product;
      } else {
        return product;
      }
    });

    setProducts(updatedProducts);
    // updateCartTotal();
    // console.log(updatedProducts.total);

    // setProducts(products.map(p => {

    //   if (p.id === productId) {
    //     p.quantity++
    //     return p;
    //   } else {
    //     return p;
    //   }
    // }));
  };

  function handleAddToCart(productId) {
    // Look if product is already in cart
    // cart.forEach(item => {
    //   if (item.id === productId)
    // });

    products.forEach(product => {
      if (product.id === productId && product.quantity > 0) {
        // Look if product is already in cart
        // cart.forEach(item => {
        //   if (item.id === product.id) {

        //   }
        // });
        setCart([
          ...cart,
          product
        ]);
      }
    });
  }

  function handleRemoveFromCart(productId) {
    // Search for item's ID to be removed from cart
    // for (let item of cart.items) {
    //   if (item.id === productId) {
    //     value = item.quantity * item.price;
    //   }
    // }
    setCart(cart.filter(item => item.id !== productId));
  }

  // function updateCartTotal() {
  //   if (cart.items.length >= 1) {
  //     let newTotal = 0;

  //     cart.items.forEach((item) => {
  //       newTotal += item.price * item.quantity;
  //       console.log()
  //     });

  //     setCart(cart => {
  //       return {
  //         total: newTotal,
  //         ...cart,
  //       }
  //     });     

  //     console.log(newTotal, cart);
  //   }    
  // }

  return (
    <>
      <h1>My shopping cart</h1>
      <NavBar 
        onMouseOverCart={handleMouseOverCart} 
        onMouseOutCart={handleMouseOutCart}
      />
      {showCart && createPortal(
        <CartView cart={cart} cartTotal={cartTotal}/>,
        document.body
      )}
      <p>
        Hi
      </p>
      <main>
        <Outlet context={{ 
          products, 
          onDecreaseProduct, 
          onIncreaseProduct, 
          handleAddToCart, 
          handleRemoveFromCart,
          cart, 
          cartTotal,
        }}
        />
      </main>
    </>
  )
};

export default App;