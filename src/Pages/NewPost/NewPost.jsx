import { useDispatch } from "react-redux";
import { postsActions } from "../../store/PostsSlice";
import { Form } from "react-router-dom";
import { useState } from "react";
import styles from "./newPosts.module.css";

const NewPost = ({ onClose }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get("title");
    const content = formData.get("content");

    try {
      dispatch(postsActions.addPost({ id: Date.now(), title, content }));
      onClose(); // Close the dialog
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
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
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
};

export default NewPost;