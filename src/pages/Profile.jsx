import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

function initials(name = "") {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <div className="panel">
        <div className="profile-header">
          <div className="profile-avatar">{initials(user.fullName)}</div>
          <div>
            <h2>{user.fullName}</h2>
            <p>{user.program} · {user.yearLevel} · Student No. {user.studentNo}</p>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3>Personal Information</h3>
          <button className="btn btn-secondary" style={{ width: "auto" }} type="button">
            Edit Profile
          </button>
        </div>
        <div className="detail-grid">
          <div className="detail-item"><div className="k">Full Name</div><div className="v">{user.fullName}</div></div>
          <div className="detail-item"><div className="k">Student Number</div><div className="v">{user.studentNo}</div></div>
          <div className="detail-item"><div className="k">Program</div><div className="v">{user.program}</div></div>
          <div className="detail-item"><div className="k">Year Level</div><div className="v">{user.yearLevel}</div></div>
          <div className="detail-item"><div className="k">Status</div><div className="v">{user.status}</div></div>
          <div className="detail-item"><div className="k">Email Address</div><div className="v">{user.studentNo.toLowerCase()}@uc.edu.ph</div></div>
          <div className="detail-item"><div className="k">Contact Number</div><div className="v">+63 912 345 6789</div></div>
          <div className="detail-item"><div className="k">Address</div><div className="v">Brgy. Banay-banay, City of Cabuyao, Laguna</div></div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header"><h3>Emergency Contact</h3></div>
        <div className="detail-grid">
          <div className="detail-item"><div className="k">Name</div><div className="v">Maria Dela Cruz</div></div>
          <div className="detail-item"><div className="k">Relationship</div><div className="v">Parent</div></div>
          <div className="detail-item"><div className="k">Contact Number</div><div className="v">+63 917 654 3210</div></div>
          <div className="detail-item"><div className="k">Address</div><div className="v">Same as above</div></div>
        </div>
      </div>
    </div>
  );
}
