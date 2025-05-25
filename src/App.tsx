import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import About from "./pages/About";
import Program from "./pages/Program";
import News from "./pages/News";
import NewsDetail from "./pages/news/NewsDetail";
import NewsEdit from "./pages/news/NewsEdit";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: commonRoutes,
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
