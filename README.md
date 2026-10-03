# SSIS Front End (React)

A React front end for the CuyoTech University Student Services Information
System (SSIS). Built with Vite + React Router, no UI framework dependency
(plain CSS, tokens in `src/styles/index.css`, icons as inline SVGs in
`src/components/Icons.jsx`) so it drops into any React setup.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

Demo login: **Student No.** `21-0001` / **Password** `password123`
(see `src/context/AuthContext.jsx` — replace `MOCK_ACCOUNTS` with a real
API call once the backend exists).

## Pages

| Route | Page | Notes |
|---|---|---|
| `/login` | Login | Split-screen layout, real validation, show/hide password |
| `/dashboard` | Dashboard | Welcome banner, 4 stat cards, recent requests table, announcement |
| `/documents` | Document Request | Real 3-step flow: Details → Review → Submit, with live fee calc |
| `/profile` | My Profile | Personal + emergency contact info |
| `/subjects` | Subjects | Enrolled subjects table with units/schedule |
| `/grades` | Grades | Per-term grades with live GWA calculation |
| `/clearance` | Clearance | Per-office clearance checklist |
| `/payments` | Payments | Outstanding balance + payment history |

## Project structure

```
src/
  main.jsx                    entry point, wraps App in BrowserRouter
  App.jsx                     all routes
  context/AuthContext.jsx     mock auth state (swap for real API later)
  components/
    Icons.jsx                  inline SVG icon set (no external icon lib)
    Sidebar.jsx                 left nav, icon + label per route
    Topbar.jsx                  logo, search bar, notification bell, avatar
    ProtectedLayout.jsx         full-width topbar + sidebar/content split,
                                 redirects to /login if not authenticated
  pages/
    Login.jsx                   split-screen sign-in
    Dashboard.jsx                stats + recent requests + announcement
    DocumentRequest.jsx          3-step request flow (Details/Review/Submit)
    Profile.jsx                  student profile + emergency contact
    Subjects.jsx                 enrolled subjects table
    Grades.jsx                   grades by term + GWA
    Clearance.jsx                clearance checklist by office
    Payments.jsx                 balance + payment history
  styles/index.css               design tokens + all component styles
```

## What's wired up vs. mocked

Everything renders from mock data defined at the top of each page file
(`MOCK_ACCOUNTS`, `STATS`, `SUBJECTS`, `TERMS`, `OFFICES`, `TRANSACTIONS`,
etc.) — swap these for real API calls as each backend module is built:

- **Login** validates against a mock in-memory account with real inline
  errors and a working show/hide password toggle.
- **Document Request** is a fully working 3-step form: step validation,
  live fee calculation (base fee × copies + delivery surcharge), a review
  screen, and a confirmation screen with a generated reference number.
  Swap `confirmSubmit` in `DocumentRequest.jsx` for a real POST.
- **Grades** computes GWA client-side from the selected term's subjects —
  the formula in `computeGwa()` is ready to run on real grade data.
- **Dashboard / Subjects / Clearance / Payments** render static mock
  arrays — replace each with a `fetch`/`axios` call to the matching
  endpoint when available.

## Extending further

Registrar, Cashier, Department, and Admin-facing modules aren't included
— everything here is the student-facing side. The same pattern (a page
component in `src/pages/`, an icon in `Icons.jsx` if needed, a route in
`App.jsx`, styled with the existing tokens in `index.css`) extends
cleanly to those modules when you're ready to build them.
