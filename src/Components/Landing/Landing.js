import React, {Component} from 'react'

export default class Landing extends Component {
    state= {
        usernameInput: '',
        passwordInput: ''
    }
    login = () => {
        const {
            usernameInput: username,
            passwordInput: password,
        } = this.state
        axios.post('/auth/login', {username, password})
    }
    render() {
        return (
            <div className="Landing">
                Landing
            </div>
        )
    }
}