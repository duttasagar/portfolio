import React from "react";
import Particles from "./Particles";

export const MovingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      <Particles
        // particleColors={["#8B5CF6", "#A855F7"]}
         particleColors={["#8B5CF6", "#A855F7", "#7C3AED"]}
        particleCount={320}
        particleSpread={15}
        speed={0.05}
        particleBaseSize={60}
        moveParticlesOnHover
        alphaParticles={true}
      />
    </div>
  );
};
