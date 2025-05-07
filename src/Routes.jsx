import { createBrowserRouter } from "react-router-dom";
import UserForm from "./components/UserForm/UserForm";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Posts from "./Pages/Posts/Posts";
import NewPost from "./Pages/NewPost/NewPost";
import ProtectedRoute from "./components/protectedroute/ProtectedRoute";
import Header from "./components/Header/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header/>,
    children:[
      {
        path: "/signup",
        element: <UserForm/>
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute><DashBoard /></ProtectedRoute>,
      },
      {
        path: "/posts",
        element: <Posts/>,
      },
      {
        path: "/new-post",
        element: <ProtectedRoute><NewPost /></ProtectedRoute>,
      },
    ]
  },
  
]);

export default router;
