"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");
  const email = searchParams.get("email");

  return (
    <main
      style={{
        maxWidth: "600px",
        margin: "80px auto",
        textAlign: "center",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ color: "green", fontSize: "42px" }}>
        🎉 Payment Successful!
      </h1>

      <p style={{ fontSize: "20px", marginTop: "20px" }}>
        Thank you for purchasing your Garba tickets.
      </p>

      <p>Your payment has been received successfully.</p>

      <h2 style={{ marginTop: "40px" }}>
        See you on October 23, 2026!
      </h2>

      <hr style={{ margin: "30px 0" }} />

      <p>
        <strong>Email:</strong> {email}
      </p>

      <p style={{ wordBreak: "break-all" }}>
        <strong>Session ID:</strong> {sessionId}
      </p>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SuccessContent />
    </Suspense>
  );
}