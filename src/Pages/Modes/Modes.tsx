import { useNavigate } from "react-router-dom";
import styles from "./Modes.module.css";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { RootState } from "../../store/Store";

/**
 * Modes is a public-facing component that provides navigation options for user authentication.
 * It displays "Sign Up" and "Log in" buttons and redirects users accordingly.
 *
 * If the user is already authenticated (based on Redux state), they are automatically redirected to the dashboard.
 *
 * @component
 * @returns {React.ReactElement} A UI with buttons to navigate to signup or login routes.
 *
 * @example
 * <Modes />
 */

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
