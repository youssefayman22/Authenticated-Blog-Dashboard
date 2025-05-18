import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./NavBar.module.css";
import React from "react";
import { RootState } from "../../store/Store";


/**
 * Navigation bar component that conditionally renders links
 * based on the user's authentication status.
 *
 * - If authenticated, shows links to Posts, Dashboard, and New Post.
 * - If not authenticated, shows a link to Home.
 *
 * @component
 * @example
 * return (
 *   <NavBar />
 * )
 */

const NavBar: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <nav className={styles.navBar}>
      <h2 className={styles.title}>Navigation Bar</h2>
      <ul className={styles.navList}>
        {isAuthenticated && (
          <>
            <li>
              <Link to="/posts" className={styles.link}>
                Posts
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className={styles.link}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/new-post" className={styles.link}>
                New Post
              </Link>
            </li>
          </>
        )}
        {!isAuthenticated && (
          <li>
            <Link to="/" className={styles.link}>
              Home
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
