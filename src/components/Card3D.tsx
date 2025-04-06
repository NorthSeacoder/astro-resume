
import React, { useState } from 'react';
import { motion, MotionStyle, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  perspective?: number;
  dampingRatio?: number;
  stiffness?: number;
  shadow?: boolean;
  cardStyle?: MotionStyle;
}

const Card3D = ({
  children,
  className,
  depth = 10,
  perspective = 1000,
  dampingRatio = 0.7,
  stiffness = 100,
  shadow = true,
  cardStyle
}: Card3DProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values for tracking mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring animations for smoother movement
  const springX = useSpring(x, { damping: dampingRatio * 40, stiffness });
  const springY = useSpring(y, { damping: dampingRatio * 40, stiffness });
  
  // Transform spring values into rotation values
  const rotateX = useTransform(springY, [-0.5, 0.5], [depth, -depth]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-depth, depth]);
  
  // Transform for card elevation on hover
  const translateZ = useSpring(isHovered ? 20 : 0, {
    damping: dampingRatio * 40,
    stiffness
  });
  
  // Shadow blur and opacity based on hover state
  const shadowBlur = useSpring(isHovered ? 30 : 15, {
    damping: dampingRatio * 40,
    stiffness
  });
  const shadowOpacity = useSpring(isHovered ? 0.3 : 0.1, {
    damping: dampingRatio * 40,
    stiffness
  });
  
  // Handle mouse move to calculate the rotation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Calculate position (0-1) within the element
    const posX = (e.clientX - rect.left) / rect.width - 0.5;
    const posY = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(posX);
    y.set(posY);
  };
  
  return (
    <motion.div
      className={cn(
        "relative backface-visibility-hidden", 
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={{
        perspective,
        transformStyle: "preserve-3d",
        ...(cardStyle || {})
      }}
    >
      <motion.div
        className={cn(
          "w-full h-full backface-visibility-hidden",
          shadow ? "transition-shadow duration-300" : ""
        )}
        style={{
          rotateX,
          rotateY,
          translateZ,
          transformStyle: "preserve-3d",
          boxShadow: shadow 
            ? `0px ${shadowBlur}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity})` 
            : "none",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Card3D;
