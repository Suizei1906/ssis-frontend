import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  DashboardIcon, UserIcon, SubjectsIcon, GradesIcon,
  ClearanceIcon, DocumentIcon, PaymentsIcon, LogoutIcon,
} from "./Icons.jsx";

const LINKS = [
  { to: "/dashboard", label: "Dashboard", Icon: DashboardIcon },
  { to: "/profile", label: "My Profile", Icon: UserIcon },
  { to: "/subjects", label: "Subjects", Icon: SubjectsIcon },
  { to: "/grades", label: "Grades", Icon: GradesIcon },
  { to: "/clearance", label: "Clearance", Icon: ClearanceIcon },
  { to: "/documents", label: "Document Requests", Icon: DocumentIcon },
  { to: "/payments", label: "Payments", Icon: PaymentsIcon },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="sidebar">
      <nav>
        {LINKS.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => (isActive ? "active" : "")}>
            <Icon />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="logout-row">
        <a href="#logout" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
          <LogoutIcon />
          Log Out
        </a>
      </div>
    </aside>
  );
}
