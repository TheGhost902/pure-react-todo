import React from 'react'

class SearchInput extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: ''
        }

        this.inputChange = this.inputChange.bind(this)
        this.clearInput = this.clearInput.bind(this)
    }

    inputChange(e) {
        const { value } = e.target
        this.setState({value})

        this.props.filterNotes(value)
    }

    clearInput() {
        this.setState({value: ''})

        this.props.filterNotes('')
    }

    render() {
        return (
            <div>
                <input 
                    type="text"
                    onChange={this.inputChange}
                    value={this.state.value}
                    placeholder="Search..."
                />

                <button onClick={this.clearInput}>Clear</button>
            </div>
            
        )
    }
}

export default SearchInput