import PropTypes from "prop-types";
import { Link, useOutletContext } from "react-router";

// Icons
import { Trash2 } from "lucide-react";

// Styles
import styles from "../styles/Cart.module.css";




const Notification = ({ count }) => {
  return (
    <div>
      {count}
    </div>
  );
};



const CartView = ({ 
  cart, 
  cartTotal,
  showCart,
}) => {

  return (
    <dialog 
      id={styles.cartView} 
      className={showCart ? styles.showCart : ''}
    >
      <h3>My cart</h3>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <article className={styles.cartViewItem}>
              <div className={styles.imgContainer}>
                <img
                  className={styles.cartImg}
                  src={item.image}
                  alt={item.title}
                />
              </div>
              <h4>{item.title}</h4>
              <p>{item.price?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
            </article>
          </li>
        ))}
      </ul>
      <hr/>
      <p>
        Total: {cartTotal.toLocaleString("en-US", { style: "currency", currency: "USD" })}
      </p>
    </dialog>
  );
};

CartView.propTypes = {
  cart: PropTypes.array,
  cartTotal: PropTypes.number,
  showCart: PropTypes.bool,
}



const Cart = () => {
  const { 
    onDecreaseProduct: onDecrease,
    onIncreaseProduct: onIncrease,
    handleRemoveFromCart: onRemoveItem,
    cart,
    cartTotal,
  } = useOutletContext();

  return (
    <div id={styles.shoppingCart} >
      <h1>Cart</h1>
      {/* <Link to="/">Click here to go back</Link> */}
      {/* <h2>my shopping cart</h2> */}
      <div>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <article className={styles.cartItem}>
                <div className={styles.imgContainerCart}>
                  <img
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <h4 className={styles.productTitle}>
                  {item.title}
                </h4>
                <p className={styles.productPrice}>
                  {item.price?.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </p>
                <div className={styles.buttons}>
                  <button type="button" onClick={() => onDecrease(item.id)}>-</button>
                  <p>{item.quantity}</p>
                  <button type="button" onClick={() => onIncrease(item.id)}>+</button>
                  <button type="button" onClick={() => onRemoveItem(item.id)}
                    className={styles.removeBtn}  
                  >
                    <Trash2 />remove item
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <hr/>
        <p className="cart-total">
          Estimated total: {cartTotal?.toLocaleString("en-US", { style: "currency", currency: "USD" })}
        </p>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.array,
  cartTotal: PropTypes.number,
}

export { Cart, CartView };