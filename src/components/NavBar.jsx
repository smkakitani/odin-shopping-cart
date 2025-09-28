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
                <button>
                  <NavLink
                    to={item}
                    onMouseOver={onMouseOverCart}
                    onMouseOut={onMouseOutCart}
                  >
                    {item}
                  </NavLink>
                </button>
              ) : (
                <NavLink to={item}>
                  {item}
                </NavLink>
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