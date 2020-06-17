import React from 'react'
import FilterContainer from './FilterContainer'
import { Button } from '@material-ui/core'

const renderedItemSwitch = props => {
    if (props.renderedItem === 'map') {
        return 'table';
    } else {
        return 'map';
    }
}

function UtilitiesContainer(props) {
    return (
        <div className='utility-container'>
            {props.userData.user_type !== 'patient' && <React.Fragment>
                <FilterContainer
                    userData={props.userData}
                    filterParams={props.filterParams}
                    updateFilteredUserData={props.updateFilteredUserData}
                />
                {props.userData.user_type === 'dispatcher' &&
                    <React.Fragment>
                        <br />
                        <Button variant="contained" onClick={() => props.updateRenderedItem(renderedItemSwitch(props))}>
                            Toggle map/index view
                        </Button><br /><br />
                        <Button variant="contained" onClick={() => props.updateRenderedItem('apptForm')}>
                            Add appointment
                        </Button>
                    </React.Fragment>}
            </React.Fragment>}
        </div>
    )
}

export default UtilitiesContainer