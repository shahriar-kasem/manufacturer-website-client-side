import { useQuery } from "react-query"

const useUsers = () => {
    const { data: users, isLoading, refetch, error } = useQuery('usersData', () => fetch(`http://localhost:5000/users`, {
        headers: {
            authorization: `${localStorage.getItem('accessTokenST')}`
        }
    }).then(res => res.json())
    )

    return { users, isLoading, refetch };
}

export default useUsers;