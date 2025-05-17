import { useNavigate } from "react-router-dom";
import styles from "./Modes.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Modes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);
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
