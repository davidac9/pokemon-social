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
    componentDidMount() {
        axios.get('/api/auth/me').then(res => {
            if(res.data.user) {
                const {username, profile_pic, trainer_id} = res.data.user
                this.props.setUser({username, profile_pic, trainer_id})
            }
        })
    }
    render() {
        return (
            <div className='true-nav'>
                <div className='Nav'>
                    <h1 onClick={() => this.props.history.push('/dashboard')}>Poké</h1>
                </div>
                    {this.props.username !== '' ?
                    <>
                        <div className="side-box">

                        <Link className="my-profile-link" to='/my-profile'>
                            <img className="profile-pic" src={this.props.profile_pic} alt='' />
                        </Link>
                        <Link to='/' >
                            <button onClick={this.logout} >Logout</button>
                        </Link>
                        </div>
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