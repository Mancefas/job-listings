import { useEffect, useState, useRef } from "react";
import { jobMarkets } from "../../constants/constants";
import useIntersection from "../../hooks/useIntersection"

type PropTypes = {
  market: string
  setMarket: (newMarket: string) => void;
}

const ButtonNextListings = ({ market, setMarket }: PropTypes) => {
    const countToThis = 3;

    const [time, setTime] = useState<number>(countToThis)
    const componentRef = useRef<HTMLButtonElement | null>(null);
    const inViewport = useIntersection(componentRef, '0px');
    
    useEffect(() => {
      // if component is not in view return (when first time useEffect runs)
      if (!inViewport) {
        setTime(countToThis)
        return
      }

      // add interval to count time to 0
      const interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(interval);
          }
          return prevTime - 1;
        });
      }, 1000);
      
      // clear interval when unmounting
      return () => {
        clearInterval(interval);
      };
    }, [inViewport]);
    

    // when component is in view and the time ran out - load function
    if (inViewport && (time === 0)) {
      // find current market index add 1 to that index and get that new market
      const newMarket = jobMarkets[jobMarkets.indexOf(market) + 1]
      setTime(countToThis)
      setMarket(newMarket)
      window.scrollTo({top: 0})
    }

  return (
    <button ref={componentRef}>Next page in : {time}</button>
  )
}

export default ButtonNextListings