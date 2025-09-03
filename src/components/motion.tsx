import { motion, AnimatePresence as FramerAnimatePresence } from 'framer-motion'

// Direct exports for Framer Motion components (no SSR concerns in Vite)
export const MotionDiv = motion.div
export const MotionSpan = motion.span
export const MotionP = motion.p
export const AnimatePresence = FramerAnimatePresence