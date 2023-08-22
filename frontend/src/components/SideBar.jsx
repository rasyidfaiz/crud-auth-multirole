import { NavLink } from 'react-router-dom';
import 'boxicons';

export default function Sidebar() {
  return (
    <div className="drawer">
      <div className="drawer-open min-h-screen bg-base-100 pl-4 pt-2">
        <label htmlFor="my-drawer-3" className="drawer-overlay">
          General
        </label>
        <ul className="menu w-60">
          {/* Sidebar content here */}
          <li>
            <NavLink to="/dashboard">
              <box-icon name="layout"></box-icon>Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">
              <box-icon name="cart"></box-icon>Products
            </NavLink>
          </li>
        </ul>
        <label htmlFor="my-drawer-3" className="drawer-overlay">
          Admin
        </label>
        <ul className="menu w-60">
          {/* Sidebar content here */}
          <li>
            <NavLink to="/users">
              <box-icon name="user-circle"></box-icon>Users
            </NavLink>
          </li>
        </ul>
        <label htmlFor="my-drawer-3" className="drawer-overlay">
          Settings
        </label>
        <ul className="menu w-60">
          {/* Sidebar content here */}
          <li>
            <button>
              <box-icon name="log-out"></box-icon>Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
