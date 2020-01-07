import React from 'react'

import SomeButton from '../../CommonComponents/SomeButton'

function Note(props) {
    return (
        <div
            className="note"
            style={{
                display: props.isShow ? '' : 'none',
                backgroundColor: props.category.color
            }}
        >

            <p>{props.text}</p>

            <SomeButton
                onClick={() => props.removeNote(props.id)}
                className="note-delete-button"
                text="X"
            />
            
        </div>
    )
}

export default Note