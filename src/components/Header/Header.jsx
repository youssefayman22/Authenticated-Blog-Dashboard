import { Outlet } from "react-router-dom";
import headerImg from "../../assets/blog.png";
import NavBar from "../NavBar/NavBar";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <img src={headerImg} alt="Blog" className={styles.image} />
        <h1 className={styles.title}>Welcome To The Blog</h1>
        <NavBar />
      </header>
      <main>
        <Outlet/>
      </main>
    </>
  );
};

export default Header;
