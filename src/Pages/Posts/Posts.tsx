import { useSelector, useDispatch } from "react-redux";
import styles from "./posts.module.css";
import { postsActions } from "../../store/PostsSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/Store";

const Posts: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const email = useSelector((state: RootState) => state.auth.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    navigate("/new-post")

  };

  const handleDeletePost = (id: number) => {
    dispatch(postsActions.deletePost(id));
  };

  console.log("Posts:", posts);
  return (
    <>
      <div className={styles.header}>
        <h1>Posts</h1>
        {isAuthenticated && (
          <button className={styles.createButton} onClick={handleOpenDialog}>
            Create New Post
          </button>
        )}
      </div>
      <div className={styles.postsContainer}>
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <div className={styles.postsGrid}>
            {posts
              .filter((post) => isAuthenticated && post.createdBy === email) // Filter posts created by the logged-in user
              .map((post) => (
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
            {!isAuthenticated &&
              posts.map((post) => (
                <div key={post.id} className={styles.postBox}>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Posts;
