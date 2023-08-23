import { useState } from "react";
import { NavLink } from "react-router-dom";
import css from "./navbarUser.module.scss";
import { getCurrentUser } from "../../../store/user";
import { useSelector } from "react-redux";

const NavbarUser = () => {
  const [isOpen, setOpen] = useState(false);
  const user = useSelector(getCurrentUser());
  const { name } = user;

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setOpen(!isOpen)}
        >
          {name}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {/* <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */}
      <div
        className={
          "absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none " +
          (isOpen ? css.open : css.close)
        }
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        <div className="py-1" role="none">
          {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
          <NavLink
            to="/passport/profile"
            className="text-gray-700 block px-4 py-2 text-sm hover:text-gray-900 hover:bg-gray-100"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-2"
          >
            Профиль
          </NavLink>
          <NavLink
            to="/passport/edit"
            className="text-gray-700 block px-4 py-2 text-sm hover:text-gray-900 hover:bg-gray-100"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-3"
          >
            Редактировать
          </NavLink>
        </div>
        <div className="py-1" role="none">
          <NavLink
            to="/admin"
            className="text-gray-700 block px-4 py-2 text-sm hover:text-gray-900 hover:bg-gray-100"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-4"
          >
            Админ панель
          </NavLink>
        </div>
        <div className="py-1" role="none">
          <NavLink
            to="/logout"
            className="text-gray-700 block px-4 py-2 text-sm hover:text-gray-900 hover:bg-gray-100"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-6"
          >
            Выйти
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavbarUser;
