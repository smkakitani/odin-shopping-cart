import { Link, useOutletContext } from "react-router";



const CartOnHover = () => {
  const [ cart ] = useOutletContext();

  return (
    <dialog id="cart-view">
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

const Cart = () => {
  return (
    <div>
      <h1>Caart</h1>
      <Link to="/">Click here to go back</Link>

    </div>
  );
};

export default Cart;