import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./Layout.module.css";

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <NavBar />
      <div className={styles.mainContent}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;