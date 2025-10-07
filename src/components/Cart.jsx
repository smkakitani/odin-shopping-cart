import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link, useOutletContext } from "react-router";



const CartView = ({ cart, cartTotal }) => {
  return (
    <dialog id="cart-view" style={{ display: 'flex' }}>
      <h3>My cart</h3>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <article>
              <img sizes="100px" src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
              <p>{item.price?.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
            </article>
          </li>
        ))}
      </ul>
        <p>Total: {cartTotal.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
    </dialog>
  );
};

CartView.propTypes = {
  cart: PropTypes.array,
}



const Cart = (/* { cart } */) => {
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
                    <button type="button" onClick={() => onRemoveItem(item.id)}>remove item</button>
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