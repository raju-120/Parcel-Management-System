import {createBrowserRouter} from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home page/Home";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      }
    ]
  }
]);

