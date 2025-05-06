import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.css";
import profileIcon from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/AuthSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  const email = useSelector((state) => state.auth.email);

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
