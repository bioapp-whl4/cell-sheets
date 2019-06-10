import React, { Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
    state = {
        email: '',
        password: '',
        loginError: false,
        authenticated: false,
        loginErrorMessage: 'Username or Password is incorrect. Please try again',

    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleSubmit = async() => {
        const {email,password} = this.state
        try {
        await axios.post('/auth/login',{email,password})
        this.setState({loginError: false})
        //     this.props.updateAuthenticated(user.data.authenticated)
            this.props.history.push('/dashboard')
        }

        catch(err) {this.setState({ email: '', password: '', loginError: true, authenticated: false })

    }
}

render() {
    console.log('the state of things',this.state)
    return(
        <div className='login'>
            <div className='loginBG'></div>
            <img className='BG'alt='labratory'src='http://news.efinancialcareers.com/binaries/content/gallery/efinancial-careers/articles/2018/11/lab.jpg'/>
                <div className='loginContents'>
                <h1>Cell Sheets</h1>
                <h3>Email</h3>
                <input value={this.state.email} placeholder='Email' name='email'onChange={this.handleChange}/>
                <h3>Password</h3>
                <input value={this.state.password} placeholder='Password' type='password' name='password' onChange={this.handleChange}/>
                <button className='loginSubmit' onClick={this.handleSubmit}>Submit</button>
                <Link to='/register'><button className='loginRegister'>Register</button></Link>
                {this.state.loginError && <h3>{this.state.loginErrorMessage}</h3>}
                </div> 
        </div>
    )
}
}
// const mapDispatchToProps = {
//     updateAdmin,
//     updateAuthenticated
// }
// export default connect(null, mapDispatchToProps)(withRouter(Login))
export default withRouter(Login)