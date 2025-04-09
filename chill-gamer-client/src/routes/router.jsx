import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/signUp",
    element: <Register></Register>,
  },
]);

export default router;
