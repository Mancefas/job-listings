import { useState } from 'react';
import './App.scss'
import { JobListing } from './components/JobListing';

function App() {
  const jobMarkets = ["cvbankas", "cvlt", "cvmarket", "cvonline"];
  const [market, setMarket] = useState<string | null>(null)

  return (
    <>
    <div className="btns-container">
      {jobMarkets.map((item) => {
         return <button className={`${market == item ? 'diff-bg' : '' }`} key={item} onClick={() => setMarket(item)}>{item}</button>
        } )}
    </div>

    {market && <JobListing market={market} />}
    </>
  )
}

export default App
