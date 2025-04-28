import React from "react";
import { FaTachometerAlt, FaUsers, FaBoxOpen } from "react-icons/fa";
import { useLocation, Link } from "react-router-dom";
import "../../public/css/AdminDashboard.css"; // Ya ahí está todo el estilo

export default function SidebarAdmin() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="admin-sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link
            to="/admin"
            className={`sidebar-link ${
              isActive("/admin") ? "active-link" : ""
            }`}
          >
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/usuarios"
            className={`sidebar-link ${
              isActive("/admin/usuarios") ? "active-link" : ""
            }`}
          >
            <FaUsers /> Usuarios
          </Link>
        </li>
        <li>
          <Link
            to="/admin/productos"
            className={`sidebar-link ${
              isActive("/admin/productos") ? "active-link" : ""
            }`}
          >
            <FaBoxOpen /> Productos
          </Link>
        </li>
      </ul>
    </aside>
  );
}
