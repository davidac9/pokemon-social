import React, { Component } from 'react'
import axios from 'axios'

export default class Pokemon extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editName: false,
            nick_name: ''
        }
    }
    setName = () => {
        this.setState({
            nick_name: this.props.pokemon.nick_name
        })
    }

    componentDidMount() {
        this.setName()
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
        const {nick_name} = this.state
        axios.put(`/api/pokemon?pokemon_id=${this.props.pokemon.pokemon_id}`, {nick_name}).then(
            this.props.cancelEditFn()
        )
        .catch(err => console.log(`it fail`))
    }
    render() {
        const { pokemon, releaseFn, editID, edit, editFn } = this.props
        return (
            <div className="my-pokemon" >
                {edit === true && editID === pokemon.pokemon_id ? (<>
                    <input type="text" onChange={e => this.handleChange(e)} value={this.state.nick_name}/>
                    <button onClick={this.updateName} >Confirm</button>
                    {/* <h4>{pokemon.nick_name}</h4> */}
                    <img src={pokemon.pokemon_image} alt="" />
                    <button onClick={() => releaseFn()}>release</button>
                    <button onClick={() => this.cancelName()} >Cancel</button>
                </>)

                    :

                    (<>
                        <div onClick={() => editFn()} >
                            <h4>{pokemon.nick_name}</h4>
                            <img src={pokemon.pokemon_image} alt="" />
                        </div>
                    </>)}

            </div >
        )
    }
}