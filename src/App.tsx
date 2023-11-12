import { useState } from 'react';
import './App.scss'
import { JobListing } from './components/JobListing';
import { jobMarkets } from './constants/constants';

function App() {
  const [market, setMarket] = useState<string | null>(null)

  return (
    <>
    <div className="btns-container">
      {jobMarkets.map((item) => {
         return <button className={`${market == item ? 'diff-bg' : '' }`} key={item} onClick={() => setMarket(item)}>{item}</button>
        } )}
    </div>
    {!market && <img className='main-img' src='../reading.png' />}
    {market && <JobListing market={market} setMarket={setMarket} />}
    </>
  )
}

export default App
