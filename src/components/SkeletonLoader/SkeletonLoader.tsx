import { Skeleton } from "@mui/joy"

const SkeletonLoader = () => {
    const itemsCount = 8;
    return (
        <>
            {[...Array(itemsCount)].map(() => (
                    <Skeleton animation='wave' variant="rectangular" width="70%" height={250} sx={{borderRadius: '8px', padding: '0.5rem', maxWidth: "500px"}} />
            ))}
        </>
    )
}

export default SkeletonLoader