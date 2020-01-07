import React from 'react'
import './style.less'

import Note from './Note'

function MainBoard(props) {
    return (
        <div className="main-board">
            {props.notes.map(note => 
                <Note
                    key={note.id}
                    id={note.id}
                    text={note.text}
                    removeNote={props.removeNote}
                    isShow={note.isShow}
                    category={note.category}
                />
            )}
        </div>
    )
}

export default MainBoard