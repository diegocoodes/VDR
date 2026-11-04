'use client';

import { motion, useReducedMotion } from 'motion/react';

export function TextReveal({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <span className="letter-reveal">
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial={false}
        whileInView={reduced ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.013, delayChildren: delay },
          },
        }}
      >
        {text.split(' ').map((word, index) => (
          <span className="reveal-word" key={`${word}-${index}`}>
            {index > 0 && <span className="reveal-space"> </span>}
            {Array.from(word).map((letter, letterIndex) => (
              <motion.span
                className="reveal-letter"
                key={letterIndex}
                variants={{
                  visible: {
                    opacity: [0, 1],
                    y: ['100%', '0%'],
                    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
