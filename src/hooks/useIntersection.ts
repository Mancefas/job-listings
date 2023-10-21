import { useState, useEffect, RefObject } from 'react';

const useIntersection = (element: RefObject<HTMLElement>, rootMargin: string): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  //  useEffect to run this functions only if there are any props
  useEffect(() => {
    // add observer state to isVisible state
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin }
    );

    // if there is ref.current add observer to it
    element.current && observer.observe(element.current);

    // cleanup to delete observer from ref component
    return () => {
      element.current && observer.unobserve(element.current);
    };
  }, [element, rootMargin]);

  return isVisible;
};

export default useIntersection;
