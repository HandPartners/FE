import { Navigate, useLocation } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";

const ADMIN_FLAG_KEY = import.meta.env.VITE_ADMIN_CODE;

const AdminLayout = () => {
  const location = useLocation();
  const isAdmin = sessionStorage.getItem(ADMIN_FLAG_KEY) === "true";

  if (!isAdmin) {
    return (
      <Navigate
        to="/admin/login"
        state={{ from: location.pathname + location.search }}
        replace
      />
    );
  }

  return <DefaultLayout />;
};

export default AdminLayout;
export { ADMIN_FLAG_KEY };
