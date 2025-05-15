import { useNavigate } from "react-router-dom";
import styles from "./Modes.module.css"

const Modes = () => {
  const navigate = useNavigate();
  const handleShowSignUp = () => {
    navigate("/signup");
  };
  const handleShowSLogIn = () => {
    navigate("/signup?mode=login");
  };
  return (
    <div className={styles.centerContainer}>
      <button onClick={handleShowSignUp} className={styles.link}>
        Sign Up
      </button>
      <button onClick={handleShowSLogIn} className={styles.link}>
        Log in
      </button>
    </div>
  );
};

export default Modes;
