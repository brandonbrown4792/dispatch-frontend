import React from 'react'
import FilterContainer from './FilterContainer'

const renderedItemSwitch = props => {
    if (props.renderedItem === 'map') {
        return 'table';
    } else {
        return 'map';
    }
}

function UtilitiesContainer(props) {
    return (
        <div>
            {props.userData.user_type !== 'patient' && <React.Fragment>
                <FilterContainer
                    userData={props.userData}
                    filterParams={props.filterParams}
                    updateFilteredUserData={props.updateFilteredUserData}
                />
                {props.userData.user_type === 'dispatcher' &&
                    <React.Fragment>
                        <button onClick={() => props.updateRenderedItem(renderedItemSwitch(props))}>
                            Toggle map/index view
                    </button>
                        <button onClick={() => props.updateRenderedItem('apptForm')}>
                            Add appointment
                    </button>
                    </React.Fragment>}
            </React.Fragment>}
        </div>
    )
}

export default UtilitiesContainer