import React, { Component } from 'react'
import axios from 'axios'

export default class Pokemon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editName: false
        }
    }
    componentDidMount() {
    }
    // releasePokemon(pokemon_id) {
    //     axios.delete(`/api/pokemon?trainer_id=${this.props.trainer_id}&pokemon_id=${pokemon_id}`).then(res => {
    //         this.getPokemon()
    //         this.getProfilePic()
    //     })
    //     .catch(err => {
    //         alert(`you can't delete your favorite pokemon!`)
    //         console.log(`couldn't delete`)
    //     })

    // }
    render() {
        const {pokemon, releaseFn, editID, edit, editFn} = this.props
        return (
            <div onClick={() => editFn()} className="my-pokemon" >
                {/* <h1>pokemon</h1> */}
                {edit === true && editID === pokemon.pokemon_id ? (<><h1>
                    ey
                </h1></>)
                
                :
                
                (<><h4>{pokemon.nick_name}</h4>
                <img  src={pokemon.pokemon_image} alt="" />
                <button onClick={() => releaseFn()}>release</button></>)}
            </div >
        )
    }
}