import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import './DepthCarousel.css';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const normalizeItem = item => typeof item === 'string' ? { image: item, alt: '' } : item;

function DepthCarousel({
  items = [],
  cardWidth = 300,
  cardHeight = 380,
  radius = 18,
  tint = '#05060a',
  depth = 220,
  spread = 90,
  tilt = 22,
  tiltDirection = 'right',
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.2,
  blur = 6,
  duration = 700,
  ease = 'power3.out',
  autoplay = false,
  autoplayDelay = 3200,
  loop = true,
  showControls = true,
  showIndicators = true,
  onChange,
  className = '',
}) {
  const data = useMemo(() => (Array.isArray(items) ? items : []).map(normalizeItem), [items]);
  const count = data.length;
  const rootRef = useRef(null);
  const cardRefs = useRef([]);
  const overlayRefs = useRef([]);
  const posRef = useRef(0);
  const focusRef = useRef(0);
  const tweenRef = useRef(null);
  const scaleRef = useRef(1);
  const cfgRef = useRef({});
  const onChangeRef = useRef(onChange);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const wheelTimerRef = useRef(null);
  const autoTimerRef = useRef(null);
  const reducedRef = useRef(false);
  const [active, setActive] = useState(0);

  const currentActive = count ? Math.min(active, count - 1) : 0;

  useLayoutEffect(() => {
    onChangeRef.current = onChange;
    cfgRef.current = {
      count,
      depth,
      spread,
      tilt,
      tiltDirection,
      visibleCards,
      falloff,
      blur,
      duration,
      ease,
      loop,
      cardWidth,
      autoplayDelay,
    };
    if (focusRef.current >= count) {
      focusRef.current = Math.max(0, count - 1);
      posRef.current = focusRef.current;
    }
  }, [
    autoplayDelay,
    blur,
    cardWidth,
    count,
    depth,
    duration,
    ease,
    falloff,
    loop,
    onChange,
    spread,
    tilt,
    tiltDirection,
    visibleCards,
  ]);

  const layout = useCallback(position => {
    const cfg = cfgRef.current;
    const total = cfg.count;
    if (!total) return;
    const direction = cfg.tiltDirection === 'left' ? -1 : 1;
    const scale = scaleRef.current;

    for (let index = 0; index < total; index += 1) {
      const element = cardRefs.current[index];
      if (!element) continue;

      let distance = index - position;
      if (cfg.loop && total > 1) {
        distance = ((distance % total) + total) % total;
        if (distance > total / 2) distance -= total;
      }

      const behind = Math.max(0, distance);
      const absoluteDistance = Math.abs(distance);
      const shown = absoluteDistance <= cfg.visibleCards + 0.5;
      const translateZ = -cfg.depth * distance;
      const translateX = direction * cfg.spread * distance;
      const rotateY = direction * cfg.tilt * clamp(distance, 0, 1);
      let opacity = distance < 0 ? Math.max(0, 1 + distance) : 1;
      if (!shown) opacity = 0;

      const brightness = Math.max(0.15, 1 - behind * cfg.falloff);
      const blurPx = cfg.blur > 0
        ? Math.min(cfg.blur, (behind / Math.max(1, cfg.visibleCards)) * cfg.blur)
        : 0;
      element.style.transform = `translate(-50%, -50%) scale(${scale}) translateX(${translateX.toFixed(2)}px) translateZ(${translateZ.toFixed(2)}px) rotateY(${rotateY.toFixed(3)}deg)`;
      element.style.opacity = opacity.toFixed(3);
      element.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`;
      element.style.zIndex = String(Math.round(2000 - distance * 20));
      element.style.pointerEvents = shown && opacity > 0.05 ? 'auto' : 'none';

      const overlay = overlayRefs.current[index];
      if (overlay) {
        overlay.style.opacity = clamp(behind * cfg.falloff * 1.25, 0, 0.86).toFixed(3);
      }
    }
  }, []);

  const notify = useCallback(index => {
    setActive(index);
    onChangeRef.current?.(index, data[index]);
  }, [data]);

  const tweenTo = useCallback((target, animate) => {
    tweenRef.current?.kill();
    const config = cfgRef.current;
    const proxy = { position: posRef.current };
    tweenRef.current = gsap.to(proxy, {
      position: target,
      duration: animate && !reducedRef.current ? config.duration / 1000 : 0,
      ease: config.ease,
      onUpdate: () => {
        posRef.current = proxy.position;
        layout(proxy.position);
      },
      onComplete: () => {
        posRef.current = config.loop
          ? ((posRef.current % config.count) + config.count) % config.count
          : clamp(posRef.current, 0, config.count - 1);
        layout(posRef.current);
      },
    });
  }, [layout]);

  const setFocus = useCallback((rawIndex, animate = true) => {
    const config = cfgRef.current;
    const total = config.count;
    if (!total) return;
    const index = config.loop
      ? ((rawIndex % total) + total) % total
      : clamp(rawIndex, 0, total - 1);
    let delta = index - posRef.current;
    if (config.loop && total > 1) {
      delta = ((delta % total) + total) % total;
      if (delta > total / 2) delta -= total;
    }
    tweenTo(posRef.current + delta, animate);
    if (index !== focusRef.current) {
      focusRef.current = index;
      notify(index);
    }
  }, [notify, tweenTo]);

  const navigateBy = useCallback(step => setFocus(focusRef.current + step, true), [setFocus]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const observer = new ResizeObserver(entries => {
      const width = entries[0].contentRect.width;
      const config = cfgRef.current;
      const needed = config.cardWidth + Math.abs(config.spread) * 2 + 120;
      scaleRef.current = clamp(width / needed, 0.4, 1);
      layout(posRef.current);
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, [layout]);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return undefined;
    const onWheel = event => {
      const config = cfgRef.current;
      if (config.count < 2) return;
      event.preventDefault();
      tweenRef.current?.kill();
      const raw = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const delta = event.deltaMode === 1 ? raw * 24 : raw;
      const step = clamp(delta / (config.cardWidth * 0.9), -0.6, 0.6);
      posRef.current += step;
      layout(posRef.current);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => setFocus(Math.round(posRef.current), true), 130);
    };
    element.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      element.removeEventListener('wheel', onWheel);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    };
  }, [layout, setFocus]);

  const onPointerDown = useCallback(event => {
    if (event.target.closest('button')) return;
    if (cfgRef.current.count < 2) return;
    tweenRef.current?.kill();
    dragRef.current = {
      x: event.clientX,
      startPosition: posRef.current,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
      moved: false,
      pointerId: event.pointerId,
    };
    suppressClickRef.current = false;
  }, []);

  const onPointerMove = useCallback(event => {
    const drag = dragRef.current;
    if (!drag) return;
    const config = cfgRef.current;
    const stepPx = Math.max(config.cardWidth * 0.55 * scaleRef.current, 40);
    const deltaX = event.clientX - drag.x;
    if (!drag.moved && Math.abs(deltaX) > 4) {
      drag.moved = true;
      suppressClickRef.current = true;
      rootRef.current?.setPointerCapture(drag.pointerId);
    }
    if (!drag.moved) return;
    const now = performance.now();
    const deltaTime = Math.max(now - drag.lastTime, 1);
    drag.velocity = (event.clientX - drag.lastX) / deltaTime;
    drag.lastX = event.clientX;
    drag.lastTime = now;
    posRef.current = drag.startPosition - deltaX / stepPx;
    layout(posRef.current);
  }, [layout]);

  const onPointerEnd = useCallback(() => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    if (!drag.moved) return;
    const config = cfgRef.current;
    const stepPx = Math.max(config.cardWidth * 0.55 * scaleRef.current, 40);
    const projected = posRef.current - (drag.velocity * 180) / stepPx;
    setFocus(Math.round(projected), true);
  }, [setFocus]);

  const onKeyDown = useCallback(event => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      navigateBy(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      navigateBy(1);
    }
  }, [navigateBy]);

  const onCardClick = useCallback(index => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    setFocus(index, true);
  }, [setFocus]);

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!autoplay || reducedRef.current || count < 2) return undefined;
    const root = rootRef.current;
    let hovered = false;
    let focused = false;
    const stop = () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    };
    const start = () => {
      stop();
      autoTimerRef.current = window.setInterval(() => {
        if (!hovered && !focused) navigateBy(1);
      }, Math.max(autoplayDelay, 600));
    };
    const onEnter = () => { hovered = true; };
    const onLeave = () => { hovered = false; };
    const onFocusIn = () => { focused = true; };
    const onFocusOut = event => {
      if (!root?.contains(event.relatedTarget)) focused = false;
    };
    root?.addEventListener('mouseenter', onEnter);
    root?.addEventListener('mouseleave', onLeave);
    root?.addEventListener('focusin', onFocusIn);
    root?.addEventListener('focusout', onFocusOut);
    start();
    return () => {
      stop();
      root?.removeEventListener('mouseenter', onEnter);
      root?.removeEventListener('mouseleave', onLeave);
      root?.removeEventListener('focusin', onFocusIn);
      root?.removeEventListener('focusout', onFocusOut);
    };
  }, [autoplay, autoplayDelay, count, navigateBy]);

  useEffect(() => {
    layout(posRef.current);
  }, [blur, cardHeight, cardWidth, count, depth, falloff, layout, radius, spread, tilt, tiltDirection, visibleCards]);

  useEffect(() => () => {
    tweenRef.current?.kill();
    if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
  }, []);

  return (
    <div
      ref={rootRef}
      className={`depth-carousel ${className}`.trim()}
      style={{ '--dc-perspective': `${perspective}px` }}
      role="group"
      aria-roledescription="carousel"
      aria-label="Depth carousel"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onKeyDown={onKeyDown}
    >
      <div className="depth-carousel__stage">
        {data.map((item, index) => (
          <div
            key={`${item.image}-${index}`}
            className="depth-carousel__card"
            ref={element => { cardRefs.current[index] = element; }}
            style={{ width: cardWidth, height: cardHeight, borderRadius: radius }}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            aria-hidden={currentActive !== index}
            onClick={() => onCardClick(index)}
          >
            <img
              className="depth-carousel__img"
              src={item.image}
              alt={item.alt || ''}
              draggable={false}
              loading={index === currentActive ? 'eager' : 'lazy'}
            />
            <span
              className="depth-carousel__tint"
              ref={element => { overlayRefs.current[index] = element; }}
              style={{ background: tint }}
            />
          </div>
        ))}
      </div>

      {showControls && count > 1 && (
        <>
          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--prev"
            aria-label="Previous slide"
            onClick={() => navigateBy(-1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--next"
            aria-label="Next slide"
            onClick={() => navigateBy(1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {showIndicators && count > 1 && (
        <div className="depth-carousel__dots" role="tablist" aria-label="Slides">
          {data.map((item, index) => (
            <button
              key={`${item.image}-indicator-${index}`}
              type="button"
              role="tab"
              aria-selected={currentActive === index}
              aria-label={`Go to slide ${index + 1}`}
              className={`depth-carousel__dot${currentActive === index ? ' is-active' : ''}`}
              onClick={() => setFocus(index, true)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DepthCarousel;
