import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [{ index: true, element: <p className="text-red-500">Hello</p> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
