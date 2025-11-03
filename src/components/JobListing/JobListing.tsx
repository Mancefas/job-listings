import { use } from "react";
import { getJobListings } from "../../helpers/apiCalls";
import { jobMarkets } from "../../constants/constants";
import JobItem from "./JobItem";
import { JobObject } from "./JobItem";
import ButtonToTop from "../ButtonToTop";
import ButtonNextListings from "../ButtonNextListings";

type PropTypes = {
  market: string
  setMarket: (newMarket: string) => void;
}

type JobResult = { data: JobObject[] | null; error: string | null };

const listingsCache = new Map<string, Promise<JobResult>>();

const loadJobListings = (market: string) => {
  if (!listingsCache.has(market)) {
    const promise = (async () => {
      const res = await getJobListings(`${market}`);
      if (res.error) {
        return { data: null, error: res.error };
      }
      return { data: res.data ?? null, error: null };
    })();

    listingsCache.set(market, promise);
  }
  return listingsCache.get(market)!;
};

const JobListing = ({ market, setMarket }: PropTypes) => {
    const { data: jobListings, error } = use(loadJobListings(market));
    const lastMarket = jobMarkets.indexOf(market) + 1 == jobMarkets.length 

    return (
        <>
            {error && !jobListings && <h2 className="job-listing__error-text">There was an error... {error}</h2>}
            {jobListings && jobListings.map((job) => <JobItem {...job} key={job.link} market={market} />)}
            {(jobListings && lastMarket) && <ButtonToTop />}
            {(jobListings && !lastMarket) && <ButtonNextListings market={market} setMarket={setMarket}/>}
        </>
  )
}

export default JobListing