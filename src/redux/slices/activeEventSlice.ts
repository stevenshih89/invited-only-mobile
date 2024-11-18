import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {EventData} from 'src/types/event';

export interface ActiveEventState {
  activeEvent: EventData | {};
}

const initialState: ActiveEventState = {
  activeEvent: {},
};

export const activeEventSlice = createSlice({
  name: 'activeEvent',
  initialState,
  reducers: {
    setActiveEvent: (state, action: PayloadAction<EventData | {}>) => {
      state.activeEvent = action.payload;
    },
  },
});

export const {setActiveEvent} = activeEventSlice.actions;

export default activeEventSlice.reducer;
