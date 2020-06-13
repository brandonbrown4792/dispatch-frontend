import React from 'react'
import Filter from './Components/Filter'

function FilterContainer(props) {
    let filterMap = props.options.map(option => <Filter option={option} /> )
    return (
        <div>
            <h3>Filters:</h3>
            {filterMap(props)}
        </div>
    )
}

export default FilterContainer 