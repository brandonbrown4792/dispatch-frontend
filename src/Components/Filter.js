import React from 'react'

function Filter(props) {
    return <>
                <input 
                id={props.id}
                type="checkbox" 
                value={props}
                // checked={this.state...}
                onChange={props}
                />
                <label htmlFor={props.id}>Label</label>
           </>
}

export default Filter