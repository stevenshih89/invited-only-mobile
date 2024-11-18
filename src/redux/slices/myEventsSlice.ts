import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {EventData} from 'src/types/event';

export interface MyEventsState {
  myEvents: EventData[];
  loadingMyEvents: boolean;
}

const initialState: MyEventsState = {
  myEvents: [],
  loadingMyEvents: false,
};

export const myEventsSlice = createSlice({
  name: 'myEvents',
  initialState,
  reducers: {
    setMyEvents: (state, action: PayloadAction<EventData[]>) => {
      state.myEvents = action.payload;
    },
    setLoadingMyEvents: (state, action: PayloadAction<boolean>) => {
      state.loadingMyEvents = action.payload;
    },
  },
});

export const {setMyEvents, setLoadingMyEvents} = myEventsSlice.actions;

export default myEventsSlice.reducer;
