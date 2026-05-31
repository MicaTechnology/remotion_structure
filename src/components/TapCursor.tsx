import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";

/**
 * Animated cursor that moves to a target position and "taps" (shrinks + ripple).
 * Position is relative to the parent container (use absolute positioning).
 */
export const TapCursor: React.FC<{
  /** X position (%) where the tap lands */
  targetX: number;
  /** Y position (%) where the tap lands */
  targetY: number;
  /** Frame at which cursor starts appearing */
  startFrame?: number;
  /** Frame at which the tap happens */
  tapFrame?: number;
}> = ({ targetX, targetY, startFrame = 15, tapFrame = 40 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cursor fades in
  const cursorOpacity = interpolate(
    frame,
    [startFrame, startFrame + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Cursor moves from offset to target
  const moveProgress = interpolate(
    frame,
    [startFrame, tapFrame - 5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const cursorX = interpolate(moveProgress, [0, 1], [targetX + 15, targetX]);
  const cursorY = interpolate(moveProgress, [0, 1], [targetY - 20, targetY]);

  // Tap press effect
  const isTapping = frame >= tapFrame && frame <= tapFrame + 8;
  const tapScale = isTapping
    ? spring({
        frame: frame - tapFrame,
        fps,
        config: { damping: 8, stiffness: 200 },
        durationInFrames: 8,
      })
    : 0;

  const cursorScale = isTapping ? 0.85 : 1;

  // Ripple
  const rippleOpacity = interpolate(
    frame,
    [tapFrame, tapFrame + 15],
    [0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const rippleScale = interpolate(
    frame,
    [tapFrame, tapFrame + 15],
    [0.3, 1.5],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: `${cursorX}%`,
        top: `${cursorY}%`,
        zIndex: 100,
        pointerEvents: "none",
        opacity: cursorOpacity,
      }}
    >
      {/* Ripple ring */}
      {frame >= tapFrame && (
        <div
          style={{
            position: "absolute",
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: "3px solid rgba(114, 221, 163, 0.8)",
            transform: `translate(-50%, -50%) scale(${rippleScale})`,
            opacity: rippleOpacity,
          }}
        />
      )}
      {/* Cursor dot */}
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          border: "3px solid rgba(114, 221, 163, 0.9)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          transform: `translate(-50%, -50%) scale(${cursorScale + tapScale * 0.15})`,
        }}
      />
    </div>
  );
};
