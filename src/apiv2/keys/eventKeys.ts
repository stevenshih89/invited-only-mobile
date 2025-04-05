export const EventQueryKeys = {
  getEvents: (userId?: string) => ['get-events', userId],
  getEventsForUser: (userId?: string) => ['get-events-for-user', userId],
  getUsersForEvents: (eventId?: string) => ['get-users-for-events', eventId],
};
