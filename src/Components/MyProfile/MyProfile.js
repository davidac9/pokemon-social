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
        pokemonSelected: false,
        pokemonSelectedID: 0,
        pokemonSelectedName: ''
    }
    toggleAdd = () => {
        this.setState({
            addPokemon: !this.state.addPokemon
        })
    }
    toggleSelect = (pokemonID, pokemonName) => {
        if (this.state.pokemonSelected === false) {
            this.setState({
                pokemonSelected: true
            })
        }
        this.setState({
            pokemonSelectedID: pokemonID,
            pokemonSelectedName: pokemonName
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
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=807`).then(res => {
            this.setState({
                allPokemon: res.data.results
            })
            
        })
        .catch(err => console.log(err))
    }
    addPokemon = () => {
        const body = {
            trainer_id: this.props.trainer_id,
            pokemon_image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.pokemonSelectedID}.png`,
            nick_name: this.state.pokemonName
        }
        axios.post(`/api/pokemon`, body).then(res => {

        })
        .catch(err => {alert('something went wrong please try again')})
    }
    componentDidMount() {
        this.getProfilePic()
        this.getAllPokemon()
        this.getPokemon()
    }
    render() {
        const pokemonMap = this.state.myPokemon.map((el, i) => (
            <div className="my-pokemon" key={i}>
                <h4>{el.nick_name}</h4>
                <img src={el.pokemon_image} alt=""/>
            </div>
        ))
        const allPokemonMap = this.state.allPokemon.map((el, i) => (
            <div className='add-pokemon' key={i}>
                <h4 onClick={() => this.toggleSelect(i+1, el.name)}>{el.name}</h4>
                {/* <img className="pokemon-pic" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`} alt=""/> */}

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

                {this.state.addPokemon ? (<div><div className="pokemon-list">
                {allPokemonMap}
                </div>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.pokemonSelectedID}.png`} alt=""/>
                <button onClick={this.addPokemon}>Catch pokemon!</button>
                </div>) : null }

                {pokemonMap}
            </div>
        )
    }
}
function mapStateToProps(reduxState) {
    const {username, trainer_id} = reduxState
    return {username, trainer_id}
}

export default connect(mapStateToProps, {setUser})(withRouter(MyProfile))