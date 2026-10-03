import React from "react";

const SUBJECTS = [
  { code: "CCS109", title: "System Analysis and Design", units: 3, schedule: "MWF 8:00-9:00 AM", instructor: "Prof. R. Santos" },
  { code: "CCS112", title: "Application Dev. & Emerging Tech.", units: 3, schedule: "TTh 1:00-2:30 PM", instructor: "Prof. L. Reyes" },
  { code: "CSP105", title: "Algorithms and Complexity", units: 3, schedule: "MWF 10:00-11:00 AM", instructor: "Prof. J. Tan" },
  { code: "CSP108", title: "Programming Languages", units: 3, schedule: "TTh 9:00-10:30 AM", instructor: "Prof. A. Cruz" },
  { code: "CCS106", title: "Social Issues and Professional Practice", units: 3, schedule: "F 1:00-4:00 PM", instructor: "Prof. M. Garcia" },
];

const totalUnits = SUBJECTS.reduce((sum, s) => sum + s.units, 0);

export default function Subjects() {
  return (
    <div>
      <div className="welcome-banner">
        <div>
          <h2>My Subjects</h2>
          <p>1st Semester, SY 2026-2027 · {SUBJECTS.length} subjects · {totalUnits} units</p>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header"><h3>Enrolled Subjects</h3></div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Subject Title</th>
              <th>Units</th>
              <th>Schedule</th>
              <th>Instructor</th>
            </tr>
          </thead>
          <tbody>
            {SUBJECTS.map((s) => (
              <tr key={s.code}>
                <td><strong>{s.code}</strong></td>
                <td>{s.title}</td>
                <td>{s.units}</td>
                <td>{s.schedule}</td>
                <td>{s.instructor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
