import React, { useState } from "react";

const UnitForm = ({updateFn, unitInfo}) => {

    let initialState = unitInfo
    if (!initialState) {
        initialState = {code: '', title: '', offering: []}
    }

    const [formInfo, setFormInfo] = useState(initialState)

    const updateField = (event) => {
        // which input element is this
        const name = event.target.attributes.name.value
        console.log(name, event.target.value)
        if (name === "title") {
            setFormInfo({...formInfo, title: event.target.value})
        } else if (name === "code") {
            setFormInfo({...formInfo, code: event.target.value})
        } else if (name === "offering") {
            // The checkbox, look at the checked property to see if it 
            // is checked or not, then add or remove as necessary
            let offs = formInfo.offering
            console.log(event.target.checked, offs)
            if (event.target.checked) {
                // add it to the list if not present
                if (!offs.includes(event.target.value)) {
                    console.log("added to the list of offerings")
                    offs = [...formInfo.offering, event.target.value]
                } 
            } else {
                // remove it from the list if present
                if (offs.includes(event.target.value)) {
                    console.log("removed from the list of offerings")
                    offs = offs.filter(o => o !== event.target.value)
                }
            }
            console.log("Offerings now", offs)
            setFormInfo({...formInfo, offering: offs})
        }
    }

    // return a boolean - is this offering in the current unit offerings?
    const hasOffering = (off) => {
        return formInfo.offering.includes(off)
    }

    const formHandler = (event) => {
        event.preventDefault()
        console.log("Form submitted: ", formInfo)
        updateFn(formInfo)
        setFormInfo(initialState)
    }
    
    return (
        <form onSubmit={formHandler}>
            <label htmlFor="code">Unit Code</label>
            <input name="code" onChange={updateField} value={formInfo.code}></input>

            <label htmlFor="title">Unit Title</label>
            <input name="title" onChange={updateField} value={formInfo.title}></input>

            <label htmlFor="offerings">Offerings&nbsp;</label>
            S1 <input type="checkbox" onChange={updateField} name="offering" value="S1" defaultChecked={hasOffering("S1")}></input>
            S2 <input type="checkbox" onChange={updateField} name="offering" value="S2" defaultChecked={hasOffering("S2")}></input>
            S3 <input type="checkbox" onChange={updateField} name="offering" value="S3" defaultChecked={hasOffering("S3")}></input>


            <input type="submit"></input>
        </form>
    )
}

export default UnitForm