import { useState, useEffect, RefObject, useRef } from 'react';
import { useResizeController } from './useResizeController';

type TProps = {
 enviromentRefs?: RefObject<HTMLElement | null>[];
 minHeight?: number;
};

const normalizeComputedStyles = (styleValue: string): number => {
 return Number(styleValue.replace('px', ''));
};

const useHeightController = (props: TProps = {}) => {
 const { innerHeight, innerWidth } = useResizeController();
 const { enviromentRefs, minHeight = 500 } = props;
 const [height, setHeight] = useState<number>(0);
 const chachedEnviromentRefs = useRef(enviromentRefs);
 useEffect(() => {
  const containerEl = document.querySelector('[data-panel-main-section]');
  if (!containerEl) return;
  const containerComputedStyles = window.getComputedStyle(containerEl);
  const containerHeight =
   normalizeComputedStyles(containerComputedStyles.height) -
   normalizeComputedStyles(containerComputedStyles.paddingTop) -
   normalizeComputedStyles(containerComputedStyles.paddingBottom);
  const calculateAndSetRemindedHeight = () => {
   const enviromentsElHeights = chachedEnviromentRefs.current
    ? chachedEnviromentRefs.current.reduce((acc, cur) => {
       const element = cur.current;
       if (!element) return acc;
       const cumputedStyles = window.getComputedStyle(element);
       const elementHeight = normalizeComputedStyles(cumputedStyles.height);
       const elementMarginBottom = normalizeComputedStyles(
        cumputedStyles.marginBottom
       );
       const elementMarginTop = normalizeComputedStyles(
        cumputedStyles.marginTop
       );
       return acc + (elementHeight + elementMarginBottom + elementMarginTop);
      }, 0)
    : 0;
   const spaceLeft = Math.floor(containerHeight - enviromentsElHeights);
   const newHeight = spaceLeft > minHeight ? spaceLeft - 1 : minHeight;
   setHeight(newHeight);
  };
  calculateAndSetRemindedHeight();
 }, [innerHeight, innerWidth, minHeight]);
 return {
  height,
  pixelHeight: `${height}px`,
 };
};

export { useHeightController };
