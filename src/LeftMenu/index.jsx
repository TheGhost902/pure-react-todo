import React from 'react'
import './style.less'

import CategoryList from './CategoryList'

function LeftMenu(props) {
    return (
        <div className="left-menu">
            <CategoryList
                categories={props.categories}
                removeCategory={props.removeCategory}
                filterNotesByCategory={props.filterNotesByCategory}
                filterSettings={props.filterSettings}
            />

            <button
                onClick={props.showHideAddCategoryForm}
                className="left-menu__show-form"
            >
                Add new Category
            </button>
        </div>
    )
}

export default LeftMenu