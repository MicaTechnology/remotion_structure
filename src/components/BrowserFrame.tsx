import React from "react";

export const BrowserFrame: React.FC<{
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
          width: 900,
          borderRadius: 12,
          border: "3px solid #2a2a3e",
          backgroundColor: "#2a2a3e",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Browser toolbar */}
        <div
          style={{
            height: 36,
            backgroundColor: "#2a2a3e",
            display: "flex",
            alignItems: "center",
            paddingLeft: 14,
            gap: 7,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#febc2e",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#28c840",
            }}
          />
          <div
            style={{
              marginLeft: 16,
              flex: 1,
              height: 22,
              backgroundColor: "#1a1a2e",
              borderRadius: 6,
              marginRight: 14,
            }}
          />
        </div>
        {/* Content */}
        <div
          style={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
