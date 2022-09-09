import React, { useCallback, useState } from 'react';
import './CalendarGrid.css';
import moment from 'moment';
import styled from 'styled-components';
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

const CalendarGrid = ({ startDay, currentDate, arrEvents }) => {
  const day = startDay.clone().subtract(1, 'day'); // useMemo
  const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone()); // useMemo
  const isCurrentDay = (day) => moment().isSame(day, 'day'); //
  const isCurrentMonth = (day) => currentDate.isSame(day, 'month'); //

  const dayCell = React.useCallback((dateItem) => {
    return (
      <CalendarDateStyled>
        <CalendarDateFormatStyled isSelectedMonth={isCurrentMonth(dateItem)}>{dateItem.format('DD')}</CalendarDateFormatStyled>
        <CalendarDateFormatStyled isSelectedMonth={isCurrentMonth(dateItem)}>{dateItem.format('dd')}</CalendarDateFormatStyled>
      </CalendarDateStyled>
    );
  }, []);

  const checkIfDate = useCallback((event, dateItem) => {
    const time = Math.floor(new Date(event.dateValue).getTime() / 1000);
    return time >= dateItem.format('X') && time <= dateItem.clone().endOf('day').format('X');
  }, []);

  const [eventItem, setEventItem] = useState(null);
  const [isShowForm, setShowForm] = useState(false);

  const openFormHandler = (method, eventForUpdate) => {
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
                  {arrEvents.filter(event => checkIfDate(event, dateItem))
                    .map(event =>
                      (
                        <CalendarEventStyled onClick={() => openFormHandler('Update', event)} key={moment().format('X')}>
                          <div>{event.titleValue}</div>
                          <div>{event.timeValue}</div>
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
      {
        isShowForm
          ? <EditEvent setEventItem={setEventItem} eventItem={eventItem} cancelButtonHandler={cancelButtonHandler}/>
          : null
      }
    </div>
  );
};

export default CalendarGrid;
