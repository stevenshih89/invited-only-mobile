import { useContext } from "react";
import { BackendApiContext } from "contexts/BackendApiContex";


const useGetUserById = (userId: string) => {
    const backendApi = useContext(BackendApiContext);
    const { data, isLoading, isError } = backendApi.useQuery('get', '/users/{id}', {
        params: {
            path: {
                id: userId
            }
        }
    })
    return {
        data,
        isLoading,
        isError
    }
}

export default useGetUserById;