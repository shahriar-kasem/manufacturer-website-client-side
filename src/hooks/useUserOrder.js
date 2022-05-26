import { useQuery } from "react-query"

const useUserOrder = (user) => {
    const email = user.email;
    const {data: orders, refetch} = useQuery('userOrderData', () => fetch(`https://gentle-spire-70229.herokuapp.com/orders/${email}`, {
        method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `${localStorage.getItem('accessTokenST')}`
            }
    }).then(res=>res.json()
    )
    )
    return {orders, refetch};
}

export default useUserOrder;