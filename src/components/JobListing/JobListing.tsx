import { useEffect, useState } from "react";
import { getJobListings } from "../../helpers/apiCalls";
import { jobMarkets } from "../../constants/constants";
import JobItem from "./JobItem";
import { JobObject } from "./JobItem";
import ButtonToTop from "../ButtonToTop";
import LoadingSpinner from "../LoadingSpinners";
import ButtonNextListings from "../ButtonNextListings";
import SkeletonLoader from "../SkeletonLoader";

type PropTypes = {
  market: string
  setMarket: (newMarket: string) => void;
}

const JobListing = ({ market, setMarket }: PropTypes) => {
    const [jobListings, setJobListings] = useState<JobObject[] | null >(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)    
    const lastMarket = jobMarkets.indexOf(market) + 1 == jobMarkets.length 

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true)
          setJobListings(null)
          try {
            const data = await getJobListings(`${market}`);
            
            if (data.error) {
              throw new Error(data.error);
            } else {
              setLoading(false)
              setJobListings(data.data);
            }
          } catch (error: any) {
            setLoading(false)
            setError(error.message)
          }
        };
    
        fetchData();
      }, [market]);
          
  return (
    <>
    <section className="job-listing">
        {error && !loading && !jobListings && <h2 className="job-listing__error-text">There was an error... {error}</h2>}
        {loading && <SkeletonLoader />}
        {jobListings && jobListings.map((job) => <JobItem {...job} key={job.link} market={market} />)}
    </section>
    {(jobListings && lastMarket) && <ButtonToTop />}
    {(jobListings && !lastMarket) && <ButtonNextListings market={market} setMarket={setMarket}/>}
    </>
  )
}

export default JobListing