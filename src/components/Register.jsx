import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

class Register extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirm_password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async event => {
        event.preventDefault()
        // check that passwords match. if not, notify user and clear password fields
        if (this.state.password !== this.state.confirm_password){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Your passwords do not match'
            })
            this.setState({
                password: '',
                confirm_password: ''
            })

        }
        const { firstname, lastname, email, password } = this.state
        await axios.post('/auth/register', { firstname, lastname, email, password })
        this.setState({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirm_password: ''
        })
        
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} type="text" name='firstname' placeholder='First Name' />
                <input onChange={this.handleChange} type="text" name='lastname' placeholder='Last Name' />
                <input onChange={this.handleChange} type="text" name='email' placeholder='Email' />
                <input onChange={this.handleChange} type="password" name='password' placeholder='Password' value={this.state.password} />
                <input onChange={this.handleChange} type="password" name='confirm_password' placeholder='Confirm Password' value={this.state.confirm_password} />
                <button onClick={this.handleSubmit}>Register</button>
                <Link to='/'><button>Back</button></Link>
            </form>
        )
    }
}

export default Register