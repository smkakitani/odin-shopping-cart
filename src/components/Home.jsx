import { Link } from "react-router";

// Styles
import styles from '../styles/Home.module.css';

// Assets
import catCafe from '../assets/cat-and-coffee.jpg';


const Home = () => {
  return (
    <div id={styles.home}>
      <h1>Home page</h1>
      <div className={styles.catContainer}>
        <img 
          src={catCafe} 
          alt="Black cat and some coffee" 
        />
      </div>
    </div>
  );
};

export default Home;