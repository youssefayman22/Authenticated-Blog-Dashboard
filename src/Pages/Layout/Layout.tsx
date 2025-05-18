import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./Layout.module.css";

/**
 * Layout is a structural component that defines the main layout of the application.
 * It includes a persistent navigation bar and header, and renders nested routes using React Router's <Outlet />.
 *
 * This component is typically used as a wrapper for protected or authenticated routes.
 *
 * @component
 * @returns {React.ReactElement} The layout structure with navigation, header, and routed content.
 *
 * @example
 * <Route element={<Layout />}>
 *   <Route path="/dashboard" element={<Dashboard />} />
 * </Route>
 */

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