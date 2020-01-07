import React from 'react'

function AddButton(props) {
    return (
        <button onClick={props.showHideAddNoteForm}>+Add new note</button>
    )
}

export default AddButton