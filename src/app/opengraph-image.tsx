import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Electric Home El Salvador — Ingeniería Eléctrica de Alta Fidelidad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "72px 80px",
          background: "#050505",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,99,33,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 4,
            background: "#FF6321",
          }}
        />

        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Logo / Brand */}
        <div
          style={{
            position: "absolute",
            top: 64,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              background: "#FF6321",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: "3px solid white",
                background: "transparent",
              }}
            />
          </div>
          <span style={{ color: "#ffffff", fontSize: 22, fontWeight: 900, letterSpacing: 2 }}>
            ELECTRIC HOME
          </span>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, zIndex: 1 }}>
          <span
            style={{
              color: "#FF6321",
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Ingeniería Eléctrica — El Salvador
          </span>
          <span
            style={{
              color: "#ffffff",
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 0.95,
              textTransform: "uppercase",
              letterSpacing: -2,
            }}
          >
            Soluciones
            <br />
            <span style={{ color: "#FF6321" }}>Eléctricas</span>
            <br />
            Industriales
          </span>

          <div style={{ display: "flex", gap: 32, marginTop: 24 }}>
            {[
              "Mantenimiento Preventivo",
              "Instalaciones",
              "Emergencias 24/7",
            ].map((item) => (
              <span
                key={item}
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  borderLeft: "2px solid #FF6321",
                  paddingLeft: 10,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* URL */}
        <span
          style={{
            position: "absolute",
            bottom: 32,
            right: 80,
            color: "rgba(255,255,255,0.3)",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          electrichomesv.com
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
