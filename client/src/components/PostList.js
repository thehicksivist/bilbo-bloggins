import React, { Component } from 'react'
import api from '../api/init'
import Post from './Post'

const postApi = '/posts'

class PostList extends Component {
    // constructor is not required, it is used
    constructor(props) {
        // super is required for overwriting contstructor properties
        super(props) 
        // if its a class component it is common to put all initialisation here
        this.state = {
            posts: []
        }
    }

    componentDidMount(){
        api.get(postApi).then((res) =>{
            this.setState({ posts: res.data })
        }).catch((err) => {
            console.error(`Something went wrong trying to fetch the posts. Error: ${err}`)
        })
    }

    render() {
        return (
            <div>
                <h1>All Posts</h1>
                <ul>
                    {this.state.posts.map(post => {
                        return <Post key={post._id} post={post}/>
                    })}
                </ul>
            </div>
        )
    }

}

export default PostList