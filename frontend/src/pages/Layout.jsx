import NavBar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-1 w-full min-h-screen">
        <div className="flex">
          <Sidebar />
        </div>
        <div className="bg-slate-200 w-screen">
          <NavBar />
          <main className="px-8 py-5">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
