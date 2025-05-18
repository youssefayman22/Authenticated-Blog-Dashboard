import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.css";
import profileIcon from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/AuthSlice";
import { RootState } from "../../store/Store";
import React from "react";

/**
 * Profile component that displays the current user's email and a logout button.
 *
 * - Shows a profile icon and the user's email address.
 * - Allows the user to log out, which clears authentication state and navigates to the home page.
 *
 * @component
 * @example
 * return (
 *   <Profile />
 * )
 */
const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Handles user logout by dispatching the logout action
   * and navigating to the home page.
   */
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const email = useSelector((state: RootState) => state.auth.email);

  return (
    <div className={styles.profile}>
      <img src={profileIcon} alt="profile icon" />
      <div className={styles.profileContent}>
        <h2>User Profile</h2>
        <p>Email: {email}</p>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
