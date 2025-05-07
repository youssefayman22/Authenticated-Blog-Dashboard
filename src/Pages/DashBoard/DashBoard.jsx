import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Profile from "../../components/Profile/Profile";
import Posts from "../Posts/Posts";
import styles from "./DashBoard.module.css";

const DashBoard = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You must be logged in to view this page.</p>
        <button onClick={() => navigate("/")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <Profile />
      <div className={styles.content}>
        <div className={styles.posts}>
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;