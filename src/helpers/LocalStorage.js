export const GetEvents = () => {
  const events = localStorage.getItem('Events');
  return events;
};

export const SetEvents = (events) => {
  localStorage.setItem('Events', events);
};
