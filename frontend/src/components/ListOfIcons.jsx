import React from 'react'
import { icons } from '../assets/IconData'
import IconBar from './IconBar'

function ListOfIcons() {
  return (
    <div style={{ display: "flex", gap: "100px", marginTop:"5px", justifyContent:"center" ,zIndex:"20"}}>
    {icons.map((icon, index) => (
      <IconBar key={index} icon={icon} />
    ))}
  </div>
  )
}

export default ListOfIcons