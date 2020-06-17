import React from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField, TextareaAutosize, Button } from '@material-ui/core'

const AppointmentForm = props => {

    let formattedDateTime = props.formApptData.start_time.slice(0, 19)

    const handleSubmit = (props) => {
        if (props.formApptData.id) {
            props.editAppointment(props.formApptData)
        } else {
            props.addAppointment(props.formApptData)
        }
        props.updateRenderedItem('map') 
    }

    return (
        <FormControl >
            <FormControl > {/* select patient */}
                <InputLabel id="patient">Select Patient</InputLabel>
                <Select
                    name="patient_id"
                    id="patient_id"
                    labelId="patient"
                    value={`${props.formApptData.patient_id}`}
                    onChange={e => props.setFormState(e)}
                >
                    {props.userData.patients.map(patient => 
                        <MenuItem 
                            id="patient"
                            selected={props.formApptData.patient_id === patient.id}
                            value={`${patient.id}`}
                        >
                            {patient.name}
                        </MenuItem>)}
                </Select>
            </FormControl>
            <TextField 
                name="reason" 
                value={props.formApptData.reason} 
                label="Reason for visit" 
                onChange={e => props.setFormState(e)} />
            <FormControl > {/* select nurse */}
                { props.userData.nurses &&
                <>
                    <InputLabel id="nurse_id">Select Nurse</InputLabel>
                    <Select
                        name="nurse_id"
                        id="nurse_id"
                        labelId="nurse"
                        value={`${props.formApptData.nurse_id}`}
                        onChange={e => props.setFormState(e)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        { props.userData.nurses.map(nurse => 
                            <MenuItem 
                                id="nurse_id"
                                value={`${nurse.id}`}
                            >
                                {nurse.name}
                            </MenuItem>)}
                    </Select>
                </>}
            </FormControl>
            <FormControl > {/* select date */}
                <form noValidate>
                        {/* Date.parse this for back end */}
                        <TextField
                        id="datetime-local"
                        label="Next appointment"
                        name="start_time"
                        type="datetime-local"
                        // defaultValue={props.formApptData.start_time}
                        defaultValue={formattedDateTime}
                        onChange={e => props.setFormState(e)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
            </FormControl>
            <FormControl > {/* select length */}
                <InputLabel id="length">Estimated length</InputLabel>
                <Select
                    name="length"
                    id="length"
                    label="Estimated length"
                    value={props.formApptData.length}
                    onChange={e => props.setFormState(e)}
                >
                    <MenuItem name="length" value={30} id="length">30 minutes</MenuItem>
                    <MenuItem name="length" value={60} id="length">60 minutes</MenuItem>
                    <MenuItem name="length" value={90} id="length">90 minutes</MenuItem>
                    <MenuItem name="length" value={120} id="length">120 minutes</MenuItem>
                </Select>
            </FormControl>
            <FormControl > {/* add notes */}
                <InputLabel id="notes" value={props.formApptDatanotes}>Notes:</InputLabel>
                <TextareaAutosize rows="4" name="notes" onChange={e => props.setFormState(e)} />
            </FormControl>
            <Button type="submit" onClick={() => handleSubmit(props)}>
                Submit
            </Button>
            <Button type="cancel" onClick={() => props.updateRenderedItem('map')}>
                Cancel
            </Button>
        </FormControl>
    )
}

export default AppointmentForm;