import React from 'react'

function SomeButton(props) {
    return (
        <button
            onClick={props.onClick}
            className={props.className}
        >
            {props.text}
        </button>
    )
}

export default SomeButton