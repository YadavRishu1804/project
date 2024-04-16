import React, { useState, useEffect } from 'react';
import '../pages/styles/CustomCursor.css'; // Import CSS file for styling

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const debounce = (func, delay) => {
      let timer;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
      };
    };

    const updatePosition = debounce((e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    }, 5); // Adjust the delay as per your requirement

    document.addEventListener('mousemove', updatePosition);

    // Hide system cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      // Restore system cursor
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="custom-cursor" style={{ left: `${position.x}px`, top: `${position.y}px` }}></div>
  );
};

export default CustomCursor;