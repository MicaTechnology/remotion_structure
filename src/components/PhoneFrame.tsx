import React from "react";

export const PhoneFrame: React.FC<{
  children: React.ReactNode;
  scale?: number;
}> = ({ children, scale = 1 }) => {
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      <div
        style={{
          width: 320,
          height: 640,
          borderRadius: 40,
          border: "8px solid #1a1a2e",
          backgroundColor: "#1a1a2e",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Screen - no notch, no status bar, full content area */}
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
