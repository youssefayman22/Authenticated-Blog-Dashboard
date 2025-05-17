// filepath: src/components/UserForm/UserForm.jsx
import { useEffect, useState } from "react";
import { Form, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/AuthSlice";
import styles from "./UserForm.module.css";

const UserForm = () => {
  const [searchParams] = useSearchParams();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const mode = searchParams.get("mode") || "signup";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const url = mode === "login" ? "/login" : "/signup";
    try {
      const response = await fetch(`http://localhost:8080${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
      console.log(response.ok);
      console.log(data);
      if (mode === "signup") {
        dispatch(authActions.signup({ email: data.user.email }));
        navigate("/signup?mode=login");
      } else {
        dispatch(
          authActions.login({
            email: data.email,
            token: data.token,
          })
        );
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  const toggleMode = () => {
    event.preventDefault();
    if (mode === "login") {
      navigate("/signup");
    } else {
      navigate("/signup?mode=login");
    }
  };
  return (
    <div className={styles.formOverlay}>
      <Form method="post" className={styles.form} onSubmit={handleSubmit}>
        <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
          <button className={styles.toggleButton} onClick={toggleMode}>
            {mode === "login" ? "Go to Sign Up" : "Go to Login"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UserForm;
