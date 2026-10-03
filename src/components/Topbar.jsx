import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { SearchIcon, BellIcon } from "./Icons.jsx";

function initials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="topbar">
      <div className="sidebar-logo" style={{ marginBottom: 0 }}>LOGO</div>

      <div className="topbar-search">
        <SearchIcon width={15} height={15} />
        <span>Search documents, subjects, announcements…</span>
      </div>

      <div className="topbar-spacer" />

      <button className="topbar-icon-btn" type="button" aria-label="Notifications">
        <BellIcon width={16} height={16} />
        <span className="dot-badge" />
      </button>

      <div className="topbar-user">
        <div className="avatar">{initials(user?.fullName)}</div>
        {user?.fullName ?? "Guest"}
      </div>
    </header>
  );
}
