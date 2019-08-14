import React, {Component} from 'react'
import axios from 'axios';

export default class Dashboard extends Component {
    state = {
        searchInput: '',
        posts: []
    }
    getPosts = () => {
        axios.get(`/api/posts?username=${this.state.searchInput}`).then(posts =>
            // console.log(posts)
            this.setState({
                posts: posts.data
            })
            )
            .catch(err => (console.log(`can't find posts`)))
    }
    componentDidMount() {
        this.getPosts()
    }
    render() {
        return (
            <div className="Dashboard">
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