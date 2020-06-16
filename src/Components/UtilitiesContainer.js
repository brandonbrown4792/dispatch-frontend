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
            <FilterContainer
                userData={props.userData}
                filterParams={props.filterParams}
                updateFilteredUserData={props.updateFilteredUserData}
            />
            Buttons:
            <button onClick={() => props.updateRenderedItem(renderedItemSwitch(props))}>
                Toggle map/index view
            </button>
            <button onClick={() => props.updateRenderedItem('apptForm')}>
                Add appointment
            </button>
        </div>
    )
}

export default UtilitiesContainer