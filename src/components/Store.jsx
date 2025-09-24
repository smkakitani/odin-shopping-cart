import { Link } from "react-router";
import useFakeStore from "../api/Api";
import PropTypes from "prop-types";


const mockData = {
  id: crypto.randomUUID(),
  title: 'Mock title',
  price: 6.66,
  description: 'mocking some description for API data',
  category: 'am I using it? @_@',
  image: 'http://example.com',
  quantity: 0,
};




const Store = ({ 
  products,
  onDecreaseProduct,
  onIncreaseProduct,
  handleCartProduct,

}) => {
  useFakeStore();
  return (
    <div>
      <h1>Store page</h1>
      <Link to="/">Click here to go back</Link>
      <div className="board">
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <ItemCard 
                product={product}
                onDecrease={onDecreaseProduct}
                onIncrease={onIncreaseProduct}
                handleCart={handleCartProduct}              
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
}

const ItemCard = ({ 
  product, 
  onDecrease, 
  onIncrease, 
  handleCart, 
}) => {
  
  return (
    <div className="card-container">
      <img 
        src={product.img} 
        alt={product.title} 
        sizes="100px"
      />
      <p className="product-title">
        {product.title}
        </p>
      <p className="product-desc">
        {product.description}
        </p>
      <div>
        <p>{product.quantity}</p>
        <button type="button" onClick={() => onDecrease(product.id)}>-</button>
        <button type="button" onClick={() => onIncrease(product.id)}>+</button>
        <button type="button" onClick={handleCart}>add to cart</button>
      </div>
    </div>
  );
};

ItemCard.propTypes = {
  product: PropTypes.object,
  onDecrease: PropTypes.func, 
  onIncrease: PropTypes.func, 
  handleCart: PropTypes.func, 
};

export default Store;