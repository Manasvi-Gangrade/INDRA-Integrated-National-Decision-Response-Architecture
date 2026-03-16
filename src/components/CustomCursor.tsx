import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <>
      {/* Subtle Background Glow */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[9998] opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(56, 189, 248, 0) 70%)',
        }}
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
    </>
  );
}
