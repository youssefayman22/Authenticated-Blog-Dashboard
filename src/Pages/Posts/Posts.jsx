import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewPost from "../NewPost/NewPost";
import styles from "./posts.module.css";
import { postsActions } from "../../store/PostsSlice";

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleDeletePost = (id) => {
    dispatch(postsActions.deletePost(id)); // Dispatch deletePost action
  };

  return (
    <>
      <div className={styles.header}>
        <h1>Posts</h1>
        <button className={styles.createButton} onClick={handleOpenDialog}>
          Create New Post
        </button>
      </div>
      <div className={styles.postsContainer}>
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <div className={styles.postsGrid}>
            {posts.map((post) => (
              <div key={post.id} className={styles.postBox}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        {isDialogOpen && (
          <div className={styles.dialogOverlay}>
            <div className={styles.dialog}>
              <NewPost onClose={handleCloseDialog} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Posts;
