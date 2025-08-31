import React from 'react';
import Select from 'react-select';

const SkillSelector = ({ selectedSkills, onChange, skillsOptions, placeholder = "Select skills..." }) => (
  <Select
    isMulti
    options={skillsOptions}
    value={selectedSkills}
    onChange={onChange}
    placeholder={placeholder}
    closeMenuOnSelect={false}
  />
);

export default SkillSelector;
