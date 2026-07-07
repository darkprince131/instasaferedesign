"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Word-by-word mask reveal. Each word rises from behind a clip on scroll-in.
 */
export function AnimatedText({
  text,
  className,
  delay = 0,
  highlight = [],
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  highlight?: string[];
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[Tag];

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
    >
      {words.map((word, i) => {
        const isHi = highlight.includes(word.replace(/[.,]/g, ""));
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
          >
            <motion.span
              className={isHi ? "grad-text inline-block" : "inline-block"}
              variants={{
                hidden: { y: "110%", opacity: 0 },
                show: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}
