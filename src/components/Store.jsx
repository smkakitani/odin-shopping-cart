import { Link, useOutletContext } from 'react-router';
import PropTypes from 'prop-types';

// Styles
import styles from '../styles/Store.module.css';

// Assets
import catShoes from '../assets/cat-shoes.png';



const Store = ({ 
  /* products, */
  /* onDecreaseProduct, */
  /* onIncreaseProduct, */
  /* handleCartProduct, */

}) => {
  const { 
    products, 
    onDecreaseProduct, 
    onIncreaseProduct, 
    handleAddToCart, 
  } = useOutletContext();
  

  // useFakeStore();
  return (
    <div id={styles.storePage}>
      <h1>Store page</h1>
      {/* <Link to="/">Click here to go back</Link> */}
      <div className={styles.board} >
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <ItemCard 
                product={product}
                onDecrease={onDecreaseProduct}
                onIncrease={onIncreaseProduct}
                handleCart={handleAddToCart}              
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Store.propTypes = {
  products: PropTypes.array,
  onDecrease: PropTypes.func, 
  onIncrease: PropTypes.func, 
  handleCart: PropTypes.func, 
}

const ItemCard = ({ 
  product, 
  onDecrease, 
  onIncrease, 
  handleCart, 
}) => {
  
  return (
    <article className={styles.productItem}>
      <img className={styles.imgItem}
        src={product.image /* catShoes */}
        alt={product.title}
        // sizes="100px"
      />
      <h4 className="product-title">
        {product.title}
      </h4>
      <p className="product-price">
        {product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
      </p>
      <div className={styles.buttons}>        
        <button type="button" onClick={() => onDecrease(product.id)}>-</button>
        <p>{product.quantity}</p>
        <button type="button" onClick={() => onIncrease(product.id)}>+</button>
        <button type="button" onClick={() => handleCart(product.id)}>add to cart</button>
      </div>
    </article>
  );
};

ItemCard.propTypes = {
  product: PropTypes.object,
  onDecrease: PropTypes.func, 
  onIncrease: PropTypes.func, 
  handleCart: PropTypes.func, 
};

export default Store;