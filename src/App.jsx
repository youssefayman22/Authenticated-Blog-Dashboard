import { Provider } from "react-redux";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import store from "./store/Store";
import { RouterProvider } from "react-router-dom";
import router from "./Routes.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";

function App() {
  return (
    <Provider store={store}>
      <main>
        <RouterProvider router={router} />
      </main>
    </Provider>
  );
}

export default App;
