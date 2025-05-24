import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import About from "./pages/user/About";
import Program from "./pages/user/Program";
import News from "./pages/user/News";
import Portfolio from "./pages/user/Portfolio";
import AdminPortfolio from "./pages/admin/AdminPortfolio";
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
    children: [{ index: true, element: <News /> }],
  },
  {
    path: "/portfolio",
    element: <DefaultLayout />,
    children: [{ index: true, element: <Portfolio /> }],
  },
  {
    path: "/admin/portfolio",
    element: <DefaultLayout />,
    children: [{ index: true, element: <AdminPortfolio /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
