import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import About from "./pages/About";
import Program from "./pages/Program";
import News from "./pages/News";
import NewsDetail from "./pages/news/NewsDetail";

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
  {
    path: "/program",
    element: <DefaultLayout />,
    children: [{ index: true, element: <Program /> }],
  },
  {
    path: "/news",
    element: <DefaultLayout />,
    children: [
      { index: true, element: <News /> },
      { path: ":id", element: <NewsDetail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
