import { Link, NavLink } from 'react-router';


const NavBar = () => {
  const menuLink = [ 'home', 'store', 'cart' ];

  return (
    <nav>
        <menu>
          {menuLink.map((item) => (
            <li key={item}>
              <NavLink 
              to={item}
              onMouseOver={() => console.log('mouse on' + item)}
              
              >
                {item}
              </NavLink>
            </li>
          ))}
          {/* <NavLink to="home">Home</NavLink>
          <NavLink to="store">Store</NavLink>
          <NavLink to="cart">Cart</NavLink> */}
        </menu>
    </nav>
  );
};

export default NavBar;