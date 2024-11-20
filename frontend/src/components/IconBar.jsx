import React from 'react'
import { useNavigate } from 'react-router-dom';

function IconBar({icon}) {
   const {iconName,iconPath, iconLink,iconalt} = icon 
   const navigate = useNavigate();

   const handleNavigation = () => {
    if (iconLink) {
      navigate(`/${iconLink}`);
    } else {
      console.error('IconLink is undefined:', iconLink);
    }
  };


  return (<div className='Iconcontainer' >
    <img src={iconPath} alt={iconalt} style={{ width: '100px', height: '100px' }} onClick={handleNavigation}/>
    <p>{iconName}</p>
</div>)
}

export default IconBar ;