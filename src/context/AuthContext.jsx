import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Mock "database" of accounts for the front-end demo.
// Replace with a real API call once the backend (Registrar/Admin module) is ready.
const MOCK_ACCOUNTS = {
  "21-0001": {
    password: "password123",
    studentNo: "21-0001",
    fullName: "Juan Dela Cruz",
    program: "BSIT",
    yearLevel: "3rd Year",
    status: "Regular",
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(studentNo, password) {
    const account = MOCK_ACCOUNTS[studentNo];
    if (!account || account.password !== password) {
      return { ok: false, message: "Incorrect student number or password." };
    }
    setUser(account);
    return { ok: true };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
