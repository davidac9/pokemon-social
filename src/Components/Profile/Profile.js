import React, { Component } from 'react'
import axios from 'axios'
import { setUser } from '../../ducks/reducer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

class Profile extends Component {
    state = {
        myPokemon: [],
        allPokemon: [],
        profilePic: [],
        myFavorite: [],
        myFavoriteID: 0
    }
    getPokemon = () => {
        axios.get(`/api/pokemon?username=${this.props.match.params.username}`).then(pokemon =>
            this.setState({
                myPokemon: pokemon.data
            })
        )
            .catch(err => console.log(`couldn't find pokemon`))
    }
    getProfilePic = () => {
        axios.get(`/api/trainers?username=${this.props.match.params.username}`).then(pic =>
            this.setState({
                profilePic: pic.data
            })
        )
    }
    // getAllPokemon = () => {
    //     axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151`).then(res => {
    //         this.setState({
    //             allPokemon: res.data
    //         })
    //     })
    //     .catch(err => console.log(err))
    // }
    componentDidMount() {
        this.getProfilePic()
        // this.getAllPokemon()
        this.getPokemon()
        this.getFavorite()
    }
    getFavorite = () => {
        axios.get(`/api/favorite/pokemon?username=${this.props.match.params.username}`).then(res => {
            this.setState({
                myFavorite: res.data,
                myFavoriteID: res.data[0].pokemon_id
            })
        }
        )
            .catch(err => console.log(`couldn't get favorite`))
    }
    render() {
        const pokemonMap = this.state.myPokemon.map((el, i) => (
            <div  className={`pokemon-container `} key={i}>
                <h4>{el.nick_name}</h4>
                <img className={`pokemon-image ${el.type_1}`} src={el.pokemon_image} alt="" />
            </div>
        ))
        const favoriteMap = this.state.myFavorite.map((el, i) => (
            <div className={`pokemon-container`} key={i}>
                <h4>{el.nick_name}</h4>
                <img className={`pokemon-image favorite-image ${el.type_1}`} src={el.pokemon_image} alt="" />
            </div>
        ))
        return (
            <div className="Profile">
                {this.props.username === this.props.match.params.username ?
                    (<button>edit profile</button>) : null}
                <h1>{this.props.match.params.username}</h1>
                {this.state.profilePic.map((el, i) => (
                    <div key={i}>
                        <img src={el.profile_pic} alt="" />
                    </div>
                ))}
                <h1  >My Pokémon!</h1>
<div className="pokemon-inventory favorite-inventory">
{favoriteMap}
</div>
                <div className="pokemon-inventory">
                {pokemonMap}
                </div>
            </div>
        )
    }
}
function mapStateToProps(reduxState) {
    const { username } = reduxState
    return { username }
}

export default connect(mapStateToProps, { setUser })(withRouter(Profile))