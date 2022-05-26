import { useQuery } from "react-query";
import Loading from "../components/shared/Loading/Loading";


const useReviews = () => {
    const {data: reviews, isLoading, refetch} = useQuery('reviewsData', () => fetch(`https://gentle-spire-70229.herokuapp.com/reviews`).then(res=>res.json()
    )
    )

    if(isLoading){
        return <Loading></Loading>
    }

    return {reviews, isLoading, refetch};
}

export default useReviews;