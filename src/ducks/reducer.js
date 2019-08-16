const initialState = {
    username: '',
    trainer_id: 0,
    profile_pic: '',
    pokemon: []
}


const SET_USER = 'SET_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const SET_POKEMON = 'SET_POKEMON'

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export function setPokemon(pokemon) {
    return{
        type: SET_POKEMON,
        payload: pokemon
    }
}

export function logoutUser() {
    return{
        type: LOGOUT_USER
    }
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case SET_USER:
            const {username, profile_pic, trainer_id} = payload
            return {...state, username, profile_pic, trainer_id}
        case SET_POKEMON:
            const {pokemon} = payload
            return {...state, pokemon}
        case LOGOUT_USER: 
            return initialState
        default: return state
    }
}