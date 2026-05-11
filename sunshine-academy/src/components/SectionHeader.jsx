import { useRef, useState, useEffect } from 'react';
import { Star } from 'lucide-react';

export function useReveal() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, on];
}

export default function SH({ tag, title, hi, sub, light, center }) {
  const [ref, on] = useReveal();
  return (
    <div ref={ref} className={`rv${on ? ' on' : ''}`} style={{ textAlign: center ? 'center' : 'left' }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        background: light ? 'rgba(245,166,35,.15)' : '#FFF3D4',
        color: light ? '#F5A623' : '#D4891A',
        padding: '5px 16px', borderRadius: 100,
        fontSize: '.77rem', fontWeight: 700,
        letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 14,
      }}>
        <Star size={10} fill="currentColor" /> {tag}
      </span>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(1.9rem,3.8vw,2.8rem)',
        color: light ? '#fff' : '#0A1628',
        lineHeight: 1.18, marginBottom: 14,
      }}>
        {title}{' '}
        {hi && <span style={{ color: '#F5A623' }}>{hi}</span>}
      </h2>
      {sub && (
        <p style={{
          color: light ? 'rgba(255,255,255,.6)' : '#4B5563',
          fontSize: '1.03rem', lineHeight: 1.7, maxWidth: 560,
          margin: center ? '0 auto' : 0,
        }}>
          {sub}
        </p>
      )}
    </div>
  );
}
