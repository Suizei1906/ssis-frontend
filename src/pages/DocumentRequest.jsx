import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { DocumentIcon, CheckCircleIcon } from "../components/Icons.jsx";

const DOCUMENT_TYPES = [
  { id: "tor", name: "Transcript of Records", time: "3-5 working days", fee: 150 },
  { id: "cor", name: "Certificate of Registration", time: "Same day", fee: 50 },
  { id: "goodmoral", name: "Good Moral Certificate", time: "1-2 working days", fee: 75 },
];

const HISTORY = [
  { name: "Certificate of Enrollment", date: "Sep 10, 2026", status: "Ready for Pickup" },
  { name: "Good Moral Certificate", date: "Aug 20, 2026", status: "Released" },
];

const STATUS_BADGE = {
  "Ready for Pickup": "badge-ready",
  Processing: "badge-processing",
  Released: "badge-released",
};

const STEPS = [
  { n: 1, label: "Details" },
  { n: 2, label: "Review" },
  { n: 3, label: "Submit" },
];

function StepIndicator({ step }) {
  return (
    <div className="step-indicator">
      {STEPS.map((s, i) => (
        <React.Fragment key={s.n}>
          <div className={`step ${step === s.n ? "active" : ""} ${step > s.n ? "done" : ""}`}>
            <div className="circle">{step > s.n ? "✓" : s.n}</div>
            <div className="step-label">{s.label}</div>
          </div>
          {i < STEPS.length - 1 && <div className={`connector ${step > s.n ? "done" : ""}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function DocumentRequest() {
  const [step, setStep] = useState(1);
  const [docTypeId, setDocTypeId] = useState("tor");
  const [purpose, setPurpose] = useState("");
  const [copies, setCopies] = useState(1);
  const [claimMethod, setClaimMethod] = useState("pickup");
  const [error, setError] = useState("");
  const [refNo, setRefNo] = useState("");

  const docType = DOCUMENT_TYPES.find((d) => d.id === docTypeId);
  const total = useMemo(() => (docType?.fee ?? 0) * Math.max(1, copies), [docType, copies]);

  function goToReview() {
    if (!purpose.trim()) {
      setError("Please provide a purpose for this request.");
      return;
    }
    setError("");
    setStep(2);
  }

  function confirmSubmit() {
    setRefNo(`REF-${Math.floor(80000 + Math.random() * 9999)}`);
    setStep(3);
  }

  function startOver() {
    setStep(1);
    setDocTypeId("tor");
    setPurpose("");
    setCopies(1);
    setClaimMethod("pickup");
    setError("");
  }

  return (
    <div>
      <div className="page-title-block">
        <h2>New Document Request</h2>
        <StepIndicator step={step} />
      </div>

      {step === 1 && (
        <>
          <div className="doc-type-row">
            {DOCUMENT_TYPES.map((d) => (
              <button
                key={d.id}
                type="button"
                className={`doc-type-card ${docTypeId === d.id ? "selected" : ""}`}
                onClick={() => setDocTypeId(d.id)}
              >
                <div className="icon-badge"><DocumentIcon /></div>
                <div>
                  <div className="name">{d.name}</div>
                  <div className="meta">{d.time} · ₱{d.fee.toFixed(2)}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="step-layout">
            <div className="panel">
              <div className="panel-header"><h3>Request Details</h3></div>

              <div className="field">
                <label htmlFor="purpose">
                  Purpose<span className="req">*</span>
                </label>
                <select id="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
                  <option value="">Select purpose</option>
                  <option value="employment">Employment application</option>
                  <option value="transfer">Transfer to another school</option>
                  <option value="scholarship">Scholarship application</option>
                  <option value="board">Board exam requirement</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="field">
                <label>
                  No. of Copies<span className="req">*</span>
                </label>
                <div className="stepper-input">
                  <button type="button" onClick={() => setCopies((c) => Math.max(1, c - 1))}>−</button>
                  <span>{copies}</span>
                  <button type="button" onClick={() => setCopies((c) => c + 1)}>+</button>
                </div>
              </div>

              <div className="field">
                <label>
                  Claim Method<span className="req">*</span>
                </label>
                <div className="option-row">
                  <button
                    type="button"
                    className={`option-btn ${claimMethod === "pickup" ? "selected" : ""}`}
                    onClick={() => setClaimMethod("pickup")}
                  >
                    Pick up at Registrar
                  </button>
                  <button
                    type="button"
                    className={`option-btn ${claimMethod === "delivery" ? "selected" : ""}`}
                    onClick={() => setClaimMethod("delivery")}
                  >
                    Delivery (+₱80.00)
                  </button>
                </div>
              </div>

              {error && <div className="error-banner">{error}</div>}
              <p className="required-note">* Required fields</p>
            </div>

            <div className="panel fee-summary-panel">
              <div className="panel-header"><h3>Fee Summary</h3></div>
              <div className="fee-row">
                <span className="item-label">{docType.name} × {copies}</span>
                <span className="item-price">₱{(docType.fee * copies).toFixed(2)}</span>
              </div>
              {claimMethod === "delivery" && (
                <div className="fee-row">
                  <span className="item-label">Delivery fee</span>
                  <span className="item-price">₱80.00</span>
                </div>
              )}
              <div className="fee-total-row">
                <span>Total</span>
                <span className="amount">
                  ₱{(total + (claimMethod === "delivery" ? 80 : 0)).toFixed(2)}
                </span>
              </div>
              <p className="fee-note">Payment is collected at the Cashier upon approval.</p>
              <button className="btn btn-primary" onClick={goToReview}>Next: Review</button>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header"><h3>Request History</h3></div>
            <table className="data-table">
              <thead>
                <tr><th>Document</th><th>Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {HISTORY.map((h) => (
                  <tr key={h.name + h.date}>
                    <td>{h.name}</td>
                    <td>{h.date}</td>
                    <td><span className={`badge ${STATUS_BADGE[h.status]}`}>{h.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {step === 2 && (
        <div className="panel" style={{ maxWidth: 560 }}>
          <div className="panel-header"><h3>Review Your Request</h3></div>

          <div className="detail-grid">
            <div className="detail-item"><div className="k">Document Type</div><div className="v">{docType.name}</div></div>
            <div className="detail-item"><div className="k">Copies</div><div className="v">{copies}</div></div>
            <div className="detail-item"><div className="k">Purpose</div><div className="v">{purpose || "—"}</div></div>
            <div className="detail-item"><div className="k">Claim Method</div><div className="v">{claimMethod === "pickup" ? "Pick up at Registrar" : "Delivery"}</div></div>
          </div>

          <div className="fee-total-row" style={{ marginTop: 20 }}>
            <span>Total Due</span>
            <span className="amount">₱{(total + (claimMethod === "delivery" ? 80 : 0)).toFixed(2)}</span>
          </div>

          <div className="form-actions">
            <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
            <div className="right-group">
              <button className="btn btn-primary btn-auto" onClick={confirmSubmit}>Confirm & Submit</button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="panel" style={{ maxWidth: 480, textAlign: "center", padding: "40px 32px" }}>
          <div style={{ color: "var(--success)", marginBottom: 12 }}>
            <CheckCircleIcon width={44} height={44} />
          </div>
          <h3 style={{ margin: "0 0 8px" }}>Request Submitted</h3>
          <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
            Your reference number is <strong>{refNo}</strong>. You'll be notified once it's
            ready for {claimMethod === "pickup" ? "pickup" : "delivery"}.
          </p>
          <div className="form-actions" style={{ justifyContent: "center", marginTop: 24 }}>
            <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
            <button className="btn btn-primary btn-auto" onClick={startOver}>New Request</button>
          </div>
        </div>
      )}
    </div>
  );
}
