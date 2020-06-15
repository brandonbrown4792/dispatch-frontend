import React from 'react'
import { FormControl, MenuItem, Select, TextField, TextareaAutosize, Button } from '@material-ui/core'

class AppointmentForm extends React.Component {
    state = {
        name: '',
        email: '',
        reason: '',
        nurse_id: '',
        length: '',
        start_time: '',
        notes: '',
        completed: false,
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    // TODO: need a good way to fuzzy find existing patients or add new from here...

    // mapPatients = (patients) => {
    //     patients.map(patient => {
    //         <MenuItem value={patient}>{patient.name}</MenuItem>
    //     })
    // }

    render() {
        return (
            <FormControl >
                <TextField name="name" label="Patient Name" onChange={e => this.handleChange(e)} />
                <TextField name="email" label="Patient Email" onChange={e => this.handleChange(e)} />
                <TextField name="reason" label="Reason for visit" onChange={e => this.handleChange(e)} />
                {/* <TextField name="nurse_id" label="Nurse assigned" onChange={e => this.handleChange(e)} /> */}
                <Select
                    labelId="nurse_id"
                    id="nurse_id"
                    displayEmpty
                    onChange={this.handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {this.props.userData.nurses.map(nurse => 
                        <MenuItem value={nurse}>{nurse.name}</MenuItem>)}
                </Select>
                <TextField name="length" label="Estimated length (minutes)" onChange={e => this.handleChange(e)} />
                <TextField name="start_time" label="Ideal start time" onChange={e => this.handleChange(e)} />
                <TextareaAutosize rows="4" onChange={e => this.handleChange(e)} />
                <Button type="submit" onClick={() => this.props.addAppointment(this.state)}>
                    Submit
                </Button>
                <Button type="cancel" onClick={() => this.props.updateRenderedItem('map')}>
                    Cancel
                </Button>
            </FormControl>
        )
    }
}

export default AppointmentForm;