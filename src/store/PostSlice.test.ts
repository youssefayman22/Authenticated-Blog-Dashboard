import postsReducer, { postsActions } from "./PostsSlice";

describe("postsSlice", () => {
  const initialState = {
    posts: [],
  };

  it("should return the initial state", () => {
    expect(postsReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should handle addPost", () => {
    const newPost = {
      id: 1,
      title: "Test Post",
      content: "This is a test post.",
      createdBy: "user@example.com",
    };

    const state = postsReducer(initialState, postsActions.addPost(newPost));
    expect(state.posts).toHaveLength(1);
    expect(state.posts[0]).toEqual(newPost);
  });

  it("should handle deletePost", () => {
    const existingState = {
      posts: [
        { id: 1, title: "Post 1", content: "Content 1", createdBy: "user@example.com" },
        { id: 2, title: "Post 2", content: "Content 2", createdBy: "user@example.com" },
      ],
    };

    const state = postsReducer(existingState, postsActions.deletePost(1));
    expect(state.posts).toHaveLength(1);
    expect(state.posts[0].id).toBe(2);
  });
});
