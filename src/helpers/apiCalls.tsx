import { JobObject } from '../components/JobListing'

export const getJobListings = async (jobMarket: string, jobLink?: string) => {
    const apiUrl = import.meta.env.VITE_API_LINK;

    try {
        const response = await fetch(`${apiUrl}${jobMarket}${jobLink ? jobLink : ''}`)
        if(!response.ok) throw new Error(`Status: ${response.status}`);
        const data: JobObject[] = await response.json()
        return {data: data};

    } catch (err:any) {
        return {error : err.message}
    }
}