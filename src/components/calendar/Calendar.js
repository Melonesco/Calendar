import React, { useEffect, useState } from 'react';
import moment from 'moment';
import CalendarBar from '../calendar-bar/CalendarBar';
import CalendarGrid from '../calendar-grid/CalendarGrid';

// moment.updateLocale('en', { week: { dow: 1 } });
//
// const Calendar = () => {
//   const data = JSON.parse(localStorage.getItem('Data'));
//   const [currentDate, setCurrentDate] = useState(moment());
//   const [arrEvents, setArrEvents] = useState(data || [{ titleValue: '1', descriptionValue: '1', dateValue: '2022-09-10', timeValue: '16:08' }]);
//   const startDay = currentDate.clone().startOf('month').startOf('week');
//
//   localStorage.setItem('Data', JSON.stringify(arrEvents));
//
//   const handleClickLeft = () => setCurrentDate(prev => prev.clone().subtract(1, 'month')); // useCall
//   const handleClickRight = () => setCurrentDate(prev => prev.clone().add(1, 'month')); // useCall
//
//   return (
//     <div>
//       <CalendarBar
//         currentDate={currentDate}
//         handleClickLeft={handleClickLeft}
//         handleClickRight={handleClickRight}
//         setArrEvents={setArrEvents}
//         arrEvents={arrEvents}
//       />
//       <CalendarGrid
//         arrEvents={arrEvents}
//         startDay={startDay}
//         currentDate={currentDate}/>
//     </div>
//   );
// };

moment.updateLocale('en', { week: { dow: 1 } });

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const startDay = currentDate.clone().startOf('month').startOf('week');

  useEffect(() => {

  }, []);

  const handleClickLeft = () => setCurrentDate(prev => prev.clone().subtract(1, 'month')); // useCall
  const handleClickRight = () => setCurrentDate(prev => prev.clone().add(1, 'month')); // useCall
  return (
    <div>
      <CalendarBar
        currentDate={currentDate}
        handleClickLeft={handleClickLeft}
        handleClickRight={handleClickRight}
      />
      <CalendarGrid
        startDay={startDay}
        currentDate={currentDate}/>
    </div>
  );
};

export default Calendar;
