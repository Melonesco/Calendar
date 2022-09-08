import { EVENT_CREATE, EVENT_DELETE, EVENT_UPDATE } from './types';

export const eventCreate = (event, id) => {
  return {
    type: EVENT_CREATE,
    data: { event, id }
  };
};

// export const eventUpdate = (event, id) => {
//   return {
//     type: EVENT_UPDATE,
//     data: { event, id }
//   };
// };

export const eventDelete = (id) => {
  return {
    type: EVENT_DELETE,
    id
  };
};
