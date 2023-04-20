import { FaTwitter } from 'react-icons/fa';
import styles from './styles/Navbar.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux"

function Navbar() {
    const { username } = useSelector((state) => state.auth)
  return (
    <nav className={styles.navbar}>
      <div >
        
        <Link to  ="/homepage" className={styles.brand}>
        <FaTwitter size={24} />
        <span className={styles.brandText}>Twitter</span>
        </Link>
        
      </div>
      <div className={styles.links}>
        <Link to="/homepage" className={styles.link}>Homepage</Link>
        <Link to="/mytweets" className={styles.link}>My Tweets</Link>
        <Link to = "/">
        <button  className={styles.logout}>Logout</button>
        </Link>
       
      </div>
      <div className={styles.welcome}>
        Welcome, {username.toUpperCase()}!
      </div>
    </nav>
  );
}

export default Navbar;