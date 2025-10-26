import { useState, useEffect, RefObject } from 'react';

const useIntersection = <T extends Element>(
  element: RefObject<T>,
  rootMargin: string
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!element.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin }
    );

    element?.current && observer.observe(element?.current);

    return () => {
      element?.current && observer.unobserve(element?.current);
    };
  }, [element, rootMargin]);

  return isVisible;
};

export default useIntersection;
