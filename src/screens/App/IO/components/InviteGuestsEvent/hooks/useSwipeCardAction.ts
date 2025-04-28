import invitedOnlyBackendApi from "src/api/backend-api";





const useSwipeCardAction = () => {
    const { mutate: createEventAttendee, isPending, data } = invitedOnlyBackendApi.useMutation('post', '/eventAttendees/create', {
        onSuccess: (req) => {
            console.log('req', req);
        },
        onError: err => {
            console.log('err', err);
        },
    });

    return { createEventAttendee, isPending, swipeDataRes: data };
}
export default useSwipeCardAction;