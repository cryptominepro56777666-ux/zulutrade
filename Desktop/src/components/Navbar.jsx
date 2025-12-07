import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "15px", background: "#111", color: "white" }}>
      <Link to="/" style={{ marginRight: 20, color: "white" }}>Home</Link>
      <Link to="/login" style={{ marginRight: 20, color: "white" }}>Login</Link>
      <Link to="/dashboard" style={{ marginRight: 20, color: "white" }}>Dashboard</Link>
      <Link to="/payment" style={{ color: "white" }}>Deposit</Link>
    </nav>
  );
}
