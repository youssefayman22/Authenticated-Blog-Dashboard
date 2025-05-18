import { useSelector, useDispatch } from "react-redux";
import styles from "./posts.module.css";
import { postsActions } from "../../store/PostsSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/Store";

/**
 * Posts is a component that displays a list of posts.
 * 
 * - If the user is authenticated, it shows only the posts created by the logged-in user
 *   and provides options to create or delete posts.
 * - If the user is not authenticated, it displays all posts in read-only mode.
 * 
 * The component uses Redux to access post and authentication state, and React Router
 * for navigation to the post creation page.
 *
 * @component
 * @returns {React.ReactElement} A list of posts with conditional actions based on authentication.
 *
 * @example
 * <Posts />
 */

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
