export function setPostsAction(posts) {
    return {
        type: 'set_posts',
        posts
        // the above 'posts' means the same as 'posts: posts' in ES5
        // the same for each other function below
    }
}

export function setLoggedInAction(loggedIn) {
    return {
        type: 'set_loggedIn',
        loggedIn
    }
}

export function setLoginErrorAction(loginError) {
    return {
        type: 'set_loginError',
        loginError
    }
}