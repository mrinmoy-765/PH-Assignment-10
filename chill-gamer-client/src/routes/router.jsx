import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import AddReview from "../pages/AddReview";
import AllReviews from "../pages/AllReviews";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/addReview",
        element: <AddReview></AddReview>,
      },
      {
        path: "/allReviews",
        element: <AllReviews></AllReviews>,
        loader: () => fetch("http://localhost:5000/reviews"),
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
