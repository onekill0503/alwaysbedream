import { cn } from "../../lib/utils";
import { motion, useScroll } from "framer-motion";
import React from "react";

interface ScrollProgressProps {
  className?: string;
}

export const ScrollProgress = React.forwardRef<HTMLDivElement, ScrollProgressProps>(
  ({ className }, ref) => {
    const { scrollYProgress } = useScroll();

    return (
      <motion.div
        ref={ref}
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
          className
        )}
        style={{
          scaleX: scrollYProgress,
        }}
      />
    );
  }
);

ScrollProgress.displayName = "ScrollProgress";