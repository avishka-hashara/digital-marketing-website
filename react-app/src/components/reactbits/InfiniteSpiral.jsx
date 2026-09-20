import React, { useRef, useEffect, useState } from 'react';

const InfiniteSpiral = ({
  items = [],
  speed = 0.5,
  radius = 200,
  cardWidth = 150,
  cardHeight = 150,
  verticalSpacing = 80,
  perspective = 1000,
  cardRadius = 20,
  centerScale = 1.15,
  edgeBlur = 0,
  edgeFade = 0.7,
  cardsPerTurn = 6,
  grayscale = 0,
  pauseOnHover = true,
  animationMode = 'all',
  className = '',
}) => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartProgressRef = useRef(0);
  const didDragRef = useRef(false);
  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.pageYOffset : 0);
  const lastTimestampRef = useRef(null);
  const isPausedRef = useRef(false);

  const totalCards = items.length;

  useEffect(() => {
    let animId;

    const animate = (timestamp) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimestampRef.current) / 1000, 0.1);
      lastTimestampRef.current = timestamp;

      if (!isPausedRef.current) {
        let shouldAutoMove = (animationMode === 'auto' || animationMode === 'all');
        if (pauseOnHover && isHoveredRef.current) shouldAutoMove = false;
        if (isDraggingRef.current) shouldAutoMove = false;

        if (shouldAutoMove) {
          progressRef.current = (progressRef.current + speed * dt * 0.5) % totalCards;
          setProgress(progressRef.current);
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animId);
  }, [speed, totalCards, animationMode, pauseOnHover]);

  // Scroll listener
  useEffect(() => {
    if (animationMode !== 'scroll' && animationMode !== 'all') return;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const delta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      if (delta !== 0) {
        progressRef.current = (progressRef.current + delta * 0.003) % totalCards;
        if (progressRef.current < 0) progressRef.current += totalCards;
        setProgress(progressRef.current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animationMode, totalCards]);

  // Intersection observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      isPausedRef.current = !entry.isIntersecting;
    }, { threshold: 0.05 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePointerDown = (e) => {
    if (animationMode !== 'drag' && animationMode !== 'all') return;
    isDraggingRef.current = true;
    didDragRef.current = false;
    dragStartYRef.current = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    dragStartProgressRef.current = progressRef.current;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    const dy = clientY - dragStartYRef.current;
    if (Math.abs(dy) > 4) didDragRef.current = true;

    progressRef.current = (dragStartProgressRef.current - dy * 0.015) % totalCards;
    if (progressRef.current < 0) progressRef.current += totalCards;
    setProgress(progressRef.current);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[500px] lg:h-[580px] overflow-hidden select-none cursor-grab active:cursor-grabbing ${className}`}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; isDraggingRef.current = false; }}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      style={{ touchAction: 'pan-y' }}
    >
      <div
        className="w-full h-full relative"
        style={{
          perspective: `${perspective}px`,
          perspectiveOrigin: '50% 50%',
        }}
      >
        {items.map((item, index) => {
          let relIndex = (index - progress) % totalCards;
          if (relIndex < -totalCards / 2) relIndex += totalCards;
          if (relIndex > totalCards / 2) relIndex -= totalCards;

          const angle = (relIndex / cardsPerTurn) * 2 * Math.PI;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius - radius;
          const y = relIndex * verticalSpacing;

          const depth = (z + radius) / (2 * radius); // 0 at back, 1 at front
          const scale = 0.85 + depth * (centerScale - 0.85);
          const opacity = Math.max(edgeFade, edgeFade + depth * (1 - edgeFade));
          const blur = edgeBlur > 0 ? (1 - depth) * edgeBlur : 0;
          const zIndex = Math.round(depth * 100);

          return (
            <a
              key={index}
              href={item.href || '#'}
              onClick={(e) => {
                if (didDragRef.current) e.preventDefault();
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                borderRadius: `${cardRadius}px`,
                transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`,
                opacity: opacity,
                filter: blur > 0.5 ? `blur(${blur}px)` : 'none',
                zIndex: zIndex,
                transition: isDraggingRef.current ? 'none' : 'opacity 0.15s ease-out, transform 0.05s linear',
              }}
              className="group/card flex flex-col items-center justify-center p-4 bg-white border border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.1)] hover:shadow-[0_18px_40px_rgba(255,94,58,0.22)] hover:border-bloom-coral/50 transition-all cursor-pointer"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2.5 shadow-xs group-hover/card:scale-110 transition-transform"
                style={{
                  backgroundColor: item.iconBg || 'rgba(255,94,58,0.12)',
                  color: item.iconColor || '#FF5E3A',
                }}
              >
                {item.icon}
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 text-center leading-tight line-clamp-2 px-1">
                {item.label}
              </span>
              {item.subtitle && (
                <span className="text-[11px] text-slate-500 text-center font-medium mt-1 line-clamp-1">
                  {item.subtitle}
                </span>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default InfiniteSpiral;
