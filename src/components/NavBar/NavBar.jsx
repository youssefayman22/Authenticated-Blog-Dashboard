import { Link} from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <ul className={styles.navList}>
        <li>
          <Link
            to="/signup"
          >
            Signup
          </Link>
        </li>
        <li>
          <Link
            to="/posts"
          >
            Posts
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
          >
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;