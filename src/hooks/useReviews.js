import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../components/shared/Loading/Loading";


const useReviews = () => {
    // const [reviews, setReviews] = useState([]);

    // useEffect(() => {
    //     fetch('http://localhost:5000/reviews')
    //         .then(res => res.json())
    //         .then(data => setReviews(data))
    // }, [])
    // return [reviews, setReviews];
    const {data: reviews, isLoading, refetch} = useQuery('reviewsData', () => fetch(`http://localhost:5000/reviews`).then(res=>res.json()
    )
    )

    if(isLoading){
        return <Loading></Loading>
    }

    return {reviews, isLoading, refetch};
}

export default useReviews;