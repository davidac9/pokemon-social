import React, {Component} from 'react'
import axios from 'axios'
import {setUser} from '../../ducks/reducer'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

class Register extends Component {
    state = {
        usernameInput: '',
        passwordInput: '',
        profilePicInput: ''
    }

    handleChange(e, key) {
        this.setState({
            [key]: e.target.value
        })
    }
    register = () => {
        const {
            usernameInput: username,
            passwordInput: password,
            profilePicInput: profile_pic
        } = this.state
        axios.post('/api/auth/register', {username, password, profile_pic}).then(res => {
            const {username, trainer_id, profile_pic} = res.data.user
            this.props.setUser({username, trainer_id, profile_pic})
            this.props.history.push(`/my-profile/${username}`)
        })
        .catch(err => {alert('Failed to register. Try again')})
        
    }
    render() {
        return (
            <div className="Register">
                <div className="container">  
                    <h1>Register</h1>
                    <div className="inputs">
                        <div className='username'>
                        <input type="text" placeholder="Username" onChange={e => this.handleChange(e, 'usernameInput')} />
                        </div>
                        <div className='password'>
                        <input type="password" placeholder="Password" onChange={e => this.handleChange(e, 'passwordInput' )} />
                        </div>
                        <div className='profile-pic'>
                        <input type="text" placeholder="Profile image URL" onChange={e => this.handleChange(e, 'profilePicInput' )} />
                        </div>
                    </div>
                    <button onClick={this.register}>Submit</button>
                </div>
                <div className="cancel">
                    <h4>Already have an account? Click here!</h4>
                    <Link className="Link" to="/">
                        <button>Cancel</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    { setUser }
)(withRouter(Register))