import React, { Component } from 'react'
import axios from 'axios'

export default class Pokemon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editName: false,
            nick_name: '',
            type1: '',
            type2: ''
        }
    }
    setName = () => {
        this.setState({
            nick_name: ''
        })
    }

    componentDidMount() {
        this.setName()
        // this.getType(this.props.pokemon.pokemon_image.replace(/\D/g, ''))
        // console.log(this.state.type1)
    }

    handleChange(e) {
        this.setState({
            nick_name: e.target.value
        })
    }

    cancelName = () => {
        this.props.cancelEditFn()
        // this.setState({
        //     nick_name:''
        // })
        this.setName()
    }
    updateName = () => {
        const { nick_name } = this.state
        axios.put(`/api/pokemon?pokemon_id=${this.props.pokemon.pokemon_id}`, { nick_name }).then(
            this.cancelName()
        )
            .catch(err => console.log(`something went wrong with updating the nick name`))
    }
    updateFavorite = () => {
        const { trainer_id, pokemon_id } = this.props.pokemon
        axios.put(`/api/favorite/pokemon`, { pokemon_id, trainer_id }).then(() => {
            this.props.cancelEditFn()
            this.props.getPokemonFn()
            this.props.getType(this.props.pokemon.pokemon_image.replace(/\D/g, ''))
        }
        )
            .catch(err => console.log(`couldn't delete pokemon`))
    }
    getType = (pokedexID) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokedexID}`).then(res => {
            // console.log(res.data.types.filter(el => el.slot === 1)[0].type.name)
            this.setState({ type1: res.data.types.filter(el => el.slot === 1)[0].type.name })
            // console.log(this.state.type1)
        })
            .catch(err => console.log(`couldn't update type`))
    }
    render() {
        const { pokemon, releaseFn, editID, edit, editFn } = this.props
        return (
            <div className="my-pokemon" >
                <div className="content" >
                    <h4 onClick={() => editFn()}>{pokemon.nick_name}</h4>
                    <img className={`pokemon-image ${pokemon.type_1}`} onClick={() => editFn()} src={pokemon.pokemon_image} alt="" />

                    {edit === true && editID === pokemon.pokemon_id ? (<>
                        <h4>Change {pokemon.nick_name}'s name here</h4>
                        <input type="text" onChange={e => this.handleChange(e)} value={this.state.nick_name} />
                        <div className="button-container">
                            <button onClick={this.updateName} >Confirm</button>
                            <button onClick={this.updateFavorite}>Favorite</button>
                            <button onClick={() => {
                                releaseFn()
                                this.props.getPokemonFn()
                                this.getType()
                            }}>release</button>
                            <button onClick={() => this.cancelName()} >Cancel</button>
                        </div>
                    </>)

                        :

                        (<>
                        </>)}
                </div>

            </div >
        )
    }
}