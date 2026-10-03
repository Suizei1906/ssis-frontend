import React, { useState } from "react";

const TERMS = {
  "1st Sem 2026-2027 (Current)": [
    { code: "CCS109", title: "System Analysis and Design", units: 3, grade: "—" },
    { code: "CCS112", title: "Application Dev. & Emerging Tech.", units: 3, grade: "—" },
    { code: "CSP105", title: "Algorithms and Complexity", units: 3, grade: "—" },
    { code: "CSP108", title: "Programming Languages", units: 3, grade: "—" },
    { code: "CCS106", title: "Social Issues and Professional Practice", units: 3, grade: "—" },
  ],
  "2nd Sem 2025-2026": [
    { code: "CCS101", title: "Introduction to Computing", units: 3, grade: "1.50" },
    { code: "CCS102", title: "Computer Programming 2", units: 3, grade: "1.75" },
    { code: "MATH101", title: "Discrete Mathematics", units: 3, grade: "2.00" },
    { code: "GEC104", title: "Purposive Communication", units: 3, grade: "1.25" },
  ],
};

function computeGwa(subjects) {
  const graded = subjects.filter((s) => s.grade !== "—");
  if (!graded.length) return null;
  const totalUnits = graded.reduce((s, g) => s + g.units, 0);
  const weighted = graded.reduce((s, g) => s + g.units * parseFloat(g.grade), 0);
  return (weighted / totalUnits).toFixed(2);
}

export default function Grades() {
  const [term, setTerm] = useState(Object.keys(TERMS)[1]);
  const subjects = TERMS[term];
  const gwa = computeGwa(subjects);

  return (
    <div>
      <div className="panel">
        <div className="panel-header">
          <h3>My Grades</h3>
          <select value={term} onChange={(e) => setTerm(e.target.value)} style={{ width: "auto", padding: "8px 12px", border: "1px solid var(--border-strong)", borderRadius: 6 }}>
            {Object.keys(TERMS).map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {gwa && (
          <div className="gwa-highlight" style={{ marginBottom: 20 }}>
            <div className="big-num">{gwa}</div>
            <div className="big-label">General Weighted Average<br />for {term}</div>
          </div>
        )}

        <table className="data-table">
          <thead>
            <tr><th>Code</th><th>Subject Title</th><th>Units</th><th>Final Grade</th></tr>
          </thead>
          <tbody>
            {subjects.map((s) => (
              <tr key={s.code}>
                <td><strong>{s.code}</strong></td>
                <td>{s.title}</td>
                <td>{s.units}</td>
                <td>{s.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
