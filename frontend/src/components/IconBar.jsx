import React from 'react';
import { useNavigate } from 'react-router-dom';

function IconBar({ icon }) {
  const { iconName, iconPath, iconLink, iconalt } = icon;
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (iconLink) {
      navigate(`/${iconLink}`);
    } else {
      console.error('IconLink is undefined:', iconLink);
    }
  };

  return (
    <div className="icon-container" onClick={handleNavigation}>
      <img className="icon-img" src={iconPath} alt={iconalt} />
      <p style={{marginTop:"20px",marginBottom:"-20px"}}>{iconName}</p>
    </div>
  );
}

export default IconBar;
