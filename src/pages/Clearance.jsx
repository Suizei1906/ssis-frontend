import React from "react";
import { CheckCircleIcon, ClearanceIcon } from "../components/Icons.jsx";

const OFFICES = [
  { office: "Library", status: "Cleared" },
  { office: "Guidance Office", status: "Cleared" },
  { office: "Accounting / Cashier", status: "Pending — Outstanding Balance" },
  { office: "Department (College of Computing Studies)", status: "Cleared" },
  { office: "Property Custodian", status: "Cleared" },
];

export default function Clearance() {
  const clearedCount = OFFICES.filter((o) => o.status === "Cleared").length;

  return (
    <div>
      <div className="welcome-banner">
        <div>
          <h2>Clearance Status</h2>
          <p>{clearedCount} of {OFFICES.length} offices cleared · 1st Semester, SY 2026-2027</p>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header"><h3>Clearance Checklist</h3></div>
        <div className="clearance-list">
          {OFFICES.map((o) => {
            const cleared = o.status === "Cleared";
            return (
              <div className={`clearance-item ${cleared ? "cleared" : ""}`} key={o.office}>
                <div className="office">
                  <div className="icon-badge">
                    {cleared ? <CheckCircleIcon width={16} height={16} /> : <ClearanceIcon width={16} height={16} />}
                  </div>
                  {o.office}
                </div>
                <span className={`badge ${cleared ? "badge-ready" : "badge-processing"}`}>{o.status}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
