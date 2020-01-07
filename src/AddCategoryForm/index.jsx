import React from 'react'
import './style.less'

class AddCategoryForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            textInputValue: '',
            colorInputValue: '#cfffee'
        }

        this.textInputRef = React.createRef()

        this.formSubmit = this.formSubmit.bind(this)
        this.textInputChange = this.textInputChange.bind(this)
        this.colorInputChange = this.colorInputChange.bind(this)
        this.onClickHandler = this.onClickHandler.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.isShow !== prevProps.isShow) {
            
            this.setState({textInputValue: ''})

            if (this.props.isShow === true) {
                this.textInputRef.current.focus()
            }
        }
    }

    formSubmit(e) {
        e.preventDefault()

        this.props.createCategory(this.state.textInputValue, this.state.colorInputValue)

        this.setState({textInputValue: ''})

        this.props.showHide()
    }

    textInputChange(e) {
        this.setState({
            textInputValue: e.target.value
        })
    }

    colorInputChange(e) {
        this.setState({
            colorInputValue: e.target.value
        })
    }

    onClickHandler(e) {
        if (e.target.className === 'AddCategoryForm') {
            this.props.showHide()
        }
    }

    render() {
        return (
            <div
                style={{display: this.props.isShow ? '' : 'none'}}
                className="AddCategoryForm"
                onClick={this.onClickHandler}
            >

                <form onSubmit={this.formSubmit}>

                    <input
                        type="text"
                        onChange={this.textInputChange}
                        value={this.state.textInputValue}
                        ref={this.textInputRef}
                    />

                    <input
                        type="color"
                        onChange={this.colorInputChange}
                        value={this.state.colorInputValue}
                    />

                    <button type="submit">add</button>

                </form>

            </div>
        )
    }
}

export default AddCategoryForm