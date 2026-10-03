import React from "react";

const TRANSACTIONS = [
  { or: "OR-55021", desc: "1st Sem Tuition — 2nd Installment", date: "Sep 15, 2026", amount: "₱8,500.00", status: "Paid" },
  { or: "OR-55010", desc: "1st Sem Tuition — 1st Installment", date: "Aug 05, 2026", amount: "₱8,500.00", status: "Paid" },
  { or: "—", desc: "1st Sem Tuition — 3rd Installment", date: "Due Oct 15, 2026", amount: "₱850.00", status: "Overdue" },
];

const STATUS_BADGE = { Paid: "badge-paid", Overdue: "badge-overdue", Pending: "badge-pending" };

export default function Payments() {
  return (
    <div>
      <div className="balance-banner">
        <div>
          <div className="k">Outstanding Balance</div>
          <div className="v">₱850.00</div>
        </div>
        <button className="btn btn-primary btn-auto" type="button">Pay Now</button>
      </div>

      <div className="panel">
        <div className="panel-header"><h3>Payment History</h3></div>
        <table className="data-table">
          <thead>
            <tr><th>OR Number</th><th>Description</th><th>Date</th><th>Amount</th><th>Status</th></tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map((t) => (
              <tr key={t.or + t.desc}>
                <td>{t.or}</td>
                <td>{t.desc}</td>
                <td>{t.date}</td>
                <td>{t.amount}</td>
                <td><span className={`badge ${STATUS_BADGE[t.status]}`}>{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
