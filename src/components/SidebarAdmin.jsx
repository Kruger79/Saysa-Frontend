import React from "react";
import { FaTachometerAlt, FaUsers, FaBoxOpen } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import "../../public/css/AdminDashboard.css"; // Ya ahí está todo el estilo

export default function SidebarAdmin({ vertical = false }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={vertical ? "sidebar-admin-vertical" : "sidebar-admin-horizontal"}>
      <ul className="sidebar-menu list-unstyled d-flex gap-3 mb-0">
        <li>
          <Link
            to="/admin"
            className={`sidebar-link d-flex align-items-center gap-1 ${
              isActive("/admin") ? "active-link" : ""
            }`}
          >
            <FaTachometerAlt /> {vertical && "Dashboard"}
          </Link>
        </li>
        <li>
          <Link
            to="/admin/usuarios"
            className={`sidebar-link d-flex align-items-center gap-1 ${
              isActive("/admin/usuarios") ? "active-link" : ""
            }`}
          >
            <FaUsers /> {vertical && "Usuarios"}
          </Link>
        </li>
        <li>
          <Link
            to="/admin/productos"
            className={`sidebar-link d-flex align-items-center gap-1 ${
              isActive("/admin/productos") ? "active-link" : ""
            }`}
          >
            <FaBoxOpen /> {vertical && "Productos"}
          </Link>
        </li>
      </ul>
    </div>
  );
}