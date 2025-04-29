import { ActivityIndicator } from "react-native"
import { useRoute, RouteProp } from "@react-navigation/native";
import { useState } from "react";
import * as S from './ManageEvent.style';
import { useManageEventDetails } from "./hooks/useManageEventDetails";
import ManageEventCollapsible from "./ManageEventCollapsible/ManageEventCollapsible";
import { RootStackParamList } from "typescript/types";

export const ManageEvent = () => {
    const { params } = useRoute<RouteProp<RootStackParamList, '/events/manage-event'>>();
    const { eventRequests, isLoading } = useManageEventDetails({ eventId: params?.eventId ?? '' });
    const [isOpen, setIsOpen] = useState({
        "NewConnections": false,
        "Approved": false,
        "Attending": false,
        "NotAttending": false
    });

    if (isLoading) {
        return <S.Container>
            <ActivityIndicator />
        </S.Container>
    }


    return (
        <S.Container>
            <ManageEventCollapsible toggle={() => setIsOpen({ ...isOpen, "NewConnections": !isOpen["NewConnections"] })} title="New Connections" eventRequests={eventRequests?.filter(request => request.status === 'connection-complete')} isOpen={isOpen["NewConnections"]} />
            <ManageEventCollapsible toggle={() => setIsOpen({ ...isOpen, "Approved": !isOpen["Approved"] })} title="Approved" eventRequests={eventRequests?.filter(request => request.status === 'pending-confirmation')} isOpen={isOpen["Approved"]} />
            <ManageEventCollapsible toggle={() => setIsOpen({ ...isOpen, "Attending": !isOpen["Attending"] })} title="Attending" eventRequests={eventRequests?.filter(request => request.status === 'confirmation-complete')} isOpen={isOpen["Attending"]} />
            <ManageEventCollapsible toggle={() => setIsOpen({ ...isOpen, "NotAttending": !isOpen["NotAttending"] })} title="Not Attending" eventRequests={eventRequests?.filter(request => request.status === 'pending-attendance')} isOpen={isOpen["NotAttending"]} />
        </S.Container>
    )
}   