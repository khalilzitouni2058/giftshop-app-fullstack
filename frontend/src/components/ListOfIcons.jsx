import React from 'react'
import { icons } from '../assets/IconData'
import IconBar from './IconBar'

function ListOfIcons() {
  return (
    <div style={{ display: "flex", gap: "100px", marginTop:"100px", justifyContent:"center" }}>
    {icons.map((icon, index) => (
      <IconBar key={index} icon={icon} />
    ))}
  </div>
  )
}

export default ListOfIcons