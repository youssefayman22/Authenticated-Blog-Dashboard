import { createBrowserRouter } from "react-router-dom";
import UserForm from "./components/UserForm/UserForm";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Posts from "./Pages/Posts/Posts";
import NewPost from "./Pages/NewPost/NewPost";
import ProtectedRoute from "./components/protectedroute/ProtectedRoute";
import Modes from "./Pages/Modes/Modes";
import Layout from "./Pages/Layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Modes />,
      },
      {
        path: "signup",
        element: <UserForm />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        ),
      },
      {
        path: "posts",
        element: (
          <ProtectedRoute>
            <Posts />
          </ProtectedRoute>
        ),
      },
      {
        path: "new-post",
        element: (
          <ProtectedRoute>
            <NewPost />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
