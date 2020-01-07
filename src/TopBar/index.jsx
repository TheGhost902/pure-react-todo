import React from 'react'
import './style.less'

import AddButton from './AddButton'
import SearchPanel from './SearchPanel'

function TopBar(props) {
    return (
        <div className="topbar">
            <AddButton showHideAddNoteForm={props.showHideAddNoteForm}/>
            <SearchPanel notes={props.notes} filterNotes={props.filterNotes}/>
        </div>
    )
}

export default TopBar