import React, { useCallback, useMemo, useState } from 'react';
import moment from 'moment';
import CalendarBar from '../calendar-bar/CalendarBar';
import CalendarGrid from '../calendar-grid/CalendarGrid';

moment.updateLocale('en', { week: { dow: 1 } });

const Calendar = () => {
  const data = JSON.parse(localStorage.getItem('Data'));
  const [arrEvents, setArrEvents] = useState(data || []);
  const [currentDate, setCurrentDate] = useState(moment());

  localStorage.setItem('Data', JSON.stringify(arrEvents));
  const startDay = useMemo(() => currentDate.clone().startOf('month').startOf('week'), [currentDate]);

  const handleClickLeft = useCallback(() => setCurrentDate(prev => prev.clone().subtract(1, 'month')), []);
  const handleClickRight = useCallback(() => setCurrentDate(prev => prev.clone().add(1, 'month')), []);

  return (
    <div>
      <CalendarBar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        handleClickLeft={handleClickLeft}
        handleClickRight={handleClickRight}
        setArrEvents={setArrEvents}
        arrEvents={arrEvents}
      />
      <CalendarGrid
        startDay={startDay}
        currentDate={currentDate}
        arrEvents={arrEvents}
        setArrEvents={setArrEvents}
      />
    </div>
  );
};

export default Calendar;
