import { signOut } from "firebase/auth";
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";

const useUsers = () => {
    const navigate = useNavigate();
    const { data: users, isLoading, refetch, error } = useQuery('usersData', () => fetch(`http://localhost:5000/users`, {
        headers: {
            authorization: `${localStorage.getItem('accessTokenST')}`
        }
    }).then(res => res.json())
    )
    if (error) {
        toast.error('Something went wrong! Please try again later');
        refetch();
        signOut(auth);
        localStorage.removeItem('accessTokenST');
        navigate('/');
    }

    return { users, isLoading, refetch };
}

export default useUsers;