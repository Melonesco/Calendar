// import React, { useState } from 'react';
// import './CalendarBar.css';
// import NewEvent from '../new-event/NewEvent';
//
// const CalendarBar = ({ currentDate, handleClickLeft, handleClickRight, setArrEvents, arrEvents }) => {
//   const [elementBoolean, setElementBoolean] = useState(true);
//   const handleClickOpen = () => setElementBoolean(false);
//   const handleClickClose = () => setElementBoolean(true);
//
//   return (
//     <div className="calendar-bar">
//       <div className="calendar-button" onClick={handleClickOpen}>+</div>
//       {!elementBoolean && <NewEvent setArrEvents={setArrEvents} arrEvents={arrEvents} handleClickClose={handleClickClose}/>}
//       <div>
//         <div className="calendar-date">
//           <p onClick={handleClickLeft}>&#60;</p>
//           <div>{currentDate.format('MMMM YYYY')}</div>
//           <p onClick={handleClickRight}>&#62;</p>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default CalendarBar;

import React, { useState } from 'react';
import NewEvent from '../new-event/NewEvent';
import './CalendarBar.css';

const CalendarBar = ({ currentDate, handleClickLeft, handleClickRight, setArrEvents, arrEvents }) => {
  const [elementBoolean, setElementBoolean] = useState(true);
  const handleClickOpen = () => setElementBoolean(false);
  const handleClickClose = () => setElementBoolean(true);

  return (
    <div className="calendar-bar">
      <div className="calendar-button" onClick={handleClickOpen}>+</div>
      {!elementBoolean && <NewEvent arrEvents={arrEvents} setArrEvents={setArrEvents} handleClickClose={handleClickClose}/>}
      <div>
        <div className="calendar-date">
          <p onClick={handleClickLeft}>&#60;</p>
          <div>{currentDate.format('MMMM YYYY')}</div>
          <p onClick={handleClickRight}>&#62;</p>
        </div>
      </div>
    </div>
  );
};

export default CalendarBar;
