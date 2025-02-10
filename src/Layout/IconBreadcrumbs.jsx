import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";

const breadcrumbMap = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/mealcalander": "Meal Calendar",
};

const IconBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      <Link to="/" style={{ textDecoration: "none", color: "#1976d2" }}>
        Home
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        return index === pathnames.length - 1 ? (
          <Typography key={to} color="textPrimary">
            {breadcrumbMap[to] || value}
          </Typography>
        ) : (
          <Link key={to} to={to} style={{ textDecoration: "none", color: "#1976d2" }}>
            {breadcrumbMap[to] || value}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default IconBreadcrumbs;
