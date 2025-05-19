import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [{ index: true, element: <p className="text-red-500">Hello</p> }],
  },
  {
    path: "/about",
    element: <DefaultLayout />,
    children: [{ index: true, element: <About /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
