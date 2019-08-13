const initialState = {
    username: '',
    user_id: 0,
    profile_image: ''
}


const SET_USER = 'SET_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export default (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case SET_USER:
            const {username, profile_image, user_id} = payload
            return {...state, username, profile_image, user_id}
        default: return state
    }
}