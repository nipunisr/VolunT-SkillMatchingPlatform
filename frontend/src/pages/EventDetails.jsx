// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { getEventById,getEventSkills } from "../services/api";
// import { format, parseISO } from "date-fns";
// import helping from "../assets/images/helping.png";

// const EventDetails = () => {
//   const { opportunityId } = useParams();
//   const [event, setEvent] = useState(null);
//   const [skills, setSkills] = useState([]);


//   useEffect(() => {
//     async function fetchEvent() {
//       if (!opportunityId) return;
//       try {
//         const eventData = await getEventById(opportunityId);
//         setEvent(eventData);

//         const eventSkills = await getEventSkills(opportunityId);
//         setSkills(eventSkills);
//       } catch (error) {
//         console.error("Failed to fetch event details", error);
//       }
//     }
//     fetchEvent();
//   }, [opportunityId]);

//   if (!event) return <div>Loading...</div>;

//   const groupedSkills = skills.reduce((acc, skill) => {
//   if (!acc[skill.categoryName]) acc[skill.categoryName] = [];
//   acc[skill.categoryName].push(skill);
//   return acc;
// }, {});

//   return (
//     <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden font-sans">
//       {/* Header */}
//       <div className="h-56 bg-gray-200">
//         <img
//           src={helping}
//           alt="Event"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Content */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
//         {/* Left Side - Event Details */}
//         <div className="md:col-span-2 space-y-6">
//           <h2 className="text-2xl font-bold text-orange-800">{event.title}</h2>

//           <div>
//             <h3 className="font-semibold text-orange-800">Description</h3>
//             <p className="text-gray-700">{event.description || "No details"}</p>
//           </div>

//           <div>
//             <h3 className="font-semibold text-orange-800">Dates</h3>
//             <p>
//               Start:{" "}
//               {event.startDate
//                 ? format(parseISO(event.startDate), "PPP p")
//                 : "-"}
//             </p>
//             <p>
//               End:{" "}
//               {event.endDate ? format(parseISO(event.endDate), "PPP p") : "-"}
//             </p>
//           </div>

//           <div>
//             <h3 className="font-semibold text-orange-800">Location</h3>
//             <p>{event.location}</p>
//           </div>

//           <div>
//             <h3 className="font-semibold text-orange-800">Remote</h3>
//             <p>{event.isRemote ? "Yes" : "No"}</p>
//           </div>

//           <div>
//             <h3 className="font-semibold text-orange-800">Max Volunteers</h3>
//             <p>{event.maxVolunteers || "N/A"}</p>
//           </div>

//           <div>
//             <h3 className="font-semibold text-orange-800">Status</h3>
//             <p>{event.status}</p>
//           </div>
//         </div>

//         {/* Right Side - Organizer Info */}
//         <div className="bg-gray-50 rounded-xl p-4 shadow-inner space-y-2">
//           <h3 className="font-semibold text-orange-800 mb-2">🛠️ Skills Needed</h3>
          
//           {Object.keys(groupedSkills).length === 0 ? (
//       <p className="text-gray-400 text-sm">No skills listed for this event.</p>
//     ) : (
//       Object.entries(groupedSkills).map(([category, skillsInCategory]) => (
//         <div key={category}>
//           <h4 className="text-pink-900 font-semibold mb-1">{category}</h4>
//           <ul className="list-disc list-inside space-y-1">
//             {skillsInCategory.map((skill) => (
//               <li key={skill.skillId}>{skill.skillName}</li>
//             ))}
//           </ul>
//         </div>
//       ))
//     )}
//         </div>
//         <div className="bg-gray-50 rounded-xl p-2 shadow-inner space-y-2">
//           <h3 className="font-semibold text-orange-800">Organizer</h3>
//           <p>User ID: {event.userId}</p>

//           <div className="text-sm text-gray-600">
//             <p>
//               Created At:{" "}
//               {event.createdAt
//                 ? format(parseISO(event.createdAt), "PPP p")
//                 : "-"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetails;




import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEventById, updateEventById, getEventSkills } from "../services/api";
import { format, parseISO } from "date-fns";
import helping from "../assets/images/helping.png";
import { FiEdit2 } from "react-icons/fi"; // import edit icon

const EventDetails = () => {
  const { opportunityId } = useParams();
  const [event, setEvent] = useState(null);
  const [skills, setSkills] = useState([]);
  const [editFields, setEditFields] = useState({});
  const [formState, setFormState] = useState({});
  const [error, setError] = useState("");
  const [savingField, setSavingField] = useState(null);

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

        const eventSkills = await getEventSkills(opportunityId);
        setSkills(eventSkills);
      } catch (error) {
        console.error("Failed to fetch event details", error);
      }
    }
    fetchEvent();
  }, [opportunityId]);

  if (!event) return <div>Loading...</div>;

  // Toggle the edit mode of a field
  const toggleEdit = (field) => {
    setEditFields((prev) => ({ ...prev, [field]: !prev[field] }));
    setError("");
  };

  // Handle input changes
  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  // Save a field update to backend
  const saveField = async (field) => {
  try {
    const updatedField = { [field]: formState[field] };
    // Get JWT token from wherever you store (localStorage, context, redux)
    const token = localStorage.getItem('token'); // Adjust if you use another method

    const updatedEvent = await updateEventById(event.opportunityId, updatedField, token);
    setEvent((prev) => ({ ...prev, ...updatedEvent }));
    toggleEdit(field);
  } catch (err) {
    setError(err.response?.data?.message || 'Update failed');
  }
};


  // Cancel editing: revert to original event data
  const cancelEdit = (field) => {
    setFormState((prev) => ({ ...prev, [field]: event[field] || "" }));
    toggleEdit(field);
    setError("");
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden font-sans">
      {/* Header with image */}
      <div className="h-56 bg-gray-200">
        <img src={helping} alt="Event" className="w-full h-full object-cover" />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Left side - details */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-orange-800">{event.title /* not editable */}</h2>

          {/* Description */}
          <EditableField
            label="Description"
            field="description"
            value={formState.description}
            editing={editFields.description}
            editable
            onToggle={() => toggleEdit("description")}
            onChange={handleChange}
            onSave={saveField}
            onCancel={cancelEdit}
            rows={5}
            textarea
            saving={savingField === "description"}
          />

          {/* Dates */}
          <div>
            <h3 className="font-semibold text-orange-800">Dates</h3>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <EditableField
                label="Start Date"
                field="startDate"
                value={formState.startDate}
                editing={editFields.startDate}
                editable
                onToggle={() => toggleEdit("startDate")}
                onChange={handleChange}
                onSave={saveField}
                onCancel={cancelEdit}
                type="date"
                saving={savingField === "startDate"}
                className="flex-1"
              />
              <EditableField
                label="End Date"
                field="endDate"
                value={formState.endDate}
                editing={editFields.endDate}
                editable
                onToggle={() => toggleEdit("endDate")}
                onChange={handleChange}
                onSave={saveField}
                onCancel={cancelEdit}
                type="date"
                saving={savingField === "endDate"}
                className="flex-1"
              />
            </div>
          </div>

          {/* Location */}
          <EditableField
            label="Location"
            field="location"
            value={formState.location}
            editing={editFields.location}
            editable
            onToggle={() => toggleEdit("location")}
            onChange={handleChange}
            onSave={saveField}
            onCancel={cancelEdit}
            saving={savingField === "location"}
          />

          {/* Is Remote */}
          <EditableField
            label="Remote"
            field="isRemote"
            value={formState.isRemote}
            editing={editFields.isRemote}
            editable
            onToggle={() => toggleEdit("isRemote")}
            onChange={handleChange}
            onSave={saveField}
            onCancel={cancelEdit}
            asSelect
            selectOptions={["Yes", "No"]}
            saving={savingField === "isRemote"}
          />

          {/* Max Volunteers */}
          <EditableField
            label="Max Volunteers"
            field="maxVolunteers"
            value={formState.maxVolunteers}
            editing={editFields.maxVolunteers}
            editable
            onToggle={() => toggleEdit("maxVolunteers")}
            onChange={handleChange}
            onSave={saveField}
            onCancel={cancelEdit}
            type="number"
            saving={savingField === "maxVolunteers"}
          />

          {/* Status */}
          <EditableField
            label="Status"
            field="status"
            value={formState.status}
            editing={editFields.status}
            editable
            onToggle={() => toggleEdit("status")}
            onChange={handleChange}
            onSave={saveField}
            onCancel={cancelEdit}
            saving={savingField === "status"}
          />
        </div>

        {/* Right side - Skills and Organizer Info */}
        <div className="bg-gray-50 rounded-xl p-4 shadow-inner space-y-4">
          <h3 className="font-semibold text-orange-800 mb-2">🛠️ Skills Needed</h3>
          {skills.length === 0 ? (
            <p className="text-gray-400 text-sm">No skills listed for this event.</p>
          ) : (
            // Group skills by category for display
            Object.entries(
              skills.reduce((acc, skill) => {
                acc[skill.categoryName] = acc[skill.categoryName] || [];
                acc[skill.categoryName].push(skill);
                return acc;
              }, {})
            ).map(([category, skillsInCategory]) => (
              <div key={category}>
                <h4 className="text-pink-900 font-semibold mb-1">{category}</h4>
                <ul className="list-disc list-inside space-y-1">
                  {skillsInCategory.map((skill) => (
                    <li key={skill.skillId}>{skill.skillName}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
          <div className="bg-white rounded p-3 shadow-inner">
            <h3 className="font-semibold text-orange-800">Organizer</h3>
            <p>User ID: {event.userId}</p>
            <p className="text-sm text-gray-600">
              Created At:{" "}
              {event.createdAt ? format(parseISO(event.createdAt), "PPP p") : "-"}
            </p>
          </div>
        </div>
      </div>
      {error && <div className="mt-2 text-red-600 font-semibold text-center">{error}</div>}
    </div>
  );
};

// EditableField component handles both display and edit modes with inputs, selects or textarea
const EditableField = ({
  label,
  value,
  editing,
  editable,
  onToggle,
  onChange,
  onSave,
  onCancel,
  type = "text",
  field,
  className = "",
  textarea = false,
  asSelect = false,
  selectOptions = [],
  saving = false,
}) => (
  <div className={`mb-4 relative ${className}`}>
    <label className="block font-semibold mb-1">{label}</label>
    {editing ? (
      <>
        {textarea ? (
          <textarea
            className="border rounded p-2 w-full resize-y"
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            rows={4}
            disabled={saving}
          />
        ) : asSelect ? (
          <select
            className="border rounded p-2 w-full"
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            disabled={saving}
          >
            {selectOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            className="border rounded p-2 w-full"
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            disabled={saving}
          />
        )}
        <div className="mt-2 space-x-2">
          <button
            onClick={() => onSave(field)}
            disabled={saving}
            className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => onCancel(field)}
            disabled={saving}
            className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      </>
    ) : (
      <>
        <p className="inline-block">{value || "-"}</p>
        {editable && (
          <button
            onClick={() => onToggle(field)}
            className="absolute top-0 right-0 text-purple-900 hover:text-orange-700 focus:outline-none"
            aria-label={`Edit ${label}`}
          >
            <FiEdit2 />
          </button>
        )}
      </>
    )}
  </div>
);

export default EventDetails;
