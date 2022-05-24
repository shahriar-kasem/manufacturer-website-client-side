import { useQuery } from "react-query";
import Loading from "../components/shared/Loading/Loading";

const useProducts = () => {
    const { data: products, isLoading, refetch } = useQuery('productData', () => fetch(`https://gentle-spire-70229.herokuapp.com/products`).then(res => res.json()
    )
    )

    if (isLoading) {
        return <Loading></Loading>
    }

    return { products, isLoading, refetch };
}

export default useProducts;