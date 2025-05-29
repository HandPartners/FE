import clsx from "clsx"
import type { PropsWithChildren } from "react"
import { NavLink } from "react-router-dom"

interface NavBarBtnProps {
  isAdmin: boolean
  path: string
}

const NavBarBtn: React.FC<PropsWithChildren<NavBarBtnProps>> = ({children, isAdmin, path}) => {
return <NavLink to={isAdmin ? `/admin/${path}` : path}>
{({ isActive }) => (
  <span
    className={` cursor-pointer inline-block text-center transition-colors duration-250 ease-in-out hover:text-[#b8cce1]
      ${clsx(isActive ? "h5-bold text-main" : "h5-medium")}`}
  >
    {children}
  </span>
)}
</NavLink>

}

export default NavBarBtn