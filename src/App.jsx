import { Provider } from "react-redux";
import "./App.css";
import store from "./store/Store";
import { RouterProvider } from "react-router-dom";
import router from "./Routes.jsx";

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
