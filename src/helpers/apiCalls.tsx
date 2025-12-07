import { JobObject } from '../components/JobListing'
import { dataFromApi } from '../components/AIRecruiterModal/AIRecruiterModal.tsx'
import {JobListingCommentType} from '../Types/Types.ts'

export const getJobListings = async (jobMarket: string) => {
    const apiUrl = import.meta.env.VITE_API_LINK;

    try {
        const response = await fetch(`${apiUrl}${jobMarket}`)
        if(!response.ok) throw new Error(`Status: ${response.status}`);
        const data: JobObject[] = await response.json()
        return {data: data};

    } catch (err:any) {
        return {error : err.message}
    }
}

export const getShortJobSummary = async (jobMarket: string, jobLink: string) => {
    const apiUrl = import.meta.env.VITE_API_LINK;

    try {
        const response = await fetch(`${apiUrl}${jobMarket}${jobLink}`)
        if(!response.ok) throw new Error(`Status: ${response.status}`);
        const data: JobListingCommentType | string = await response.json()
        if (typeof data === 'string') {
            return JSON.parse(data);
        }
        return data;

    } catch (err:any) {
        return {error : err.message}
    }
}

export const getJobRecruiterComment = async (jobMarket: string, jobLink: string) => {
    const apiUrl = import.meta.env.VITE_API_LINK;

    try {
        const response = await fetch(`${apiUrl}${jobMarket}${jobLink}`)
        if(!response.ok) throw new Error(`Status: ${response.status}`);
        const data: dataFromApi | string = await response.json()
        if (typeof data === 'string') {
            return JSON.parse(data);
        }
        return data;

    } catch (err:any) {
        return {error : err.message}
    }
}