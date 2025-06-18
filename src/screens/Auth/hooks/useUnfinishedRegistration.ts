import { useContext } from 'react';
import { components } from '@invited-only/invited-only-api';
import { BackendApiContext } from 'contexts/BackendApiContex';


const useWriteUnfinishedRegistration = () => {
    const backendApi = useContext(BackendApiContext);
    const { mutate } = backendApi.useMutation('post', '/unfinishedRegistration', {
        onSuccess: () => {
            console.log('Unfinished registration written');
        },
        onError: (error) => {
            console.error('Error writing unfinished registration:', error);
        },
    });
    const writeUnfinishedRegistration = async (partialUser: Partial<components['schemas']['User']>) => {
        mutate({
            body: {
                ...partialUser,
            }
        })
    }

    return { writeUnfinishedRegistration };
};

const useDeleteUnfinishedRegistration = () => {
    const backendApi = useContext(BackendApiContext);
    const { mutate } = backendApi.useMutation('delete', '/unfinishedRegistration/{id}', {
        onError: (error) => {
            console.error('Error deleting unfinished registration:', error);
        },
    });
    const deleteUnfinishedRegistration = async (id: string) => {
        mutate({
            params: {
                path: {
                    id
                }
            }
        });
    }
    return { deleteUnfinishedRegistration };
};

export { useWriteUnfinishedRegistration, useDeleteUnfinishedRegistration };