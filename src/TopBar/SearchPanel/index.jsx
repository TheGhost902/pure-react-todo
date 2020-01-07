import React from 'react'

import SearchInput from './SearchInput'

function SerachPanel(props) {
    return (
        <div className="search-panel">
            <SearchInput notes={props.notes} filterNotes={props.filterNotes}/>
        </div>
    )
}

export default SerachPanel