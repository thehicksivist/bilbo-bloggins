import { createStore } from 'redux'

const initialState = {
    posts: [],
    loggedIn: false,
    loginError: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'set_posts':
            return {...state, posts: action.posts}
        default:
            return state
    }
}

export default createStore(reducer, initialState)