import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import About from "./pages/user/About";
import Program from "./pages/user/Program";
import News from "./pages/user/News";
import NewsDetail from "./pages/news/NewsDetail";
import NewsEdit from "./pages/news/NewsEdit";
import Portfolio from "./pages/user/Portfolio";
import AdminPortfolio from "./pages/admin/AdminPortfolio";

const commonRoutes = [
  { index: true, element: <div></div> },
  { path: "about", element: <About /> },
  { path: "program", element: <Program /> },
  {
    path: "news",
    children: [
      { index: true, element: <News /> },
      { path: ":id", element: <NewsDetail /> },
    ],
  },
];

const portfolioRoutes = [
  { path: "portfolio", element: <Portfolio /> },
  { path: "admin/portfolio", element: <AdminPortfolio /> },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [...commonRoutes, ...portfolioRoutes],
  },
  {
    path: "/admin",
    element: <DefaultLayout />,
    children: [
      ...commonRoutes,
      { path: "news/edit/:id", element: <NewsEdit /> },
      { path: "news/new", element: <NewsEdit /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
