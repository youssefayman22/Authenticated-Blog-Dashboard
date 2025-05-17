import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postsActions } from "../../store/PostsSlice";
import { Form, useNavigate } from "react-router-dom";
import styles from "./newPosts.module.css";
import { RootState } from "../../store/Store";

const NewPost: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.auth.email);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    try {
      dispatch(
        postsActions.addPost({
          id: Date.now(),
          title,
          content,
          createdBy: email,
        })
      );
      navigate("/posts");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong!");
      }
    }
  };

  const handleNavigate = () => {
    navigate("/posts");
  };

  return (
    <div className={styles.newPostContainer}>
      <h1>Create New Post</h1>
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea id="content" name="content" required></textarea>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.actions}>
          <button type="submit">Create Post</button>
          <button type="button" onClick={handleNavigate}>
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
};

export default NewPost;
