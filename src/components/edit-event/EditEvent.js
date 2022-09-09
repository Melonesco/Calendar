import React from 'react';
import '../new-event/NewEvent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const EventIconStyled = styled.div`
  background-color: #E13333;
  width: 30px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
`;

const CreateDateStyled = styled.div`
  font-size: 12px;
  color: #B3B3B3;
  margin-top: -5px;
  margin-bottom: 10px;
`;

const EditEvent = ({ cancelButtonHandler, eventItem, setEventItem, arrEvents, setArrEvents }) => {
  const {
    formState: {
      isValid
    },
    reset
  } = useForm({
    mode: 'onBlur'
  });

  const handleEditEvent = (data) => {
    // setEventItem(prevState => ({
    //   ...prevState,
    //   data
    // }));
    // setArrEvents([...arrEvents, data]);
    // setEventItem(arrEvents.filter(event => {
    //   if (event.dateValue === data.dateValue) {
    //     return {
    //       ...event,
    //       data
    //     };
    //   }
    // }));
  };

  // console.log(arrEvents);

  const handleChangeEvent = (text, field) => {
    setEventItem(prevState => ({
      ...prevState,
      [field]: text
    }));
    // console.log('Text>>', eventItem);
  };

  // console.log('Text>>', eventItem);

  const handleDeleteEvent = (data) => {
    setArrEvents(prevState => prevState.filter(eventElement => eventElement.dateValue !== data.dateValue));
    reset();
    cancelButtonHandler();
  };

  return (
    <div className="event">
      <div className="event-inner">
        <div className="event-heading">
          <h2>Edit idea item</h2>
          <FontAwesomeIcon
            onClick={cancelButtonHandler}
            opacity={'0.5'}
            cursor={'pointer'}
            fontSize="20px"
            icon={faClose}/>
        </div>
        <form onSubmit={() => handleEditEvent(eventItem)}>
          <CreateDateStyled>Created at: {eventItem.createDataValue}</CreateDateStyled>
          <div className="event-title">
            <label htmlFor="title">Title*</label>
            <input
              id="title"
              type="text"
              value={eventItem.titleValue}
              onChange={e => handleChangeEvent(e.target.value, 'titleValue')}
              maxLength={60}
            />
          </div>
          <div className="event-description">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              maxLength={200}
              value={eventItem.descriptionValue}
              onChange={e => handleChangeEvent(e.target.value, 'descriptionValue')}
            />
          </div>
          <div className="event-container">
            <div className="event-date">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                min="2000-01-01"
                max="2100-01-01"
                maxLength={10}
                value={eventItem.dateValue}
                onChange={e => handleChangeEvent(e.target.value, 'dateValue')}
              />
            </div>
            <div className="event-time">
              <label htmlFor="time">Begin time</label>
              <input
                id="time"
                type="time"
                maxLength={200}
                value={eventItem.timeValue}
                onChange={e => handleChangeEvent(e.target.value, 'timeValue')}
              />
            </div>
          </div>
          <div className="event-submit">
            <EventIconStyled onClick={() => handleDeleteEvent(eventItem)}>
              <FontAwesomeIcon
                cursor="pointer"
                fontSize="14px"
                color="white"
                icon={faTrash}/>
            </EventIconStyled>
            <input
              type="submit"
              value="Save"
              disabled={!isValid}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
