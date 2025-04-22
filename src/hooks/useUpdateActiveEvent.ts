import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { EventQueries } from 'src/apiv2/queries/eventQueries';
import { logErrorToSentry } from 'helpers/logErrorsToSentry';

export const useUpdateActiveEvent = (activeEvent: any, setActiveEvent: any, isDemo: any) => {
  useFocusEffect(
    useCallback(() => {
      try {
        if (!isDemo && activeEvent?.id) {
          const { data: updatedEvent } = EventQueries.useEvent(activeEvent.id);

          if (updatedEvent) {
            const prevEventReviewed = activeEvent?.eventReviewed;
            const currentEventReviewed = updatedEvent?.eventReviewed || false;
            const prevStatusEvent = activeEvent?.statusEvent;
            const currentStatusEvent = updatedEvent?.statusEvent || false;

            if (prevStatusEvent !== currentStatusEvent || prevEventReviewed !== currentEventReviewed) {
              setActiveEvent({
                ...activeEvent,
                eventReviewed: currentEventReviewed,
                statusEvent: currentStatusEvent
              });
            }
          }
        }
      } catch (error) {
        logErrorToSentry(error);
      }
    }, [activeEvent?.id])
  );
};
