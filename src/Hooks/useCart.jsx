import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useCart = () => {
    const { user } = useAuth();

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`);

            if (!res.ok) {
                throw new Error("Failed to fetch cart data");
            }

            return res.json();
        },
        throwOnError: true, // Throw an error if there's an issue with the fetch
    });

    return [cart, refetch];
};

export default useCart;