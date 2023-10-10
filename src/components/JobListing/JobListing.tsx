import { useEffect, useState } from "react";
import { getJobListings } from "../../helpers/apiCalls";
import JobItem from "./JobItem";
import { JobObject } from "./JobItem";

type PropTypes = {
  market: string
}

const JobListing = ({ market }: PropTypes) => {
    const [jobListings, setJobListings] = useState<JobObject[] | null >(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)    

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
    <section className="job-listing">
        {error && <h2 className="job-listing__error-text">There was an error... {error}</h2>}
        {loading && <h2>loading...</h2>}
        {jobListings && jobListings.map((job) => <JobItem {...job} key={job.link} />)}
    </section>
  )
}

export default JobListing