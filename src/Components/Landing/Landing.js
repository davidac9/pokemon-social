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
            console.log(res.data.user)
            this.props.history.push('/dashboard')
        })
        .catch(err => {alert('login failed')})
    }

    render() {
        return (
            <div className="Landing">
                <h3>Login</h3>
                <input type="text" onChange={e =>this.handleChange(e, 'usernameInput')}/>
                <input type="password" onChange={e =>this.handleChange(e, 'passwordInput')}/>
                <button onClick={this.login} >Login</button>
                    <Link to="/register" >
                        <button>Register</button>
                    </Link>

            </div>
        )
    }
}

export default connect(
    null,
    { setUser }
)(withRouter(Landing))