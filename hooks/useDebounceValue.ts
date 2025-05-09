import { useState, useEffect, useRef } from 'react';
export function useDebounceValue<T>(value: T, delay: number) {
 const timeoutRef = useRef<NodeJS.Timeout | null>(null);
 const [debouncedValue, setDebouncedValue] = useState(value);
 useEffect(() => {
  if (timeoutRef.current) {
   clearTimeout(timeoutRef.current);
  }
  timeoutRef.current = setTimeout(() => {
   setDebouncedValue(value);
  }, delay);
  return () => {
   if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
   }
  };
 }, [value, delay]);

 return debouncedValue;
}
