import { NavLink } from 'react-router-dom';
import 'boxicons';

const Sidebar = () => {
  return (
    <>
      <div className="drawer">
        <div className="drawer-open bg-base-100">
          <div className="bg-slate-500 px-5 py-5 text-center">
            <box-icon name="game"></box-icon>
            <h1 className="font-bold text-lg text-center">CRUD</h1>
          </div>
          <ul className="menu w-60">
            <label htmlFor="my-drawer-3" className="drawer-overlay">
              General
            </label>
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
          <ul className="menu w-60">
            <label htmlFor="my-drawer-3" className="drawer-overlay">
              Admin
            </label>
            <li>
              <NavLink to="/users">
                <box-icon name="user-circle"></box-icon>Users
              </NavLink>
            </li>
          </ul>
          <ul className="menu w-60">
            <h1 htmlFor="my-drawer-3" className="drawer-overlay">
              Settings
            </h1>
            <li>
              <button>
                <box-icon name="log-out"></box-icon>Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
