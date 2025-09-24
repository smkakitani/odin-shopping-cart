import { Link, NavLink, Outlet } from 'react-router';
// import { useParams } from 'react-router';
import Home from '../components/Home';
import Store from '../components/Store';
import Cart from '../components/Cart';

import '../styles/App.css';
import NavBar from '../components/NavBar';
import { useState } from 'react';


const mockData = {
  id: crypto.randomUUID(),
  title: 'Mock title',
  price: 6.66,
  description: 'mocking some description for API data',
  category: 'am I using it? @_@',
  image: 'http://example.com',
  quantity: 0,
};



const App = () => {
  const [products, setProducts] = useState([]);

  const handleProducts = (obj) => {
    return 
  };


  return (
    <>
      <h1>My shopping cart</h1>
      <NavBar />
      <p>
        Hi
      </p>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App;