import { RouteProp, useRoute } from "@react-navigation/native";
import EventRequests from "./EventRequests";
import { RootStackParamList } from "typescript/types";



export const EventRequestsWrapper = () => {
  const route = useRoute<RouteProp<RootStackParamList, '/events/requests'>>();
  const params = route.params;
  const eventId = params?.eventId || '';
  return <EventRequests eventId={eventId} />;
};
