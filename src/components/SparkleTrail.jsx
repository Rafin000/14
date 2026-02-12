import { useEffect } from 'react';

const sparkles = ['✨', '💖', '⭐', '💕', '🌟', '💫'];

export default function SparkleTrail() {
  useEffect(() => {
    let throttle = 0;

    const handler = (e) => {
      if (Date.now() - throttle < 120) return;
      throttle = Date.now();

      const spark = document.createElement('div');
      spark.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      spark.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        pointer-events: none;
        font-size: 14px;
        z-index: 9999;
        animation: sparkFade 0.8s ease forwards;
      `;
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 800);
    };

    document.addEventListener('mousemove', handler);
    return () => document.removeEventListener('mousemove', handler);
  }, []);

  return null;
}
