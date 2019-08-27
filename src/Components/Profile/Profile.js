import React, { Component } from 'react'
import axios from 'axios'
import { setUser } from '../../ducks/reducer'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout'

class Profile extends Component {
    state = {
        myPokemon: [],
        allPokemon: [],
        profilePic: [],
        myFavorite: [],
        myFavoriteID: 0,
        amount: 0
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
    onToken = (token) => {
        // console.log(token)
        let { amount } = this.state
        amount /= 100
        console.log(amount)
        token.card = void 0
        axios.post('/api/payment', { token, amount: this.state.amount }).then(res => {
            console.log(res)
            alert(`Congratulations you paid me $${amount}!`)
        })
    }
    render() {
        const pokemonMap = this.state.myPokemon.map((el, i) => (
            <div className={`pokemon-container `} key={i}>
                <p>{el.nick_name}</p>
                <img className={`pokemon-image ${el.type_1}`} src={el.pokemon_image} alt="" />
            </div>
        ))
        const favoriteMap = this.state.myFavorite.map((el, i) => (
            <div className={`pokemon-container`} key={i}>
                <h4 className="pokemon-name">{el.nick_name}</h4>
                <img className={`pokemon-image favorite-image ${el.type_1}`} src={el.pokemon_image} alt="" />
            </div>
        ))
        return (
            <div className="Profile">
                <p className="trainer-tip">Click on Poké to view posts from other users</p>
                {this.props.match.params.username === 'david' ?
                    (
                        <div className="stripe" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
                            <h1 className="donate-here">Donate to the developer here!</h1>
                            <div className="donation-input-container">
                                <h1 className="dollar">$</h1>
                                <input value={this.state.amount / 100} className="donation-input"
                                    type='number'
                                    onChange={e => this.setState({ amount: e.target.value * 100 })} /></div>

                            <StripeCheckout
                                name='Donate here' //header
                                image={this.props.profile_pic}
                                description='Thanks for using my app!' //subtitle - beneath header
                                stripeKey={process.env.REACT_APP_STRIPE_KEY} //public key not secret key
                                token={this.onToken} //fires the call back
                                amount={this.state.amount} //this will be in cents
                                currency="USD"
                                // image={imageUrl} // the pop-in header image (default none)
                                // ComponentClass="div" //initial default button styling on block scope (defaults to span)
                                panelLabel="Donate" //text on the submit button
                                locale="en" //locale or language (e.g. en=english, fr=french, zh=chinese)
                                // allowRememberMe={false} // "Remember Me" option (default true)
                                // billingAddress={false}
                                // shippingAddress //you can collect their address
                                // zipCode={false}
                            >
                                {/* <button>Checkout</button> */}
                            </StripeCheckout>

                        </div>
                    )
                    : null}
                {this.props.username === this.props.match.params.username ?
                    (<Link className="my-profile-link" to={`/my-profile/${this.props.username}`}>
                        <button className="edit-button">edit profile</button>
                    </Link>) : null}
                <h1 className='username'>{this.props.match.params.username}</h1>
                {this.state.profilePic.map((el, i) => (
                    <div className="profile-pic-container" key={i}>
                        <img className="profile-pic" src={el.profile_pic} alt="" />
                    </div>
                ))}
                <h1 className="my-pokemon" >My Pokémon!</h1>
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
    const { username, profile_pic } = reduxState
    return { username, profile_pic }
}

export default connect(mapStateToProps, { setUser })(withRouter(Profile))