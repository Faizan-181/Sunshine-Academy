import { Star } from 'lucide-react';

export default function Stars({ n = 5, sz = 14 }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {[...Array(n)].map((_, i) => (
        <Star key={i} size={sz} fill="#F5A623" color="#F5A623" />
      ))}
    </div>
  );
}
