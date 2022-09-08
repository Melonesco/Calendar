// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClose } from '@fortawesome/free-solid-svg-icons';
// import './NewEvent.css';
//
// const NewEvent = ({ handleClickClose, setArrEvents, arrEvents }) => {
//   const {
//     register,
//     formState: {
//       isValid
//     },
//     handleSubmit,
//     reset
//   } = useForm({
//     mode: 'onBlur'
//   });
//
//   const onSubmit = (data) => {
//     setArrEvents([...arrEvents, data]);
//     reset();
//     handleClickClose();
//   };
//
//   return (
//     <div className="event">
//       <div className="event-inner">
//         <div className="event-heading">
//           <h2>Add new idea item</h2>
//           <FontAwesomeIcon
//             onClick={handleClickClose}
//             opacity={'0.5'}
//             cursor={'pointer'}
//             fontSize="20px"
//             icon={faClose}/>
//         </div>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="event-title">
//             <label htmlFor="title">Title*</label>
//             <input
//               id="title"
//               type="text"
//               maxLength={60}
//               {...register('titleValue', { required: true })}
//             />
//             <div>
//             </div>
//             <div>
//             </div>
//           </div>
//           <div className="event-description">
//             <label htmlFor="description">Description</label>
//             <textarea
//               name="description"
//               id="description"
//               maxLength={200}
//               {...register('descriptionValue', { required: true })}/>
//           </div>
//           <div className="event-container">
//             <div className="event-date">
//               <label htmlFor="date">Date</label>
//               <input
//                 id="date"
//                 type="date"
//                 min="2000-01-01"
//                 max="2100-01-01"
//                 maxLength={10}
//                 {...register('dateValue', { required: true })}
//               />
//             </div>
//             <div className="event-time">
//               <label htmlFor="time">Begin time</label>
//               <input
//                 id="time"
//                 type="time"
//                 maxLength={200}
//                 {...register('timeValue', { required: true })}
//               />
//             </div>
//           </div>
//           <div className="event-submit">
//             <input
//               type="submit"
//               value="Save"
//               disabled={!isValid}
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
//
// export default NewEvent;

import React from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import './NewEvent.css';
import uniqid from 'uniqid';
import { eventCreate } from '../../redux/actions';

const NewEvent = ({ handleClickClose }) => {
  const dispatch = useDispatch();
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

  const onSubmit = (data) => {
    // setArrEvents([...arrEvents, data]);
    const id = uniqid();
    dispatch(eventCreate(data, id));
    reset();
    handleClickClose();
  };

  return (
    <div className="event">
      <div className="event-inner">
        <div className="event-heading">
          <h2>Add new idea item</h2>
          <FontAwesomeIcon
            onClick={handleClickClose}
            opacity={'0.5'}
            cursor={'pointer'}
            fontSize="20px"
            icon={faClose}/>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="event-title">
            <label htmlFor="title">Title*</label>
            <input
              id="title"
              type="text"
              maxLength={60} {...register('titleValue', { required: true })}
            />
          </div>
          <div className="event-description">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              maxLength={200}
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
                {...register('dateValue', { required: true })}
              />
            </div>
            <div className="event-time">
              <label htmlFor="time">Begin time</label>
              <input
                id="time"
                type="time"
                maxLength={200}
                {...register('timeValue', { required: true })}
              />
            </div>
          </div>
          <div className="event-submit">
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

export default NewEvent;
