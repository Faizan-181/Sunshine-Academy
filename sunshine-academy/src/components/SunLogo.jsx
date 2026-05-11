import logoImg from '/logo.png';

export default function SunLogo({ sz = 44 }) {
  return (
    <img
      src={logoImg}
      alt="Sunshine Academy"
      style={{
        width: sz,
        height: 'auto',
        maxHeight: sz,
        objectFit: 'contain',
        display: 'block',
        flexShrink: 0,
        background: 'transparent',
        mixBlendMode: 'screen',
        filter: 'drop-shadow(0 2px 10px rgba(245,166,35,0.5))',
      }}
    />
  );
}
