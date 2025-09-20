import { Link, NavLink, Outlet } from 'react-router';
// import { useParams } from 'react-router';
import Home from '../components/Home';
import Store from '../components/Store';
import Cart from '../components/Cart';

import '../styles/App.css';
import NavBar from '../components/NavBar';

const App = () => {
  // const { tab } = useParams();
  return (
    <>
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

export default App
