import { Outlet } from 'react-router';
import { useEffect, useState } from 'react';

// Component
import NavBar from '../components/NavBar';
import { CartView } from '../components/Cart';

// Style
import styles from '../styles/App.module.css';

// API
import useFakeStore from '../api/Api';

// Assets
import catShopping from '../assets/shopping.png';
import catShoes from '../assets/cat-shoes.png';



const mockData = {
  id: 666/* crypto.randomUUID() */,
  title: 'Mock title',
  price: 6.66,
  description: 'mocking some description for API data',
  category: 'am I using it? @_@',
  image: catShoes,
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
  const { item, loading, error } = useFakeStore();
  const [products, setProducts] = useState(createTestingProducts /* item */);
  const [showCart, setShowCart] = useState(false); // state for CartView  
  const [cart, setCart] = useState([]);
  // const dialogRef = useRef(null);

  let cartTotal = 0;
  
  cart.forEach(item => {
    const value = item.price * item.quantity;
    const roundValue = (Math.round(value * 100)/100)
    cartTotal += roundValue;

  });

  useEffect(() => {
    if (item) {
      setProducts(item);
    }
  }, [item]);

  function handleMouseOverCart() {
    // setShowCart(true);
    console.log('mouse over');
  };

  function handleMouseOutCart() {
    // setShowCart(false);
    console.log('mouse out');
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
        return product;
      } else {
        return product;
      }
    });

    setProducts(updatedProducts);
  };

  function handleAddToCart(productId) {
    // Look if product is already in cart
    const hasProduct = cart.some(item => item.id === productId);

    if (!hasProduct) {
      products.forEach(product => {
        if (product.id === productId && product.quantity > 0) {
          setCart([
            ...cart,
            product
          ]);
        }
      });
    }    
  }

  function handleRemoveFromCart(productId) {
    setCart(cart.filter(item => item.id !== productId));
  }



  return (
    <>
      <header>
        <a href="https://www.flaticon.com/free-stickers/purchase" title="purchase stickers">
          <img 
            className={styles.logo}
            src={catShopping} 
            alt="cat shopping" 
            title='Purchase stickers created by Stickers - Flaticon'        
          />
        </a>
        <h1>shopping cart</h1>
      </header>
      <NavBar 
        onMouseOverCart={handleMouseOverCart}
        onMouseOutCart={handleMouseOutCart}
        // cartComp={<CartView 
        //   cart={cart} 
        //   cartTotal={cartTotal}
        //   showCart={showCart}
        // />}
      >
        {/* <CartView 
          cart={cart} 
          cartTotal={cartTotal}
          openModal={showCart}
          showCart={showCart}
        /> */}
        {/* {showCart && <CartView 
          cart={cart} 
          cartTotal={cartTotal}
          openModal={showCart}      
        />} */}
      </NavBar>
      {/* <NavBar 
        onMouseOverCart={handleMouseOverCart} 
        onMouseOutCart={handleMouseOutCart}
      /> */}
      {/* {showCart && createPortal(
        <CartView 
          cart={cart} 
          cartTotal={cartTotal}
          openModal={showCart}
          // closeModal={}
          ref={dialogRef}
        />,
        document.body
      )} */}
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