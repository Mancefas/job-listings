export const getJobListings = async (jobMarket: string) => {
    const apiUrl = import.meta.env.VITE_API_LINK;

    try {
        const response = await fetch(`${apiUrl}${jobMarket}`)
        if(!response.ok) throw new Error(`Status: ${response.status}`);
        const data = await response.json()
        return {data: data};

    } catch (err:any) {
        return {error : err.message}
    }
}


