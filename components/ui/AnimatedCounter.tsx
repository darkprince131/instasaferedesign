"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export function AnimatedCounter({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2,
  separator = ",",
  className,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  separator?: string;
  className?: string;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });
  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp
          end={end}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          duration={duration}
          separator={separator}
        />
      ) : (
        <span>
          {prefix}0{suffix}
        </span>
      )}
    </span>
  );
}
