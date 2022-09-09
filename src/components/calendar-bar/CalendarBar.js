import React, { useCallback, useState } from 'react';
import NewEvent from '../new-event/NewEvent';
import './CalendarBar.css';

const CalendarBar = ({ currentDate, setCurrentDate, handleClickLeft, handleClickRight, setArrEvents, arrEvents }) => {
  const [elementBoolean, setElementBoolean] = useState(true);
  const handleClickOpen = useCallback(() => setElementBoolean(false), []);
  const handleClickClose = useCallback(() => setElementBoolean(true), []);

  const handleGetDate = (e) => {
    setCurrentDate(e.target.value);
  };

  return (
    <div className="calendar-bar">
      <div className="calendar-button" onClick={handleClickOpen}>+</div>
      {!elementBoolean && <NewEvent arrEvents={arrEvents} setArrEvents={setArrEvents} handleClickClose={handleClickClose}/>}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div className="calendar-date">
          <p onClick={handleClickLeft}>&#60;</p>
          <div>{currentDate.format('MMMM YYYY')}</div>
          <p onClick={handleClickRight}>&#62;</p>
        </div>
        <div className="calendar-datepicker">
          <input onChange={handleGetDate} value={currentDate} type="date"/>
        </div>
      </div>
    </div>
  );
};

export default CalendarBar;
