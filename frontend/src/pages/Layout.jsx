import NavBar from '../components/NavBar';
import Sidebar from '../components/Sidebar';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="flex" style={{ minHeight: '100vh' }}>
        <div className="flex flex-col">
          <Sidebar />
        </div>
        <div className="flex flex-1 bg-base-300">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
