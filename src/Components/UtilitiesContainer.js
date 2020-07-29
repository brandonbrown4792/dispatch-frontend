import React, { useState } from 'react'
import FilterContainer from './FilterContainer'
import { Button, Modal } from '@material-ui/core'

const renderedItemSwitch = props => {
    if (props.renderedItem === 'map') {
        return 'table';
    } else {
        return 'map';
    }
}

function UtilitiesContainer(props) {
    const [showLoginInstructions, setShowLoginInstructions] = useState(false)

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
            <br /><br />
            <Button variant="contained" onClick={() => setShowLoginInstructions(true)}>
                Open Login Instructions
            </Button>
            {showLoginInstructions &&
                <Modal
                    open={showLoginInstructions}
                    onClose={() => setShowLoginInstructions(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"

                >
                    <div className='modal'>
                        <div className='login-instructions-container'>
                            <div className='login-instructions-title'>Login Instructions</div>
                            <div className='login-main-instructions'>Login with the following credentials to see different user interfaces</div>
                            <div className='login-note-type'>Dispatcher</div>
                            <div className='login-note-instruction'>Username: brandon@brandon.com</div>
                            <div className='login-note-instruction'>Password: 123</div>
                            <div className='login-note-type'>Nurse</div>
                            <div className='login-note-instruction'>Username: robert@robert.com</div>
                            <div className='login-note-instruction'>Password: 123</div>
                            <div className='login-note-type'>Patient</div>
                            <div className='login-note-instruction'>Username: geoffrey@geoffrey.com</div>
                            <div className='login-note-instruction'>Password: 123</div>
                        </div>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default UtilitiesContainer