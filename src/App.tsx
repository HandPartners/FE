import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AdminLayout from "./layouts/AdminLayout";
import About from "./pages/user/About";
import News from "./pages/user/news/News";
import NewsDetail from "./pages/user/news/NewsDetail";
import NewsEdit from "./pages/user/news/NewsEdit";
import Portfolio from "./pages/user/Portfolio";
import AdminPortfolio from "./pages/admin/AdminPortfolio";
import Main from "./pages/user/Main";
import ProgramV2 from "./pages/user/program_v2/ProgramV2";
import ProgramV2Detail from "./pages/user/program_v2/ProgramV2Detail";
import ProgramV2Edit from "./pages/user/program_v2/ProgramV2Edit";
import AdminLogin from "./pages/admin/AdminLogin";

const commonRoutes = [
  { index: true, element: <Main /> },
  { path: "about", element: <About /> },
  {
    path: "program",
    children: [
      { index: true, element: <ProgramV2 /> },
      { path: ":id", element: <ProgramV2Detail /> },
    ],
  },
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
  // 관리자 로그인 페이지
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      ...commonRoutes,
      { path: "news/edit/:id", element: <NewsEdit /> },
      { path: "news/new", element: <NewsEdit /> },
      { path: "program/edit/:id", element: <ProgramV2Edit /> },
      { path: "program/new", element: <ProgramV2Edit /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
