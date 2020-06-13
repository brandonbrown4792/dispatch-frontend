import React from 'react'

// need styling to ensure boxes and labels are on same line no matter how long label is

function Filter(props) {
    return <>
                <input 
                id={props.id}
                className="checkbox"
                type="checkbox" 
                value={props}
                // checked={this.state...}
                // onChange={props}
                /><label htmlFor={props.id}>Really long label name</label>
           </>
}

export default Filter