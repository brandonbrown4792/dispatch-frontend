import React from 'react'
import FilterContainer from './FilterContainer'

function UtilitiesContainer(props) {
    // TODO: Map filter options to container.
    // Options: Appt type, filter by date, completed appts, incomplete appts, 
    //      show nurses only, show patients only, filter appts by nurse

    return (
        <div>
            <FilterContainer filterTypes={props.filterTypes} />
            <button>
                Toggle map/index view
            </button>
        </div>
    )
}

export default UtilitiesContainer