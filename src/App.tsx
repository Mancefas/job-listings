import { Suspense, useState } from 'react';
import './App.scss'
import { JobListing } from './components/JobListing';
import { jobMarkets } from './constants/constants';
import SkeletonLoader from './components/SkeletonLoader';

function App() {
  const [market, setMarket] = useState<string | null>(null)

  return (
    <>
    <div className="btns-container">
      {jobMarkets.map((item) => {
         return <button className={`${market == item ? 'diff-bg' : '' }`} key={item} onClick={() => setMarket(item)}>{item}</button>
        } )}
    </div>
    {!market && <img className='main-img' src='../reading.png' alt='man reading paper' />}
    {market && (
        <section className="job-listing">
          <Suspense fallback={<SkeletonLoader />}>
            <JobListing market={market} setMarket={setMarket} />
          </Suspense>
        </section>
    )}
    </>
  )
}

export default App
