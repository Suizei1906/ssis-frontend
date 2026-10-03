import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { SubjectsIcon, GradesIcon, ClearanceIcon, PaymentsIcon } from "../components/Icons.jsx";

const STATS = [
  { Icon: SubjectsIcon, label: "Enrolled Subjects", value: "5" },
  { Icon: GradesIcon, label: "GWA (Last Sem)", value: "1.75" },
  { Icon: ClearanceIcon, label: "Clearance Status", value: "4/5 Cleared" },
  { Icon: PaymentsIcon, label: "Outstanding Balance", value: "₱850.00" },
];

const RECENT_REQUESTS = [
  { id: "DR-1042", type: "Certificate of Enrollment", date: "Sep 10, 2026", status: "Ready for Pickup", ref: "REF-88213" },
  { id: "DR-1039", type: "Transcript of Records (partial)", date: "Sep 02, 2026", status: "Processing", ref: "REF-88190" },
  { id: "DR-1020", type: "Good Moral Certificate", date: "Aug 20, 2026", status: "Released", ref: "REF-88052" },
];

const STATUS_BADGE = {
  "Ready for Pickup": "badge-ready",
  Processing: "badge-processing",
  Released: "badge-released",
};

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="welcome-banner">
        <div>
          <h2>Welcome back, {user.fullName.split(" ")[0]} 👋</h2>
          <p>{user.program} · {user.yearLevel} · 1st Semester, SY 2026-2027</p>
        </div>
        <Link to="/documents" className="btn">+ New Document Request</Link>
      </div>

      <div className="stat-row">
        {STATS.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="icon-badge"><s.Icon /></div>
            <div>
              <div className="label">{s.label}</div>
              <div className="value">{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>Recent Document Requests</h3>
          <Link to="/documents" className="link">View all</Link>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Document</th>
              <th>Date</th>
              <th>Status</th>
              <th>Reference No.</th>
            </tr>
          </thead>
          <tbody>
            {RECENT_REQUESTS.map((r) => (
              <tr key={r.id}>
                <td>{r.type}</td>
                <td>{r.date}</td>
                <td><span className={`badge ${STATUS_BADGE[r.status]}`}>{r.status}</span></td>
                <td>{r.ref}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="announcement-panel">
        <h4>📌 Enrollment for 2nd Semester opens October 15</h4>
        <p>
          Make sure your clearance and outstanding balance are settled before the enrollment
          window opens to avoid delays. Check your Clearance and Payments pages for details.
        </p>
      </div>
    </div>
  );
}
