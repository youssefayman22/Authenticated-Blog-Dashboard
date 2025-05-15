import headerImg from "../../assets/blog.png";
import styles from "./Header.module.css";

const Header = () => {
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
