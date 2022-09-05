import React, { useState, useEffect } from "react";
import UnitForm from "./UnitForm.js"
import Unit from "./Unit.js"
import axios from 'axios'

const baseURL = "/api/"

const App = () => {
  
  const [units, setUnits] = useState([])

  const addNewUnit = (newUnit) => {

    axios.post("/api/units", newUnit)
    .then(response => {
      console.log("POST response", response)
      setUnits([...units, response.data])
    })
  }

  const fetchUnits = () => {
    axios.get("/api/units")
    .then((response) => {
      console.log("response: ", response)
      setUnits(response.data)
    })
  }

  useEffect(() => {
    fetchUnits()
  },[])

  const deleteUnit = (unit) => {
    console.log("delete", unit)
    axios.delete("/api/units/" + unit.id)
    .then((response) => {
      console.log("delete succeeded")
      // delete local copy
      const newUnits = units.filter(u => u.id !== unit.id)
      setUnits(newUnits)
    })
    .catch((error) => {
      console.log("ERROR!")
      // refresh the list of units from the server
      fetchUnits()
    })
  }

  const updateUnit = (unit) => {
    console.log("updating unit", unit)
    axios.put("/api/units/" + unit.id, unit)
    .then((response) => {
      console.log("RESPONSE", response)
      fetchUnits()
    })
  }

  return (
    <div className="App">
      <UnitForm updateFn={addNewUnit}/>

      <ul>
       {units.map((unit) => (<Unit key={unit.id} unit={unit} deleteFn={deleteUnit} updateFn={updateUnit}/>))}
      </ul>
    </div>
  );
}

export default App;
