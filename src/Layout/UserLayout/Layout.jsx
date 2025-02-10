import { Outlet } from "react-router-dom";
import IconBreadcrumbs from "../IconBreadcrumbs";
import './Layout.css'
import UserSideBar from './UserSideBar/SlideBar'
import UserHeader from './UserHeader/Header'

function Layout() {
  return (
    <>
      <UserHeader />
      <div className="main d-flex">
        <div className="slidebarWrapper">
          <UserSideBar />
        </div>

        <div className="content flex-grow-1 p-3">
          <IconBreadcrumbs />
          <Outlet /> {/* This renders the child page content */}
        </div>
      </div>
    </>
  );
}

export default Layout;
