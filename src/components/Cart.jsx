import PropTypes from "prop-types";
import { Link, useOutletContext } from "react-router";



const CartView = ({ cart }) => {
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
  const { 
    onDecreaseProduct: onDecrease,
    onIncreaseProduct: onIncrease,
    handleRemoveFromCart: onRemoveItem,
    cart,
  } = useOutletContext();

  // const onDecrease = onDecreaseProduct;
  // const onIncrease = onIncreaseProduct;

  return (
    <div>
      <h1>Cart</h1>
      <Link to="/">Click here to go back</Link>
      <div className="shopping-cart">
        <h2>my shopping cart</h2>
        <div>
          <ul>
            {cart.items.map((item) => (
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
                    $ {item.price}
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
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.object,
}

export { Cart, CartView };