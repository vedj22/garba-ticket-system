export default function CancelPage() {
  return (
    <main
      style={{
        maxWidth: "700px",
        margin: "80px auto",
        textAlign: "center",
        fontFamily: "Arial",
        padding: "40px",
      }}
    >
      <h1
        style={{
          color: "#e53935",
          fontSize: "42px",
          marginBottom: "20px",
        }}
      >
        ❌ Payment Cancelled
      </h1>

      <p
        style={{
          fontSize: "20px",
          marginBottom: "15px",
        }}
      >
        Your payment was not completed.
      </p>

      <p
        style={{
          fontSize: "18px",
          color: "#666",
          lineHeight: "28px",
        }}
      >
        Don't worry! Your registration has not been submitted.
        <br />
        You can return to the registration page and complete your payment anytime.
      </p>

      <div style={{ marginTop: "40px" }}>
        <a
          href="/"
          style={{
            background: "#0d6efd",
            color: "white",
            padding: "14px 30px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          ← Back to Registration
        </a>
      </div>
    </main>
  );
}