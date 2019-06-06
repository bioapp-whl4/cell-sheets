import React, {Component} from 'react'

class Filter extends Component {
    state = {

    }

    handleInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        })}

    return(){
        render(
            <input type="text"/>
        )
    }
}