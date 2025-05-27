import invitedOnlyBackendApi from "src/api/backend-api";

const useGetUserById = (userId: string) => {
    const { data, isLoading, isError } = invitedOnlyBackendApi.useQuery('get', '/users/{id}', {
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