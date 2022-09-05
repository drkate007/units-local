import React, { useState } from "react";
import UnitForm from './UnitForm'

const Unit = ({unit, deleteFn, updateFn}) => {

  const [editing, setEditing] = useState(false)

  const editAction = () => {
    setEditing(true)
  }
  
  const finaliseEdit =  (newUnit) => {
    console.log(newUnit)
    setEditing(false)
    updateFn(newUnit)
  }

  const cancelEdit = () => {
    setEditing(false)
  }

  if (editing) {
    return (
      <li>
      <UnitForm updateFn={finaliseEdit} unitInfo={unit} />
      <button onClick={cancelEdit}>Cancel Edit</button>
      </li>
    )
  } else {
  return (
      <li>{unit.code}: 
      {unit.title} 
      {unit.offering.map(o => <span key={o}> {o} </span>)}
      <button onClick={() => deleteFn(unit)}>Delete</button>
      <button onClick={editAction}>Edit</button>
      </li>
    )
  }

}

export default Unit