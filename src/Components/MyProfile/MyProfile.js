// import React, {Component} from 'react'

// export default class MyProfile extends Component {
//     componentDidMount() {

//     }
//     render() {
//         return (
//             <div className="MyProfile" >
//                 My Profile
//             </div>
//         )
//     }
// }
import React, {Component } from 'react'
import axios from 'axios'
import {setUser} from '../../ducks/reducer'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';

class MyProfile extends Component {
    state = {
        myPokemon: [],
        allPokemon: [],
        profilePic: [],
        addPokemon: false,
    }
    toggleAdd = () => {
        this.setState({
            addPokemon: !this.state.addPokemon
        })
    }
    getPokemon = () => {
        axios.get(`/api/pokemon?username=${this.props.username}`).then(pokemon => 
            this.setState({
                myPokemon: pokemon.data
            })
            )
            .catch(err => console.log(`couldn't find pokemon`))
    }
    getProfilePic = () => {
        axios.get(`/api/trainers?username=${this.props.username}`).then(pic =>
            this.setState({
                profilePic: pic.data
            })
            )
    }
    getAllPokemon = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`).then(res => {
            // this.setState({
            //     allPokemon: res.data
            // })
            console.log(res)
        })
        .catch(err => console.log(err))
    }
    componentDidMount() {
        this.getProfilePic()
        // this.getAllPokemon()
        this.getPokemon()
    }
    render() {
        const pokemonMap = this.state.myPokemon.map((el, i) => (
            <div key={i}>
                <h4>{el.nick_name}</h4>
                <img src={el.pokemon_image} alt=""/>
            </div>
        ))
        return (
            <div className="MyProfile">
                {/* {this.props.username === this.props.match.params.username ? 
                (<button>edit profile</button>) : null} */}
                <h1>{this.props.username}</h1>
                {this.state.profilePic.map((el, i) => (
                    <div key={i}>
                        <img src={el.profile_pic} alt=""/>
                    </div>
                ))}
                <button onClick={this.toggleAdd}>add pokemon</button>

                {this.state.addPokemon ? (<div className="pokemon-list">hey</div>) : null }

                {pokemonMap}
            </div>
        )
    }
}
function mapStateToProps(reduxState) {
    const {username} = reduxState
    return {username}
}

export default connect(mapStateToProps, {setUser})(withRouter(MyProfile))