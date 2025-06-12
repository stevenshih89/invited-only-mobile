import { paths } from "@invited-only/invited-only-api";
import { useEffect, useState } from "react";
import { OpenapiQueryClient } from "openapi-react-query";
import initializeApiClient from "src/api/backend-api";


const useGetBackendApi = () => {
    const [backendApi, setBackendApi] = useState<OpenapiQueryClient<paths> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        initializeApiClient().then((backendApi) => {
            setBackendApi(backendApi);
            setIsLoading(false);
        });
    }, []);
    return { backendApi, isLoading };
};

export default useGetBackendApi;