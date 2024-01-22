import React from 'react';

/**
 * Apply a Vignette overlay overtop of an element (usually images/backgrounds); a vignette
 * reduces an image's brightness or saturation at its periphery compared to the image center.
 * It creates a focus effect, drawing attention to the center of the image while the edges are
 * softly blurred out.
 */
export const VignetteOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-root [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
  );
};
