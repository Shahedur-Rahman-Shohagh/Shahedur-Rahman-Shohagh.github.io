'use client';
import { useState } from 'react';

export default function Photo({ src, alt }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="photo">
      {failed ? (
        <div className="ph">SR</div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} onError={() => setFailed(true)} />
      )}
    </div>
  );
}
