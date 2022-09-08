import { EVENT_CREATE, EVENT_UPDATE, EVENT_DELETE } from '../types';

const initialState = {
  events: []
};

export const eventsReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
  case EVENT_CREATE:
    return {
      ...state,
      events: [...state.events, action.data]
    };
  case EVENT_UPDATE:
    return state;
  case EVENT_DELETE:

    const { id } = action;
    const { events } = state;

    const itemIndex = events.findIndex(res => res.id === id);

    const deleteEvent = [
      ...events.slice(0, itemIndex),
      ...events.slice(itemIndex + 1)
    ];

    return {
      ...state,
      events: deleteEvent
    };
  default:
    return state;
  }
};
