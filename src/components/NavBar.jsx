import { House, ShoppingCart, Store } from 'lucide-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router';

// Styles
import styles from '../styles/NavBar.module.css';


const NavBar = ({ onMouseOverCart, onMouseOutCart, children }) => {
  const menuLink = [ 'home', 'store', 'cart' ];

  /* function activeLink({ isActive }) {

  } */

  return (
    <nav>
        <menu>
          {menuLink.map((item) => (
            <li key={item} >
              {item === 'cart' ? (                
                <NavLink to={item} className={({ isActive }) => isActive ? `${styles.active} ${styles.tab} ${styles.cart}` : `${styles.tab} ${styles.cart}`}
                  onMouseOver={onMouseOverCart}
                  onMouseOut={onMouseOutCart}
                >
                  {/* <button className={styles.tab}
                    // onMouseOver={onMouseOverCart}
                    // onMouseOut={onMouseOutCart}
                  > */}
                    <ShoppingCart />
                    {item}
                    {children}
                  {/* </button> */}
                </NavLink>
              ) : (
                <NavLink to={item} className={({ isActive }) => isActive ? `${styles.active} ${styles.tab}` : `${styles.tab}`}>
                  {item === 'store' ? <Store /> : <House />}
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