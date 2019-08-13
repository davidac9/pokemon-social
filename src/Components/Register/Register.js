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
            this.props.history.push('/dashboard')
        })
        // .catch(err => {alert('u is not registered try again')})
        
    }
    render() {
        return (
            <div className="Register">
                <div className='username'>
                    <h3>username</h3>
                    <input type="text" onChange={e => this.handleChange(e, 'usernameInput')} />
                </div>
                <div className='password'>
                    <h3>password</h3>
                    <input type="password" onChange={e => this.handleChange(e, 'passwordInput' )} />
                </div>
                <div className='profile-pic'>
                    <h3>Profile image url</h3>
                    <input type="text" onChange={e => this.handleChange(e, 'profilePicInput' )} />
                </div>
                <button onClick={this.register}>submit</button>
            </div>
        )
    }
}

export default connect(
    null,
    { setUser }
)(withRouter(Register))