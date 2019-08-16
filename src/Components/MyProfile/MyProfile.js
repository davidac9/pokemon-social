import React, { Component } from 'react'
import axios from 'axios'
import { setUser } from '../../ducks/reducer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

class MyProfile extends Component {
    state = {
        myPokemon: [],
        allPokemon: [],
        profilePic: [],
        addPokemon: false,
        pokemonSelected: false,
        pokemonSelectedID: 0,
        nick_name: '',
        shiny: false,
        pokemon_image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png`
    }
    toggleAdd = () => { // this function makes the content for adding a pokemon appear or disappear
        this.setState({
            addPokemon: !this.state.addPokemon

        })
    }
    toggleShiny = () => { // this toggles the shininess of a pokemon and updates the image
        if (this.state.shiny === false) {
            this.setState({
                shiny: !this.state.shiny,
                pokemon_image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${this.state.pokemonSelectedID}.png`
            })
        } else {
            this.setState({
                shiny: !this.state.shiny,
                pokemon_image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.pokemonSelectedID}.png`
            })
        }
    }
    toggleSelect = (pokemonID, pokemonName) => { // makes input boxes appear when you select a pokemon and it is supposed to make a pokemon appear in the image
        if (this.state.pokemonSelected === false) {
            this.setState({
                pokemonSelected: true
            })
        }
        this.setState({
            pokemonSelectedID: pokemonID,
            nick_name: pokemonName,
            pokemon_image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`
        })

    }
    getPokemon = () => { // this function makes the user's pokemon appear on the page
        const {username} = this.props
        axios.get(`/api/pokemon?username=${this.props.match.params.username}`).then(pokemon =>{
            this.setState({
                myPokemon: pokemon.data
            })}
        )
            .catch(err => console.log(`couldn't find pokemon`))
    }
    getProfilePic = () => { // this gets the users profile picture so it will display on the page
        axios.get(`/api/trainers?username=${this.props.username}`).then(pic =>
            this.setState({
                profilePic: pic.data
            })
        )
    }
    getAllPokemon = () => { // this gets every pokemon name and puts them in the list that appears in the add pokemon menu
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=807`).then(res => {
            this.setState({
                allPokemon: res.data.results
            })

        })
            .catch(err => console.log(err))
    }
    addPokemon = () => { // this adds the selected pokemon from the list to the user's pokemon then calls the function to get the user's pokemon and profile pic
        const { trainer_id } = this.props
        const { nick_name, pokemon_image } = this.state
        axios.post(`/api/pokemon`, { trainer_id, pokemon_image, nick_name }).then(res => {
            this.getPokemon()
            this.getProfilePic()
        })
            .catch(err => { alert('something went wrong please try again') })
        this.setState({
            addPokemon: false,
            pokemonSelected: false,
            pokemonSelectedID: 0,
            nick_name: '',
            shiny: false,
            pokemon_image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${0}.png`
        })

    }
    handleChange(e, key) { // this is for handling change in input boxes. Right now it's only for the pokemon nicknames
        this.setState({
            [key]: e.target.value
        })
    }
    componentDidMount() {
        this.getProfilePic()
        this.getAllPokemon()
        this.getPokemon()
    }
    shinyCheck = () => { // this checks if a selected pokemon is shiny or not and updates the pokemon image
        if (this.state.shiny === true) {
            this.setState({
                pokemon_image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${this.state.pokemonSelectedID}.png`

            })
        } else {
            this.setState({
                pokemon_image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.state.pokemonSelectedID}.png`
            })
        }
    }
    releasePokemon(pokemon_id) {
        axios.delete(`/api/pokemon?trainer_id=${this.props.trainer_id}&pokemon_id=${pokemon_id}`).then(res => {
            this.getPokemon()
            this.getProfilePic()
        })
        .catch(err => {
            alert(`you can't delete your favorite pokemon!`)
            console.log(`couldn't delete`)
        })

    }
    rename(pokemon_id) {
        // put the rename function stuff in here
    }
    render() {
        const pokemonMap = this.state.myPokemon.map((el, i) => ( // this displays a user's pokemon
            
            <div className="my-pokemon" key={i}>
                <h4>{el.nick_name}</h4>
                <img onClick={() => this.releasePokemon(el.pokemon_id)} src={el.pokemon_image} alt="" />
            </div>
        ))
        const allPokemonMap = this.state.allPokemon.map((el, i) => ( // this displays the list of all pokemon and the user can select from the list and name the pokemon if they want and choose whether or not it is shiny before they add it
            <div className='add-pokemon' key={i}>
                <h4 onClick={() => this.toggleSelect(i + 1, el.name)}>{el.name}</h4>

            </div>
        ))
        return (
            <div className="MyProfile">
                <h1 onClick={() => console.log(this.state)}>{this.props.username}</h1>
                {/* {this.state.profilePic.map((el, i) => (
                    <div key={i}>
                        <img src={el.profile_pic} alt="" />
                    </div>
                ))} */}
                <img src={this.props.profile_pic} alt="" />
                <button onClick={this.toggleAdd}>add pokemon</button>

                {this.state.addPokemon ? (<div><div className="pokemon-list">
                    {allPokemonMap}
                </div>
                    {this.state.pokemonSelected ?
                        <div className="input-container">
                            <h1>Name your pokemon here!</h1>
                            <input type="text" value={this.state.nick_name} onChange={e => this.handleChange(e, 'nick_name')} />
                            <input type="checkbox" onChange={this.toggleShiny} />
                        </div> : null}
                    <img src={this.state.pokemon_image} alt="" />
                    <button onClick={this.addPokemon}>Catch pokemon!</button>
                </div>) : null}

                {pokemonMap}
            </div>
        )
    }
}
function mapStateToProps(reduxState) {
    const { username, trainer_id, profile_pic } = reduxState
    return { username, trainer_id, profile_pic }
}

export default connect(mapStateToProps, { setUser })(withRouter(MyProfile))