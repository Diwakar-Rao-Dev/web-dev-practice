import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './GooeyNav.css';

const themes = {
  dark: {
    '--gn-frame': 'rgba(25, 28, 36, 0.78)',
    '--gn-pill': '#f8fafc',
    '--gn-ink': '#f8fafc',
    '--gn-muted': 'rgba(248, 250, 252, 0.68)',
    '--gn-hover': 'rgba(255, 255, 255, 0.08)',
    '--gn-shadow': '0 18px 48px rgba(0, 0, 0, 0.24)',
  },
  light: {
    '--gn-frame': 'rgba(255, 255, 255, 0.78)',
    '--gn-pill': '#18181b',
    '--gn-ink': '#18181b',
    '--gn-muted': 'rgba(24, 24, 27, 0.62)',
    '--gn-hover': 'rgba(24, 24, 27, 0.06)',
    '--gn-shadow': '0 18px 48px rgba(24, 24, 27, 0.12)',
  },
};

const sizes = {
  sm: 'gooey-nav--sm',
  md: 'gooey-nav--md',
  lg: 'gooey-nav--lg',
};

function contrastInk(value, theme) {
  const colorValue = String(value).trim();
  const hex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(colorValue)?.[1];
  const rgb = hex
    ? (hex.length === 3 ? hex.split('').map(digit => `${digit}${digit}`).join('') : hex)
      .match(/.{2}/g)
      .map(channel => parseInt(channel, 16) / 255)
    : /^rgba?\(([^)]+)\)$/i.exec(colorValue)?.[1]
      ?.split(',')
      .slice(0, 3)
      .map(channel => parseFloat(channel.trim()) / 255);

  if (!rgb || rgb.some(channel => Number.isNaN(channel))) {
    return theme === 'dark' ? '#18161d' : '#ffffff';
  }
  const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  return luminance > 0.55 ? '#18161d' : '#ffffff';
}

function GooeyNav({
  items = [],
  initialActiveIndex = 0,
  activeIndex,
  onChange,
  theme = 'dark',
  color,
  activeTextColor,
  colors = [],
  size = 'md',
  frame = true,
  animationTime = 600,
  particleCount = 15,
  spread = 56,
  timeVariance = 300,
  gooeyness = 0.5,
  wobble = 0.5,
  hoverEffect = true,
  className = '',
  style,
  ariaLabel = 'Primary navigation',
}) {
  const [innerIndex, setInnerIndex] = useState(initialActiveIndex);
  const current = Math.min(Math.max(0, activeIndex ?? innerIndex), Math.max(0, items.length - 1));
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const [indicator, setIndicator] = useState(null);
  const [burst, setBurst] = useState(null);
  const burstId = useRef(0);
  const palette = theme === 'light' ? 'light' : 'dark';
  const pillColor = color || themes[palette]['--gn-pill'];

  useEffect(() => {
    if (!burst) return undefined;
    const timeout = window.setTimeout(
      () => setBurst(null),
      Math.max(0, animationTime) + Math.max(0, timeVariance) + 500,
    );
    return () => window.clearTimeout(timeout);
  }, [animationTime, burst, timeVariance]);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;

    const measure = () => {
      const item = itemRefs.current[current];
      const listBox = list.getBoundingClientRect();
      const itemBox = item?.getBoundingClientRect();
      if (itemBox) {
        setIndicator({
          x: itemBox.left - listBox.left,
          y: itemBox.top - listBox.top,
          width: itemBox.width,
          height: itemBox.height,
        });
      } else {
        setIndicator(null);
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    itemRefs.current.forEach(item => item && observer.observe(item));
    window.addEventListener('resize', measure);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [current, items.length]);

  const select = index => {
    if (index === current) return;
    const listBox = listRef.current?.getBoundingClientRect();
    const sourceBox = itemRefs.current[current]?.getBoundingClientRect();
    if (listBox && sourceBox && particleCount > 0) {
      const count = Math.min(32, Math.floor(particleCount));
      const particles = Array.from({ length: count }, (_, particleIndex) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.max(0, spread) * (0.55 + Math.random() * 0.75);
        const variance = (Math.random() - 0.5) * Math.max(0, timeVariance);
        return {
          id: particleIndex,
          x: sourceBox.left - listBox.left + sourceBox.width / 2,
          y: sourceBox.top - listBox.top + sourceBox.height / 2,
          dx: Math.cos(angle) * distance * (1 + Math.max(0, wobble) * 0.35),
          dy: Math.sin(angle) * distance * (1 + Math.max(0, wobble) * 0.35),
          delay: Math.random() * Math.max(0, timeVariance) * 0.35,
          duration: Math.max(150, animationTime + variance),
          color: colors.length ? colors[particleIndex % colors.length] : pillColor,
        };
      });
      setBurst({ id: burstId.current++, particles });
    }
    if (activeIndex === undefined) setInnerIndex(index);
    onChange?.(index, items[index]);
  };

  const navClass = [
    'gooey-nav',
    sizes[size] || sizes.md,
    frame && 'gooey-nav--framed',
    hoverEffect && 'gooey-nav--hover',
    className,
  ].filter(Boolean).join(' ');

  return (
    <nav
      className={navClass}
      aria-label={ariaLabel}
      style={{
        ...themes[palette],
        '--gn-pill': pillColor,
        '--gn-active-ink': activeTextColor || contrastInk(pillColor, palette),
        '--gn-duration': `${Math.max(0, animationTime)}ms`,
        '--gn-blur': `${Math.max(0, Math.min(1, gooeyness)) * 4}px`,
        ...style,
      }}
    >
      <ul className="gooey-nav__list" ref={listRef}>
        {indicator && (
          <span
            aria-hidden="true"
            className="gooey-nav__indicator"
            style={{
              width: indicator.width,
              height: indicator.height,
              transform: `translate(${indicator.x}px, ${indicator.y}px)`,
            }}
          />
        )}
        {burst && (
          <span className="gooey-nav__particles" aria-hidden="true" key={burst.id}>
            {burst.particles.map(particle => (
              <span
                className="gooey-nav__particle"
                key={particle.id}
                style={{
                  left: particle.x,
                  top: particle.y,
                  backgroundColor: particle.color,
                  '--gn-dx': `${particle.dx}px`,
                  '--gn-dy': `${particle.dy}px`,
                  '--gn-mid-dx': `${particle.dx * 0.55}px`,
                  '--gn-mid-dy': `${particle.dy * 0.55}px`,
                  '--gn-delay': `${particle.delay}ms`,
                  '--gn-particle-duration': `${particle.duration}ms`,
                }}
              />
            ))}
          </span>
        )}
        {items.map((item, index) => {
          const content = (
            <>
              {item.icon && <span className="gooey-nav__icon">{item.icon}</span>}
              {item.label && <span>{item.label}</span>}
            </>
          );
          const shared = {
            className: 'gooey-nav__link',
            onClick: event => {
              if (!item.href || item.href === '#') event.preventDefault();
              select(index);
            },
          };

          return (
            <li
              className="gooey-nav__item"
              data-active={index === current || undefined}
              key={`${item.label ?? 'item'}-${index}`}
              ref={element => {
                itemRefs.current[index] = element;
              }}
            >
              {item.href ? (
                <a href={item.href} aria-current={index === current ? 'page' : undefined} {...shared}>
                  {content}
                </a>
              ) : (
                <button type="button" aria-pressed={index === current} {...shared}>
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default GooeyNav;
