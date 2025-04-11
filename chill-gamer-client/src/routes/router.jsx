import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import HomeLayout from "../layouts/HomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <h1>hello world</h1>,
      },
    ],
  },
  {
    path: "/signUp",
    element: <Register></Register>,
  },
  {
    path: "/signIn",
    element: <SignIn></SignIn>,
  },
]);

export default router;
