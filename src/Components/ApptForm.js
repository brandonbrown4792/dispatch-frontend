import React from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField, TextareaAutosize, Button } from '@material-ui/core'

const ApptForm = props => {

    const handleSubmit = (props) => {
        if (props.formApptData.id) {
            props.editAppointment(props.formApptData)
        } else {
            props.addAppointment(props.formApptData)
        }
        props.updateRenderedItem('map') 
    }

    return (
        <select>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option selected value="coconut">Coconut</option>
            <option value="mango">Mango</option>
        </select>
    )
}

export default ApptForm;