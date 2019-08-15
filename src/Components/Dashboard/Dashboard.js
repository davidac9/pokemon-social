import React, {Component} from 'react'
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from '../../ducks/reducer'


class Dashboard extends Component {
    state = {
        searchInput: '',
        posts: [],
        postInput: '',

    }
    getPosts = () => {
        axios.get(`/api/posts?username=${this.state.searchInput}`).then(posts =>
            // console.log(posts)
            this.setState({
                posts: posts.data.sort((a, b) => {return b.post_id-a.post_id})
            })
            )
            .catch(err => (console.log(`can't find posts`)))
    }
    handleChange(e, key) {
        this.setState({
            [key]: e.target.value
        })
    }
    addPost = () => {
        if (this.props.trainer_id === 0) {
            alert('you need to login to post!')
        } else if (this.state.postInput === '') {
            alert('you need to type something before you can post!')
        }
        else {

            const body = {
                trainer_id: this.props.trainer_id,
                post_text: this.state.postInput
            }
            axios.post(`/api/posts`, body ).then({
                
            })
            .catch(err => alert(`Oops! Your post couldn't be posted! Try again!`))
            this.setState({
                postInput: ''
            })
            this.getPosts()
        }
    }
    componentDidMount() {
        this.getPosts()
    }
    render() {
        return (
            <div className="Dashboard">
                <div className="new-post-container">
                    <textarea className="post-input" type="text" onChange={e => this.handleChange(e, 'postInput')} value={this.state.postInput}/>
                    <button onClick={this.addPost}>add post</button>
                </div>
                <h1>dashboard</h1>
                {this.state.posts.map((el, i) => (
                    <div className="post" key={i}>
                        <p>{el.username}</p>
                        <img className="user-pic" src={el.profile_pic} alt=""/>
                        <span>
                            {el.post_text}
                        </span>    
                    </div>
                ))}
            </div>
        )
    }
}
function mapStateToProps(reduxState) {
    const {username, profile_pic, trainer_id} = reduxState
    return {username, profile_pic, trainer_id}
}

export default connect(mapStateToProps, {setUser})(withRouter(Dashboard))