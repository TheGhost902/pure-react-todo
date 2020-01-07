import React from 'react'

import SomeButton from '../../../CommonComponents/SomeButton'

function Category(props) {
    const { category, filterSettings } = props
    let border

    if (filterSettings.isFiltered === true && filterSettings.lastCategory === category) {
        border = '0 0 0 5px black'
    } else {
        border = ''
    }

    return (
        <li
            className="category"
            onClick={props.onClick}
            style={{
                backgroundColor: category.color,
                boxShadow: border
            }}
        >

            {category.text}
            
            <SomeButton
                onClick={(e) => {
                    e.stopPropagation()
                    props.removeCategory(category.id)
                }}
                className="category-delete-button"
                text="X"
            />
        </li>
    )
}

export default Category