import React, { useCallback, useMemo, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import EditEvent from '../edit-event/EditEvent';

const totalDays = 35;

const CalendarGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 2px;
  background-color: #E5E5E5;
  border: 2px solid #E5E5E5;
  height: 90vh;
`;

const CalendarContainerStyled = styled.div`
  min-width: 130px;
  min-height: 130px;
  height: 100%;
  background-color: white;
  position: relative;
  overflow: hidden;
`;

const CalendarDateStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CalendarDateFormatStyled = styled.h2`
  padding: 10px;
  font-size: 12px;
  font-weight: bold;
  color: ${props => props.isSelectedMonth ? 'black' : '#E5E5E5'};
`;

const CurrentDateStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  background-color: #EDF8EB;
  color: darkred;
`;

const CalendarEventStyled = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  width: 80%;
  padding: 10px;
  margin: 20px 10%;
  background-color: #E5E5E5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 30px;
  border-radius: 4px;
  cursor: pointer;
  z-index: 5;
`;

const CalendarGrid = ({ startDay, currentDate, arrEvents, setArrEvents }) => {
  const day = useMemo(() => startDay.clone().subtract(1, 'day'), [startDay]);
  const daysArray = useMemo(() => [...Array(totalDays)].map(() => day.add(1, 'day').clone()), [day]);
  const isCurrentDay = useCallback((day) => moment().isSame(day, 'day'), []);
  const isCurrentMonth = useCallback((day) => currentDate.isSame(day, 'month'), [currentDate]); //

  const [eventItem, setEventItem] = useState(null);
  const [isShowForm, setShowForm] = useState(false);

  const openFormHandler = useCallback((method, eventForUpdate) => {
    setShowForm(true);
    setEventItem(eventForUpdate);
  }, []);

  const cancelButtonHandler = useCallback(() => {
    setShowForm(false);
    setEventItem(null);
  }, []);

  const dayCell = useCallback((dateItem) => {
    return (
      <CalendarDateStyled>
        <CalendarDateFormatStyled isSelectedMonth={isCurrentMonth(dateItem)}>{dateItem.format('DD')}</CalendarDateFormatStyled>
        <CalendarDateFormatStyled isSelectedMonth={isCurrentMonth(dateItem)}>{dateItem.format('dd')}</CalendarDateFormatStyled>
      </CalendarDateStyled>
    );
  }, [isCurrentMonth]);

  const checkIfDate = useCallback((event, dateItem) => {
    const time = Math.floor(new Date(event.dateValue).getTime() / 1000);
    return time >= dateItem.format('X') && time <= dateItem.clone().endOf('day').format('X');
  }, []);

  return (
    <CalendarGridStyled>
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
                        <CalendarEventStyled onClick={() => openFormHandler('Update', event)} key={moment().format('DD MM YYYY hh:mm')}>
                          <div style={{ maxWidth: '200px' }}>{event.titleValue}</div>
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
                <div>
                  {arrEvents.filter(event => checkIfDate(event, dateItem))
                    .map(event =>
                      (
                        <CalendarEventStyled onClick={() => openFormHandler('Update', event)} key={moment().format('X')}>
                          <div style={{ maxWidth: '200px' }}>{event.titleValue}</div>
                          <div>{event.timeValue}</div>
                        </CalendarEventStyled>
                      ))}
                </div>
              </CalendarContainerStyled>
            )}
        </div>
      ))}
      {
        isShowForm
          ? <EditEvent setArrEvents={setArrEvents} arrEvents={arrEvents} setEventItem={setEventItem} eventItem={eventItem} cancelButtonHandler={cancelButtonHandler}/>
          : null
      }
    </CalendarGridStyled>
  );
};

export default CalendarGrid;
