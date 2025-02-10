import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Slidebar from "./Slidebar/SlideBar";
import IconBreadcrumbs from "../IconBreadcrumbs";
import './Layout.css'

function Layout() {
  return (
    <>
      <Header />
      <div className="main d-flex">
        <div className="slidebarWrapper">
          <Slidebar />
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
