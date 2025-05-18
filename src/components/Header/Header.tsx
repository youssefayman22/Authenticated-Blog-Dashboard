import React from "react";
import headerImg from "../../assets/blog.png";
import styles from "./Header.module.css";


/**
 * Header component for the blog layout.
 *
 * This component displays a blog header section including a banner image
 * and a welcoming title. It is typically used at the top of the main content area.
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */

const Header: React.FC = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <img src={headerImg} alt="Blog" className={styles.image} />
          <h1 className={styles.title}>Welcome To The Blog</h1>
        </header>
      </div>
    </div>
  );
};

export default Header;
