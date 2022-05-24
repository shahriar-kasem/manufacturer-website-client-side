import { useQuery } from "react-query";
import Loading from "../components/shared/Loading/Loading";

const useOrders = () => {
    const { data: orders, isLoading, refetch } = useQuery('ordersData', () => fetch(`https://gentle-spire-70229.herokuapp.com/orders`, {
        headers: {
            authorization: `${localStorage.getItem('accessTokenST')}`
        }
    }).then(res => res.json()
    )
    )

    if (isLoading) {
        return <Loading></Loading>
    }

    return { orders, isLoading, refetch };
}

export default useOrders;