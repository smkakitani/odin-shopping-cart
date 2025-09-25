import { Link, NavLink, Outlet } from 'react-router';
// import { useParams } from 'react-router';
// import Home from '../components/Home';
// import Store from '../components/Store';
// import Cart from '../components/Cart';

import NavBar from '../components/NavBar';
import { useState } from 'react';

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


const App = () => {
  const [products, setProducts] = useState(createTestingProducts);

  // const handleProducts = (obj) => {
  //   return 
  // };
  
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

  return (
    <>
      <h1>My shopping cart</h1>
      <NavBar />
      <p>
        Hi
      </p>
      <main>
        <Outlet context={[products, onDecreaseProduct, onIncreaseProduct]}/>
      </main>
    </>
  )
}

export default App;