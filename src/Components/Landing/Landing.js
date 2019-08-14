import React, {Component} from 'react'
import axios from 'axios'
import { setUser } from '../../ducks/reducer'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

class Landing extends Component {
    state= {
        usernameInput: '',
        passwordInput: ''
    }

    handleChange(e, key) {
        this.setState({
            [key]: e.target.value
        })
    }

    login = () => {
        const {
            usernameInput: username,
            passwordInput: password,
        } = this.state
        axios.post('/api/auth/login', {username, password}).then(res => {
            const {username, trainer_id, profile_pic} = res.data.user
            this.props.setUser({username, trainer_id, profile_pic})
            this.props.history.push('/dashboard')
        })
        .catch(err => {alert('login failed')})
    }

    render() {
        return (
            <div className="Landing">
                <div className="login">
                    <h1>Login</h1>
                    <div className="inputs">
                        <div className="username">
                            {/* <h2>Username</h2> */}
                            <input type="text" placeholder="Username" onChange={e =>this.handleChange(e, 'usernameInput')}/>
                        </div>
                            <div className="password">
                                {/* <h2>Password</h2> */}
                                <input type="password" placeholder="Password" onChange={e =>this.handleChange(e, 'passwordInput')}/>
                            </div>
                         </div>
                        <button className="login-button" onClick={this.login} >Submit</button>
                    
                </div>
                    <div className="buttons">
                        <h4>New user? Sign up here!</h4>
                        <Link className="Link" to="/register" >
                            <button className="register-button">Register</button>
                        </Link>
                    </div>


            </div>
        )
    }
}

export default connect(
    null,
    { setUser }
)(withRouter(Landing))