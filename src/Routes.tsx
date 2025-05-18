import { createBrowserRouter } from "react-router-dom";
import UserForm from "./components/UserForm/UserForm";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Posts from "./Pages/Posts/Posts";
import NewPost from "./Pages/NewPost/NewPost";
import ProtectedRoute from "./components/protectedroute/ProtectedRoute";
import Modes from "./Pages/Modes/Modes";
import Layout from "./Pages/Layout/Layout";

/**
 * Defines the application's routing structure using React Router's `createBrowserRouter`.
 *
 * The router includes:
 * - A root layout (`<Layout />`) that wraps all routes.
 * - Public routes:
 *   - `/` → `<Modes />` (authentication mode selection)
 *   - `/signup` → `<UserForm />` (signup/login form)
 * - Protected routes (wrapped in `<ProtectedRoute />`):
 *   - `/dashboard` → `<DashBoard />`
 *   - `/posts` → `<Posts />`
 *   - `/new-post` → `<NewPost />`
 *
 * @constant
 * @type {ReturnType<typeof createBrowserRouter>}
 *
 * @example
 * import router from './router';
 * <RouterProvider router={router} />
 */

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
