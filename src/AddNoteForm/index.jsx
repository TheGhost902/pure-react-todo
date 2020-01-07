import React from 'react'

import './style.less'

class AddNoteForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: '',
            selectValue: props.categories[0].id
        }

        this.inputRef = React.createRef()

        this.inputChange    = this.inputChange.bind(this)
        this.formSubmit     = this.formSubmit.bind(this)
        this.onClickHandler = this.onClickHandler.bind(this)
        this.selectChange   = this.selectChange.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.isShow !== prevProps.isShow) {
            this.setState({
                value: '',
                // selectValue: this.props.categories[0].id
            })

            if (this.props.isShow === true) {
                this.inputRef.current.focus()
            }
        }
    }

    inputChange(e) {
        this.setState({value: e.target.value})
    }

    formSubmit(e) {
        e.preventDefault()

        this.props.createNote({
            text: this.state.value,
            categoryID: parseInt(this.state.selectValue, 10)
        })

        this.setState({
            value: '',
            // selectValue: this.props.categories[0].id
        })

        this.props.showHide() //должно быть последним
    }

    onClickHandler(e) {
        if (e.target.className === 'AddNoteForm') {
            this.props.showHide()
        }
    }

    selectChange(e) {
        this.setState({selectValue: e.target.value})
    }

    render() {

        return (
            <div
                style={{display: this.props.isShow ? '' : 'none'}}
                className="AddNoteForm"
                onClick={this.onClickHandler}
            >

                <form onSubmit={this.formSubmit}>

                    <input
                        type="text"
                        onChange={this.inputChange}
                        value={this.state.value}
                        ref={this.inputRef}
                    />

                    <select value={this.state.selectValue} onChange={this.selectChange}>
                        {this.props.categories.map(category => 
                            <option value={category.id} key={category.id}>{category.text}</option>
                        )}
                    </select>

                    <button type="submit">add</button>
                </form>

            </div>
        )
    }
}

export default AddNoteForm