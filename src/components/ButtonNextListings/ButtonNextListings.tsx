import { useEffect, useState, useRef } from "react";
import { jobMarkets } from "../../constants/constants";
import useIntersection from "../../hooks/useIntersection"

type PropTypes = {
  market: string
  setMarket: (newMarket: string) => void;
}

const vibratePhonePatern = (t: number) => {
    const patern = [];

    for (let i = 1; i < t; i++ ){
        patern.push(0, 1000)
    }

    return patern;
}

const ButtonNextListings = ({ market, setMarket }: PropTypes) => {
    const countToThis = 3;

    const [time, setTime] = useState<number>(countToThis)
    const componentRef = useRef<HTMLButtonElement | null>(null);
    const inViewport = useIntersection(componentRef as React.RefObject<Element>, '0px');
    
    useEffect(() => {
      if (!inViewport) {
        setTime(countToThis)
        return
      }

      navigator.vibrate(vibratePhonePatern(countToThis));
      
      const interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(interval);
          }
          return prevTime - 1;
        });
      }, 1000);
      
      return () => {
        clearInterval(interval);
        navigator.vibrate(0);
      };
    }, [inViewport]);
    

    if (inViewport && (time === 0)) {
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