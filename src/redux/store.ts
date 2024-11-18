import {configureStore} from '@reduxjs/toolkit';
import activeEventSlice from './slices/activeEventSlice';
import myEventsSlice from './slices/myEventsSlice';

export const store = configureStore({
  reducer: {
    activeEvent: activeEventSlice,
    myEvents: myEventsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
