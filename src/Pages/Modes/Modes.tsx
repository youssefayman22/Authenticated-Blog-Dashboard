import { useNavigate } from "react-router-dom";
import styles from "./Modes.module.css";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { RootState } from "../../store/Store";

const Modes: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
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
