import { useState, useEffect } from 'react';

type TProps = {
 delay?: number;
};

const useResizeController = (props: TProps = {}) => {
 const { delay = 300 } = props;
 const [innerHeight, setInnerHeight] = useState(0);
 const [innerWidth, setInnerWidth] = useState(0);

 useEffect(() => {
  const cleanUp = () => {
   window.removeEventListener('resize', handleResize);
   clearTimer();
  };
  let timerId: NodeJS.Timeout | null = null;
  const clearTimer = () => {
   if (timerId) {
    clearTimeout(timerId);
   }
  };
  const setDimensions = () => {
   setInnerHeight(window.innerHeight);
   setInnerWidth(window.innerWidth);
  };
  const handleResize = () => {
   clearTimer();
   timerId = setTimeout(() => {
    setDimensions();
   }, delay);
  };
  window.addEventListener('resize', handleResize);
  setDimensions();
  return cleanUp;
 }, [delay]);
 return { innerHeight, innerWidth };
};

export { useResizeController };
