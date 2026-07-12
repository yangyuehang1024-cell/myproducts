import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplitText({
  text = '',
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete,
}) {
  const ref = useRef(null);
  const completeRef = useRef(onLetterAnimationComplete);
  const fromKey = JSON.stringify(from);
  const toKey = JSON.stringify(to);
  const parts = useMemo(() => {
    if (splitType.includes('words') && !splitType.includes('chars')) {
      return text.split(/(\s+)/).map((part, index) => ({ part, key: `${part}-${index}` }));
    }

    return Array.from(text).map((part, index) => ({ part, key: `${part}-${index}` }));
  }, [splitType, text]);

  useEffect(() => {
    completeRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (!ref.current || !text) return undefined;

    const el = ref.current;
    const targets = el.querySelectorAll('[data-split-part]');
    if (!targets.length) return undefined;

    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
    const sign =
      marginValue === 0
        ? ''
        : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
    const start = `top ${(1 - threshold) * 100}%${sign}`;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { ...JSON.parse(fromKey) },
        {
          ...JSON.parse(toKey),
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
          },
          onComplete: () => completeRef.current?.(),
          force3D: true,
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration, ease, fromKey, rootMargin, splitType, text, threshold, toKey]);

  const Tag = tag || 'p';

  return (
    <Tag
      ref={ref}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        overflow: 'hidden',
        display: 'inline-block',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        willChange: 'transform, opacity',
      }}
    >
      {parts.map(({ part, key }) => (
        <span className="split-part" data-split-part key={key}>
          {part === ' ' ? '\u00a0' : part}
        </span>
      ))}
    </Tag>
  );
}
