import React, { useState } from 'react';
import moment from 'moment';
import CalendarBar from '../calendar-bar/CalendarBar';
import CalendarGrid from '../calendar-grid/CalendarGrid';

moment.updateLocale('en', { week: { dow: 1 } });

const Calendar = () => {
  const data = JSON.parse(localStorage.getItem('Data'));
  const [arrEvents, setArrEvents] = useState(data || [{ titleValue: '1', descriptionValue: '1', dateValue: '2022-09-10', timeValue: '16:08' }]);
  const [currentDate, setCurrentDate] = useState(moment());
  localStorage.setItem('Data', JSON.stringify(arrEvents));
  const startDay = currentDate.clone().startOf('month').startOf('week');

  const handleClickLeft = () => setCurrentDate(prev => prev.clone().subtract(1, 'month')); // useCall
  const handleClickRight = () => setCurrentDate(prev => prev.clone().add(1, 'month')); // useCall
  return (
    <div>
      <CalendarBar
        currentDate={currentDate}
        handleClickLeft={handleClickLeft}
        handleClickRight={handleClickRight}
        setArrEvents={setArrEvents}
        arrEvents={arrEvents}
      />
      <CalendarGrid
        startDay={startDay}
        currentDate={currentDate}
        arrEvents={arrEvents}
      />
    </div>
  );
};

export default Calendar;
