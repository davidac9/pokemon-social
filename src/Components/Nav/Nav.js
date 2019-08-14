import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {setUser, logoutUser} from '../../ducks/reducer'
import {withRouter, Link} from 'react-router-dom'

class Nav extends Component {
    logout = () => {
        axios.post('/api/auth/logout').then(() => {
            this.props.logoutUser()
        })
    }
    render() {
        return (
            <div className='Nav'>
                <h1>Poké</h1>
                {this.props.username !== '' ? 
                <>
                <img src={this.props.profile_pic} alt='' />
                    <Link to='/' >
                        <button onClick={this.logout} >Logout</button>
                    </Link>
                </>

            : null}
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    const {username, profile_pic, trainer_id} = reduxState
    return {username, profile_pic, trainer_id}
}

export default connect(mapStateToProps, {setUser, logoutUser})(withRouter(Nav))