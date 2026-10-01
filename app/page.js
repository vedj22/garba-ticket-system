"use client";
 
import Image from "next/image";
import { useState } from "react";
 
const PRICE = 10;
const MAX_TICKETS = 20;
 
export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // Stored as a string so the field can be cleared while typing
  const [ticketsInput, setTicketsInput] = useState("1");
  const [loading, setLoading] = useState(false);
 
  const parsed = parseInt(ticketsInput, 10);
  const tickets = Number.isNaN(parsed)
    ? 0
    : Math.min(Math.max(parsed, 0), MAX_TICKETS);
  const total = PRICE * tickets;
 
  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
 
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    if (tickets < 1) {
      alert(`Please choose between 1 and ${MAX_TICKETS} tickets.`);
      return;
    }
 
    setLoading(true);
 
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          tickets,
        }),
      });
 
      const data = await res.json().catch(() => ({}));
 
      if (res.ok && data.url) {
        // Keep the button disabled while the browser redirects
        window.location.href = data.url;
        return;
      }
 
      alert(data.error || "Unable to create Stripe Checkout.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
 
    setLoading(false);
  }
 
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        background:
          "linear-gradient(135deg, #4b0f1f 0%, #8b1e3f 40%, #f39c12 100%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Card wrapper: this was missing, which broke the layout and left a stray </div> */}
      <div
        style={{
          background: "white",
          width: "100%",
          maxWidth: 520,
          padding: 30,
          borderRadius: 20,
          boxShadow: "0 20px 50px rgba(0,0,0,.3)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Image
            src="/logo.png"
            alt="Radhe Krishna Sangeet"
            width={170}
            height={170}
            priority
            style={{
              borderRadius: "50%",
              boxShadow: "0 10px 25px rgba(0,0,0,.25)",
            }}
          />
        </div>
 
        <h2 style={{ textAlign: "center", color: "#222", marginBottom: 5 }}>
          Radhe Krishna Sangeet
        </h2>
        <h3
          style={{
            textAlign: "center",
            color: "#666",
            marginTop: 0,
            marginBottom: 20,
            fontWeight: "normal",
          }}
        >
          &amp; Vedant Music Academy
        </h3>
 
        <h1 style={{ textAlign: "center", color: "#d32f2f" }}>
          🎉 Navratri Garba 2026
        </h1>
        <p style={{ textAlign: "center", color: "#666" }}>
          Friday, October 23, 2026
        </p>
        <p style={{ textAlign: "center", color: "#444", fontWeight: "bold" }}>
          🕖 7:00 PM – 11:00 PM
        </p>
        <p style={{ textAlign: "center", color: "#444" }}>
          📍 Simkus Recreation Center, Carol Stream, Illinois
        </p>
        <p
          style={{
            textAlign: "center",
            color: "#e65100",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          🎟️ ${PRICE} Per Ticket • Kids Under 12 FREE
        </p>
 
        <hr style={{ margin: "25px 0" }} />
 
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" style={label}>
            Full Name
          </label>
          <input
            id="name"
            placeholder="Enter your full name"
            autoComplete="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            style={input}
          />
 
          <label htmlFor="email" style={label}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            autoComplete="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />
 
          <label htmlFor="phone" style={label}>
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(123) 456-7890"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
            style={input}
          />
 
          <label htmlFor="tickets" style={label}>
            Number of Tickets
          </label>
          <input
            id="tickets"
            type="number"
            min="1"
            max={MAX_TICKETS}
            step="1"
            required
            inputMode="numeric"
            value={ticketsInput}
            onChange={(e) => setTicketsInput(e.target.value)}
            style={input}
          />
 
          <div
            style={{
              background: "#FFF8E8",
              border: "1px solid #FFD54F",
              padding: 20,
              borderRadius: 10,
              marginBottom: 25,
            }}
          >
            <h2 style={{ margin: 0, color: "#222" }}>Total: ${total}</h2>
            <p style={{ color: "#666", marginTop: 10, marginBottom: 0 }}>
              ${PRICE} per ticket × {tickets} ticket{tickets === 1 ? "" : "s"}
            </p>
          </div>
 
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 16,
              background: "linear-gradient(135deg,#ff6a00,#ee0979)",
              color: "white",
              border: "none",
              borderRadius: 10,
              fontSize: 18,
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              boxShadow: "0 10px 25px rgba(238,9,121,.35)",
              transition: "0.3s",
            }}
          >
            {loading
              ? "Redirecting to Secure Payment..."
              : "Continue to Secure Payment"}
          </button>
 
          <p
            style={{
              textAlign: "center",
              marginTop: 20,
              color: "#666",
              fontSize: 14,
            }}
          >
            🔒 Secure payment powered by Stripe
          </p>
        </form>
 
        <hr style={{ marginTop: 30 }} />
 
        <p
          style={{
            textAlign: "center",
            color: "#666",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          Thank you for supporting
          <br />
          <strong>Radhe Krishna Sangeet &amp; Vedant Music Academy</strong>
        </p>
      </div>
    </main>
  );
}
 
const label = {
  display: "block",
  color: "#333",
  fontWeight: "bold",
  fontSize: 14,
};
 
const input = {
  width: "100%",
  padding: "14px",
  marginTop: "8px",
  marginBottom: "18px",
  border: "2px solid #e5e7eb",
  borderRadius: "10px",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
  color: "#222",
  background: "white",
};