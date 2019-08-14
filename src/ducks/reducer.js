const initialState = {
    username: '',
    trainer_id: 0,
    profile_pic: ''
}


const SET_USER = 'SET_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
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
        case LOGOUT_USER: 
            return initialState
        default: return state
    }
}