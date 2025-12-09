import React from "react";
import PropTypes from "prop-types";

/**
 * SkillIcon - Displays a skill icon from react-icons
 * @param {Object} props - Component props
 * @param {string} props.name - Skill name
 * @param {React.ReactElement} props.icon - Icon component
 * @returns {React.ReactElement}
 */
function SkillIcon({ name, icon: IconComponent }) {
  if (!IconComponent) {
    return <span>{name}</span>;
  }

  return (
    <div className="skill-icon-wrapper" title={name}>
      <IconComponent />
    </div>
  );
}

SkillIcon.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
};

SkillIcon.defaultProps = {
  icon: null,
};

export default React.memo(SkillIcon);
