import { useState, useEffect } from "react";

// --- Sun Position Algorithm ---
// The SVG path is a quadratic Bézier: M0,40 Q100,-20 200,40
// Control points: P0=(0,40), P1=(100,-20), P2=(200,40)
// Parametric form:  B(t) = (1-t)²·P0 + 2(1-t)t·P1 + t²·P2
// t ranges from 0 (sunrise) to 1 (sunset).
// We compute t = (now - sunrise) / (sunset - sunrise)
// then plug t into the Bézier to get (cx, cy).

function parseTo24h(timeStr) {
  // Parses "6:30" or "17:45" → fractional hours
  const [h, m] = timeStr.split(":").map(Number);
  return h + m / 60;
}

function getQuadraticBezier(t) {
  // P0=(0,40)  P1=(100,-20)  P2=(200,40)
  const mt = 1 - t;
  const cx = mt * mt * 0 + 2 * mt * t * 100 + t * t * 200;
  const cy = mt * mt * 40 + 2 * mt * t * -100 + t * t * 40;
  return { cx, cy };
}

export default function SunriseTimeline( {sunrise, sunset} ) {
  const [sunPos, setSunPos] = useState({ cx: 100, cy: 10 });
  const [isNight, setIsNight] = useState(false);

  // ─── Demo values — swap these for real geolocation sunrise/sunset ───
  useEffect(() => {
    function update() {
      const now = new Date();
      const nowHours = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
      const sunriseH = parseTo24h(sunrise);
      const sunsetH = parseTo24h(sunset);

      if (nowHours < sunriseH || nowHours > sunsetH) {
        // Night: sun is invisible (black, placed off or at edge)
        setIsNight(true);
        // Park it at the nearest horizon edge so it doesn't jump
        const t = nowHours < sunriseH ? -0.07 : 1.07;
        setSunPos(getQuadraticBezier(t));
      } else {
        setIsNight(false);
        // Normalize current time to [0, 1] between sunrise and sunset
        const t = (nowHours - sunriseH) / (sunsetH - sunriseH);
        setSunPos(getQuadraticBezier(t));
      }
    }

    update(); // run immediately
    const interval = setInterval(update, 1000); // refresh every second
    return () => clearInterval(interval);
  }, [sunrise, sunset]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 312,
        margin: "40px auto",
        padding: "0 12px",
      }}
      className="sunrise-timeline"
    >
      <svg
        width="100%"
        height="40"
        viewBox="0 0 200 40"
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
      >
        {/* Dashed arc */}
        <path
          d="M0,40 Q100,-100 200,40"
          fill="none"
          stroke="rgba(15, 23, 42, 0.4)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Sun circle — black at night, golden during the day */}
        <circle
          cx={sunPos.cx}
          cy={sunPos.cy}
          r="8"
          fill={isNight ? "#111111f5" : "#FFB020"}
          style={{
            filter: isNight
              ? "drop-shadow(0 0 4px rgba(0,0,0,0.4))"
              : "drop-shadow(0 0 8px rgba(255, 176, 32, 0.8))",
            transition: "fill 0.6s ease, cx 0.3s linear, cy 0.3s linear",
          }}
        />
      </svg>

      {/* Sunrise label */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: -20,
          fontSize: 12,
          color: "var(--muted-foreground, #64748b)",
        }}
      >
        {sunrise}
      </div>

      {/* Sunset label */}
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: -20,
          fontSize: 12,
          color: "var(--muted-foreground, #64748b)",
        }}
      >
        {sunset}
      </div>
    </div>
  );
}