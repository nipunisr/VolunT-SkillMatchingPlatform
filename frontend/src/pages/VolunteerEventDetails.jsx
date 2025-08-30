// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const EventDetails = () => {
//   const { opportunityId } = useParams();
//   const [event, setEvent] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:3000/api/events/${opportunityId}`)
//       .then(res => {
//       console.log('Loaded event:', res.data.event);
//       setEvent(res.data.event);
//     })
//       .catch(err => console.error('Failed to load event details', err));
//   }, [opportunityId]);

//   if (!event) return <div>Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10">
//       <div className="flex flex-col md:flex-row gap-8">
//         <div className="bg-gray-100 rounded-xl p-8 flex-1">
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h2>
//           {/* <div className="text-lg font-semibold mb-1">{event.organization}</div> */}
//           <div className="italic text-gray-600 mb-2">{event.description}</div>
//           <div className="text-gray-700">
//             <span className="font-medium">Contact:</span> {event.contactEmail}
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border p-7 min-w-[270px]">
//           <button className="bg-[#E17335] text-white font-bold py-2 px-4 rounded mb-6 w-full hover:bg-[#29144C]">
//             I Want To Help
//           </button>
//           <div className="text-gray-700 mb-1"><span className="font-bold">E-Mail</span> - {event.contactEmail}</div>
//           <div className="text-gray-700 mb-1"><span className="font-bold">Location</span> - {event.location}</div>
//           <div className="text-gray-700 mb-1"><span className="font-bold">Contact</span> : {event.contactPhone}</div>
//           <div className="text-gray-700 mb-1"><span className="font-bold">Type</span> : {event.type}</div>
//           <div className="text-gray-700 mb-2">
//             <span className="font-bold">Skills Required :</span>
//             {/* <ul className="ml-4 list-disc">
//               {event.requiredSkills.map((skill, i) => (<li key={i}>{skill}</li>))}
//             </ul> */}


//             <ul className="ml-4 list-disc">
//              {(event.requiredSkills ?? []).map((skill, i) => (
//            <li key={i}>{skill}</li>
//             ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetails;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns'; // make sure date-fns installed
import { getEventById, getEventSkills, saveVolunteerRequest } from '../services/api'; // adjust path as needed
import helping from "../assets/images/helping.png";
import VolunteerRequestModal from '../components/VolunteerRequestModal';

const EventDetails = () => {
  const { opportunityId } = useParams();
  const [event, setEvent] = useState(null);
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);


  const [formState, setFormState] = useState({
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    isRemote: "",
    maxVolunteers: "",
    status: "",
  });

  const groupedSkills = skills.reduce((acc, skill) => {
        (acc[skill.categoryName] = acc[skill.categoryName] || []).push(skill);
        return acc;
        }, {});

  const handleSend = async (message) => {
    try {
      await saveVolunteerRequest({ eventId: event.opportunityId, message });
      alert('Your volunteer request has been sent!');
      setModalOpen(false);
    } catch (err) {
      alert('Failed to send request, please try again.');
    }
  };

  useEffect(() => {
    async function fetchEvent() {
      if (!opportunityId) return;
      try {
        const eventData = await getEventById(opportunityId);
        setEvent(eventData);

        setFormState({
          description: eventData.description || "",
          startDate: eventData.startDate ? format(parseISO(eventData.startDate), "yyyy-MM-dd") : "",
          endDate: eventData.endDate ? format(parseISO(eventData.endDate), "yyyy-MM-dd") : "",
          location: eventData.location || "",
          isRemote: eventData.isRemote ? "Yes" : "No",
          maxVolunteers: eventData.maxVolunteers || "",
          status: eventData.status || "",
        });

        const skillsData = await getEventSkills(opportunityId);
        setSkills(skillsData);
        


      } catch (error) {
        console.error('Failed to fetch event data:', error);
      }
    }
    fetchEvent();
  }, [opportunityId]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
        <div className="h-56 bg-gray-200">
        <img src={helping} alt="Event" className="w-full h-full object-cover" />
        </div>
      <div className="flex flex-col md:flex-row gap-8 ">
        <div className="bg-gray-100 rounded-xl p-8 flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h2>
          {/* Uncomment if organization available */}
          {/* <div className="text-lg font-semibold mb-1">{event.organization}</div> */}
          <div className="italic text-gray-600 mb-2">{formState.description}</div>
        
        </div>

        <div className="bg-white rounded-xl border p-7 min-w-[270px]">
          <button
        onClick={() => setModalOpen(true)}
        className="bg-[#E17335] text-white font-bold py-2 px-4 rounded mb-6 w-full hover:bg-[#29144C]"
      >
        I Want To Help
      </button>

      <VolunteerRequestModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSend}
      />
          <div className="text-gray-700 mb-1"><span className="font-bold">Start Date :</span>  {formState.startDate || "N/A"}</div>
          <div className="text-gray-700 mb-1"><span className="font-bold">End Date :</span> {formState.endDate || "N/A"}</div><br/>
          <div className="text-gray-700 mb-1"><span className="font-bold">Location :</span> {formState.location || "N/A"}</div>
          <div className="text-gray-700 mb-1"><span className="font-bold">Remote : </span> {formState.isRemote || "N/A"}</div><br/>
          <div className="text-gray-700 mb-1"><span className="font-bold">Maximum Volunteers :</span> {formState.maxVolunteers || "N/A"}</div>
            <div className="text-gray-700 mb-1"><span className="font-bold">Status :</span> {formState.status || "N/A"}</div>
          <div className="text-gray-700 mb-2"><br/>
            <span className="font-bold">Skills Required :</span>
            {/* <ul className="ml-4 list-disc">
              {skills.length === 0 ? (
                <li>No skills listed</li>
              ) : (
                skills.map((skill) => <li key={skill.skillId}>{skill.skillName}</li>)
              )}
            </ul> */}

            {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className="ml-4 mb-4">
            <div className="font-semibold">{category}</div>
              <ul className="list-disc ml-6">
              {skills.map((skill) => (
             <li key={skill.skillId}>
            <div>{skill.skillName}</div>
            {skill.note && <div className="text-sm text-gray-500">{skill.note}</div>}
            </li>
            ))}
            </ul>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
