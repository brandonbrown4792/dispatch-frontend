import React from 'react'
import Filter from './Filter'

function FilterContainer(props) {
    // Map over props.filterTypes to create array of <Filter /> components with labels == filterTypes

    // let filterMap = props.options.map(option => <Filter option={option} /> )
    // need to assign a unique ID to each filter so we can use it in it's htmlFor label later
    return (
        <div>
            <h3>Filters:</h3>
            <Filter />
            {/* {filterMap(props)} */}
        </div>
    )
}

export default FilterContainer 