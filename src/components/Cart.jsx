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
  // openModal,
  // closeModal,
  // cartRef,
  showCart,
}) => {
  // const dialogRef = useRef(null);

  // useEffect(() => {
  //   if (openModal) {
  //     dialogRef.current.show();
  //   } else {
  //     dialogRef.current.close();
  //   }
  // }, []);

  return (
    <dialog 
      id={styles.cartView} 
      className={showCart ? styles.showCart : ''}
      // ref={cartRef}
      // ref={dialogRef} 
      // onCancel={closeModal}
    >
      <h3>My cart</h3>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <article className={styles.cartViewItem}>
              <img 
                className={styles.cartImg}
                sizes="100px" 
                src={item.image} 
                alt={item.title} 
              />
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
    <div>
      <h1>Cart</h1>
      <Link to="/">Click here to go back</Link>
      <div className="shopping-cart">
        <h2>my shopping cart</h2>
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <article>
                  <img 
                    sizes="100px" 
                    src={item.image} 
                    alt={item.title} 
                  />
                  <h4 className="product-title">
                    {item.title}
                  </h4>
                  <p className="product-price">
                    {item.price?.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </p>
                  <div>
                    <button type="button" onClick={() => onDecrease(item.id)}>-</button>
                    <p>{item.quantity}</p>
                    <button type="button" onClick={() => onIncrease(item.id)}>+</button>
                    <button type="button" onClick={() => onRemoveItem(item.id)}><Trash2 /> remove item</button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <p className="cart-total">
            Estimated total: {cartTotal?.toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </p>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.array,
  cartTotal: PropTypes.number,
}

export { Cart, CartView };