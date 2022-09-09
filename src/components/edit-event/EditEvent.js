import React, { useState } from 'react';
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

const EditEvent = ({ cancelButtonHandler, eventItem, setEventItem }) => {
  // const [editEvent, setEditEvent] = useState(...events);

  // console.log('EditEvent >>>', editEvent);
  // console.log('EditEvent >>>', eventItem);

  // const dispatch = useDispatch();
  const {
    register,
    formState: {
      isValid
    },
    handleSubmit,
    reset
  } = useForm({
    mode: 'onBlur'
  });

  const onSubmit2 = (data) => {
    // dispatch(eventCreate(data, '1'));
    reset();
    cancelButtonHandler();
  };

  const handleDeleteEvent = (text, field) => {
    // setEventItem(prevState => ({
    //   ...prevState,
    //   [field]: text
    // }));
  };

  const handleChangeEvent = (text, field) => {
    setEventItem(prevState => ({
      ...prevState,
      [field]: text
    }));
  };

  console.log(eventItem);

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
        <form onSubmit={handleSubmit(onSubmit2)}>
          <div className="event-title">
            <label htmlFor="title">Title*</label>
            <input
              id="title"
              type="text"
              value={eventItem.titleValue}
              onChange={e => handleChangeEvent(e.target.value, 'titleValue')}
              maxLength={60}
              {...register('titleValue', { required: true })}
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
              {...register('descriptionValue', { required: true })}/>
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
                {...register('dateValue', { required: true })}
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
                {...register('timeValue', { required: true })}
              />
            </div>
          </div>
          <div className="event-submit">
            <EventIconStyled>
              <FontAwesomeIcon
                onClick={e => handleDeleteEvent('', 'titleValue')}
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
