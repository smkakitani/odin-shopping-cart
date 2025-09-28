import PropTypes from "prop-types";
import { Link, /* useOutletContext */ } from "react-router";



const CartView = ({ cart }) => {
  // const [ ...cart ] = useOutletContext();

  return (
    <dialog id="cart-view" style={{ display: 'flex' }}>
      <h3>My cart</h3>
      <ul>
        {cart.items.map(item => (
          <li key={item.id}>
            <article>
              <img sizes="100px" src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
              <p>$ {item.price}</p>
            </article>
          </li>
        ))}
      </ul>
        <p>Total: {cart.total}</p>
    </dialog>
  );
};

CartView.propTypes = {
  cart: PropTypes.object,
}




const Cart = () => {
  return (
    <div>
      <h1>Cart</h1>
      <Link to="/">Click here to go back</Link>

    </div>
  );
};

export { Cart, CartView };