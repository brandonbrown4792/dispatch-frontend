import React from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField, TextareaAutosize, Button } from '@material-ui/core'

class AppointmentForm extends React.Component {
    state = {
        start_time: null,
        length: null,
        patient_id: null,
        nurse_id: null,
        reason: null,
        notes: null,
        completed: false,
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (props) => {
        this.props.addAppointment(this.state)
        this.props.updateRenderedItem('map') 
    }

    render() {
        return (
            <FormControl >
                <FormControl > {/* select patient */}
                    <InputLabel id="patient">Select Patient</InputLabel>
                    <Select
                        name="patient_id"
                        onChange={this.handleChange}
                    >
                        {this.props.userData.patients.map(patient => 
                            <MenuItem 
                                value={patient.id}
                                id="patient"
                            >
                                {patient.name}
                            </MenuItem>)}
                    </Select>
                </FormControl>
                <TextField name="reason" label="Reason for visit" onChange={e => this.handleChange(e)} />
                <FormControl > {/* select nurse */}
                    <InputLabel id="nurse_id">Select Nurse</InputLabel>
                    <Select
                        name="nurse_id"
                        onChange={this.handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {this.props.userData.nurses.map(nurse => 
                            <MenuItem 
                                id="nurse_id"
                                value={nurse.id}
                            >
                                {nurse.name}
                            </MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl > {/* select date */}
                    <form noValidate>
                            {/* Date.parse this for back end */}
                            <TextField
                            id="datetime-local"
                            label="Next appointment"
                            hintText="Select the date"
                            name="start_time"
                            type="datetime-local"
                            onChange={this.handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                </FormControl>
                <FormControl > {/* select length */}
                    <InputLabel id="length">Estimated length</InputLabel>
                    <Select
                        label="Estimated length"
                        id="length"
                        name="length"
                        onChange={this.handleChange}
                    >
                        <MenuItem name="length" value={30} id="length">30 minutes</MenuItem>
                        <MenuItem name="length" value={60} id="length">60 minutes</MenuItem>
                        <MenuItem name="length" value={90} id="length">90 minutes</MenuItem>
                        <MenuItem name="length" value={120} id="length">120 minutes</MenuItem>
                    </Select>
                </FormControl>
                <FormControl > {/* add notes */}
                    <InputLabel id="notes">Notes:</InputLabel>
                    <TextareaAutosize rows="4" name="notes" onChange={e => this.handleChange(e)} />
                </FormControl>
                <Button type="submit" onClick={() => this.handleSubmit(this.state)}>
                    Submit
                </Button>
                <Button type="cancel" onClick={() => this.updateRenderedItem('map')}>
                    Cancel
                </Button>
            </FormControl>
        )
    }
}

export default AppointmentForm;