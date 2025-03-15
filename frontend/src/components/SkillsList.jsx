import React from 'react';

const SkillsList = ({ skills, setSkills }) => {
  const handleRemoveSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-medium text-orange-500">skills</h3>
        <h3 className="text-2xl font-medium text-gray-800">Recomandations</h3>
      </div>
      
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between mb-2">
            <div className="w-1/2 pr-2">
              <div className="p-3 font-medium text-gray-800 bg-pink-100 rounded-md">
                {skill.name}
              </div>
            </div>
            
            <div className="flex items-center w-1/2 pl-2">
              <div className="flex-1 p-3 font-medium text-gray-800 bg-pink-100 rounded-md">
                {skill.level}
              </div>
              <button 
                onClick={() => handleRemoveSkill(index)} 
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsList;