import React from 'react'

import Category from './Category'

function CategoryList(props) {
    return (
        <ul className="category-list">
            {props.categories.map(category => 
                <Category
                    key={category.id}
                    onClick={(e) => {
                        e.stopPropagation()
                        props.filterNotesByCategory(category)
                    }}
                    category={category}
                    removeCategory={props.removeCategory}
                    filterSettings={props.filterSettings}
                />
            )}
        </ul>
    )
}

export default CategoryList