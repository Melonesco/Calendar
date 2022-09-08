// import React from 'react';
// import './CalendarGrid.css';
// import moment from 'moment';
//
// const totalDays = 35;
//
// const CalendarGrid = ({ startDay, currentDate, arrEvents }) => {
//   const day = startDay.clone().subtract(1, 'day'); // useMemo
//   const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone()); // useMemo
//   const isCurrentDay = (day) => moment().isSame(day, 'day'); //
//   const isCurrentMonth = (day) => currentDate.isSame(day, 'month'); //
//
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     console.log(e);
//   };
//
//   return (
//     <div className="calendar">
//       {daysArray.map(dayItem => (
//         <div key={dayItem.format('DMY')}>
//           {!isCurrentDay(dayItem)
//             ? <div className="calendar-container">
//               {isCurrentMonth(dayItem)
//                 ? (
//                   <div className="calendar-date">
//                     <h2>{dayItem.format('DD')}</h2>
//                     <h2>{dayItem.format('dd')}</h2>
//                   </div>
//                 )
//                 : (
//                   <div className="calendar-date">
//                     <h2 style={{ color: '#E5E5E5' }}>{dayItem.format('DD')}</h2>
//                     <h2 style={{ color: '#E5E5E5' }}>{dayItem.format('dd')}</h2>
//                   </div>
//                 )}
//               <div>
//                 {arrEvents.filter(event => Math.floor(new Date(event.dateValue).getTime() / 1000) >= dayItem.format('X') &&
//                     Math.floor(new Date(event.dateValue).getTime() / 1000) <= dayItem.clone().endOf('day').format('X'))
//                   .map(event => (
//                     <div onClick={handleUpdate} className="calendar-event" key={moment().format('X')}>
//                       <div>{event.titleValue}</div>
//                       <div>{event.timeValue}</div>
//                     </div>
//                   ))}
//               </div>
//             </div>
//             : (
//               <div className="calendar-container current">
//                 <div className="calendar-date">
//                   <h2>{dayItem.format('DD')}</h2>
//                   <h2>{dayItem.format('dd')}</h2>
//                 </div>
//               </div>
//             )}
//         </div>
//       ))}
//     </div>
//   );
// };
//
// export default CalendarGrid;

import React, { useCallback, useState } from 'react';
import './CalendarGrid.css';
import moment from 'moment';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { eventDelete } from '../../redux/actions';
import NewEvent from '../new-event/NewEvent';
import EditEvent from '../edit-event/EditEvent';

const totalDays = 35;

const CalendarContainerStyled = styled.div`
  min-width: 130px;
  min-height: 130px;
  height: 100%;
  background-color: white;
  padding: 10px;
`;

const CalendarDateStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CalendarDateFormatStyled = styled.h2`
  font-size: 12px;
  font-weight: bold;
  //color: black;
  color: ${props => props.isSelectedMonth ? 'black' : '#E5E5E5'};
`;

const CurrentDateStyled = styled.div`
  background-color: #EDF8EB;
`;

const CalendarEventStyled = styled.div`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  background-color: #E5E5E5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 30px;
  border-radius: 4px;
  cursor: pointer;
`;

const CalendarGrid = ({ startDay, currentDate }) => {
  const day = startDay.clone().subtract(1, 'day'); // useMemo
  const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone()); // useMemo
  const isCurrentDay = (day) => moment().isSame(day, 'day'); //
  const isCurrentMonth = (day) => currentDate.isSame(day, 'month'); //

  // const handleUpdate = (e) => {
  //   e.preventDefault();
  //   console.log(e);
  // };

  const dayCell = React.useCallback((dateItem) => {
    return (
      <CalendarDateStyled>
        <CalendarDateFormatStyled isSelectedMonth={isCurrentMonth(dateItem)}>{dateItem.format('DD')}</CalendarDateFormatStyled>
        <CalendarDateFormatStyled isSelectedMonth={isCurrentMonth(dateItem)}>{dateItem.format('dd')}</CalendarDateFormatStyled>
      </CalendarDateStyled>
    );
  }, []);

  const events = useSelector(state => state.eventsReducer.events);
  const dispatch = useDispatch();

  console.log(events);

  const checkIfDate = useCallback((event, dateItem) => {
    const time = Math.floor(new Date(event.dateValue).getTime() / 1000);
    return time >= dateItem.format('X') && time <= dateItem.clone().endOf('day').format('X');
  }, []);

  const handleDelete = () => {
    dispatch(eventDelete(events.dateValue));
  };

  const [elementBoolean, setElementBoolean] = useState(true);
  const handleClickOpen2 = () => setElementBoolean(false);
  const handleClickClose2 = () => setElementBoolean(true);

  const [eventItem, setEventItem] = useState(null);
  const [isShowForm, setShowForm] = useState(false);

  const openFormHandler = (method, eventForUpdate) => {
    console.log('onclick', method);
    setShowForm(true);
    setEventItem(eventForUpdate);
  };

  const cancelButtonHandler = () => {
    setShowForm(false);
    setEventItem(null);
  };

  return (
    <div className="calendar">
      {daysArray.map(dateItem => (
        <div key={dateItem.format('X')}>
          {!isCurrentDay(dateItem)
            ? (
              <CalendarContainerStyled>
                {dayCell(dateItem)}
                <div>
                  {events.filter(event => checkIfDate(event.event, dateItem))
                    .map(event =>
                      (
                        <CalendarEventStyled onClick={() => openFormHandler('Update', event)} key={moment().format('X')}>
                          <div>{event.event.titleValue}</div>
                          <div>{event.event.timeValue}</div>
                        </CalendarEventStyled>
                      ))}
                </div>
              </CalendarContainerStyled>
            )
            : (
              <CalendarContainerStyled>
                <CurrentDateStyled>
                  {dayCell(dateItem)}
                </CurrentDateStyled>
              </CalendarContainerStyled>
            )}
        </div>
      ))}
      {/* {!elementBoolean && <EditEvent events={events} handleClickClose2={handleClickClose2}/>} */}
      {
        isShowForm
          ? <EditEvent eventItem={eventItem} cancelButtonHandler={cancelButtonHandler}/>
          : null
      }
    </div>
  );
};

export default CalendarGrid;
