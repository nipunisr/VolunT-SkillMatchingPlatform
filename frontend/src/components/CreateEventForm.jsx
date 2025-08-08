// import React, { useState } from 'react';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { format } from 'date-fns';
// import { createEvent } from '../services/api';


// const eventSchema = yup.object().shape({
//   title: yup.string().required('Title is required'),
//   description: yup.string().required('Description is required'),
//   requiredSkill: yup.string().nullable(),
//   startDate: yup.date()
//     .required('Start date is required')
//     .min(new Date(), 'Start date must be in the future'),
//   endDate: yup.date()
//     .required('End date is required')
//     .min(yup.ref('startDate'), 'End date must be after start date'),
//   location: yup.string().required('Location is required'),
//   isRemote: yup.boolean(),
//   maxVolunteers: yup.number()
//     .required('Max volunteers is required')
//     .min(1, 'Must have at least 1 volunteer')
//     .integer('Must be a whole number'),
//   status: yup.string().oneOf(['active', 'completed', 'cancelled']).default('active')
// });

// const CreateEventForm = ({ organizerId, onSuccess, onClose }) => {
//   console.log('Organizer ID:', organizerId);
//   const { 
//     register, 
//     handleSubmit, 
//     formState: { errors }
//   } = useForm({
//     resolver: yupResolver(eventSchema),
//     defaultValues: {
//       isRemote: false,
//       status: 'active'
//     }
    
//   }
// );

//   const [loading, setLoading] = useState(false);
//   const [serverError, setServerError] = useState('');

//   const onSubmit = async (data) => {
//     setLoading(true);
//     setServerError('');
    

//     try {
//       const formattedData = {
//         ...data,
//         userId: organizerId, // your backend expects userId as organizer
//         startDate: format(new Date(data.startDate), 'yyyy-MM-dd'),
//         endDate: format(new Date(data.endDate), 'yyyy-MM-dd'),
//         isRemote: data.isRemote ? 1 : 0,
//         requiredSkill: data.requiredSkill || null,
//       };
//       console.log('Sending event data:', formattedData);

//       const response = await createEvent(formattedData);

//       if (response.data.success) {
//         if (onSuccess) onSuccess(response.data.event);
//         if (onClose) onClose();
//       } else {
//         setServerError(response.data.message || 'Failed to create event');
//       }
//     } catch (error) {
//       console.error('Event creation error:', error);
//       setServerError(error.response?.data?.message || 'Error creating event');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Event</h2>
      
//       {serverError && (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//           {serverError}
//         </div>
//       )}

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label className="block font-semibold">Title</label>
//           <input
//             {...register('title')}
//             className="w-full border rounded p-2"
//             placeholder="Event Title"
//           />
//           {errors.title && <p className="text-red-600">{errors.title.message}</p>}
//         </div>

//         <div>
//           <label className="block font-semibold">Description</label>
//           <textarea
//             {...register('description')}
//             className="w-full border rounded p-2"
//             placeholder="Event Description"
//           />
//           {errors.description && <p className="text-red-600">{errors.description.message}</p>}
//         </div>

//         <div>
//           <label className="block font-semibold">Required Skill</label>
//           <input
//             type="text"
//             {...register('requiredSkill')}
//             className="w-full border rounded p-2"
//             placeholder="Enter required skill(s)"
//           />
//           {errors.requiredSkill && <p className="text-red-600">{errors.requiredSkill.message}</p>}
//         </div>

//         <div>
//           <label className="block font-semibold">Start Date</label>
//           <input
//             type="date"
//             {...register('startDate')}
//             className="w-full border rounded p-2"
//           />
//           {errors.startDate && <p className="text-red-600">{errors.startDate.message}</p>}
//         </div>

//         <div>
//           <label className="block font-semibold">End Date</label>
//           <input
//             type="date"
//             {...register('endDate')}
//             className="w-full border rounded p-2"
//           />
//           {errors.endDate && <p className="text-red-600">{errors.endDate.message}</p>}
//         </div>

//         <div>
//           <label className="block font-semibold">Location</label>
//           <input
//             {...register('location')}
//             className="w-full border rounded p-2"
//             placeholder="Location"
//           />
//           {errors.location && <p className="text-red-600">{errors.location.message}</p>}
//         </div>

//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             {...register('isRemote')}
//             className="mr-2"
//             id="isRemote"
//           />
//           <label htmlFor="isRemote">Remote Event</label>
//         </div>

//         <div>
//           <label className="block font-semibold">Max Volunteers</label>
//           <input
//             type="number"
//             {...register('maxVolunteers')}
//             className="w-full border rounded p-2"
//             min={1}
//             placeholder="Number of Volunteers"
//           />
//           {errors.maxVolunteers && <p className="text-red-600">{errors.maxVolunteers.message}</p>}
//         </div>

//         <div>
//           <label className="block font-semibold">Status</label>
//           <select {...register('status')} className="w-full border rounded p-2">
//             <option value="active">Active</option>
//             <option value="completed">Completed</option>
//             <option value="cancelled">Cancelled</option>
//           </select>
//           {errors.status && <p className="text-red-600">{errors.status.message}</p>}
//         </div>

//         <div className="flex gap-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             {loading ? "Creating..." : "Create Event"}
//           </button>
//           <button
//             type="button"
//             onClick={onClose}
//             className="bg-gray-300 px-4 py-2 rounded"
//             disabled={loading}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateEventForm;



import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { format } from 'date-fns';
import { createEvent } from '../services/api';

const eventSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  requiredSkill: yup.string().nullable(),
  startDate: yup.date()
    .required('Start date is required')
    .min(new Date(), 'Start date must be in the future'),
  endDate: yup.date()
    .required('End date is required')
    .min(yup.ref('startDate'), 'End date must be after start date'),
  location: yup.string().required('Location is required'),
  isRemote: yup.boolean(),
  maxVolunteers: yup.number()
    .required('Max volunteers is required')
    .min(1, 'Must have at least 1 volunteer')
    .integer('Must be a whole number'),
  status: yup.string().oneOf(['active', 'completed', 'cancelled']).default('active')
});

const CreateEventForm = ({ organizerId, onSuccess, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(eventSchema),
    defaultValues: { isRemote: false, status: 'active' },
  });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');

    try {
      const formattedData = {
        ...data,
        userId: organizerId,
        startDate: format(new Date(data.startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(data.endDate), 'yyyy-MM-dd'),
        isRemote: data.isRemote ? 1 : 0,
        requiredSkill: data.requiredSkill || null,
      };

      const response = await createEvent(formattedData);

      if (response.success) {
        if (onSuccess) onSuccess(response.event);
        if (onClose) onClose();
      } else {
        setServerError(response.message || 'Failed to create event');
      }
    } catch (error) {
      setServerError(error.response?.data?.message || 'Error creating event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Event</h2>

      {serverError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{serverError}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-semibold">Title</label>
          <input {...register('title')} className="w-full border rounded p-2" placeholder="Event Title" />
          {errors.title && <p className="text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea {...register('description')} className="w-full border rounded p-2" placeholder="Event Description" />
          {errors.description && <p className="text-red-600">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block font-semibold">Required Skill</label>
          <input type="text" {...register('requiredSkill')} className="w-full border rounded p-2" placeholder="Enter required skill(s)" />
          {errors.requiredSkill && <p className="text-red-600">{errors.requiredSkill.message}</p>}
        </div>

        <div>
          <label className="block font-semibold">Start Date</label>
          <input type="date" {...register('startDate')} className="w-full border rounded p-2" />
          {errors.startDate && <p className="text-red-600">{errors.startDate.message}</p>}
        </div>

        <div>
          <label className="block font-semibold">End Date</label>
          <input type="date" {...register('endDate')} className="w-full border rounded p-2" />
          {errors.endDate && <p className="text-red-600">{errors.endDate.message}</p>}
        </div>

        <div>
          <label className="block font-semibold">Location</label>
          <input {...register('location')} className="w-full border rounded p-2" placeholder="Location" />
          {errors.location && <p className="text-red-600">{errors.location.message}</p>}
        </div>

        <div className="flex items-center">
          <input type="checkbox" {...register('isRemote')} className="mr-2" id="isRemote" />
          <label htmlFor="isRemote">Remote Event</label>
        </div>

        <div>
          <label className="block font-semibold">Max Volunteers</label>
          <input type="number" {...register('maxVolunteers')} className="w-full border rounded p-2" min={1} placeholder="Number of Volunteers" />
          {errors.maxVolunteers && <p className="text-red-600">{errors.maxVolunteers.message}</p>}
        </div>

        <div>
          <label className="block font-semibold">Status</label>
          <select {...register('status')} className="w-full border rounded p-2">
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {errors.status && <p className="text-red-600">{errors.status.message}</p>}
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? 'Creating...' : 'Create Event'}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded" disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
