import PropTypes from 'prop-types';
import { NavLink } from 'react-router';


const NavBar = ({ onMouseOverCart, onMouseOutCart }) => {
  const menuLink = [ 'home', 'store', 'cart' ];

  return (
    <nav>
        <menu>
          {menuLink.map((item) => (
            <li key={item} >
              {item === 'cart' ? (
                <button
                  onMouseOver={onMouseOverCart}
                  onMouseOut={onMouseOutCart}
                >
                  <NavLink to={item}>
                    {item}
                  </NavLink>
                </button>
              ) : (
                <button>
                  <NavLink to={item}>
                    {item}
                  </NavLink>
                </button>
              )}              
            </li>
          ))}
        </menu>        
    </nav>
  );
};

NavBar.propTypes = {
  onMouseOverCart: PropTypes.func,
  onMouseOutCart: PropTypes.func,
}

export default NavBar;