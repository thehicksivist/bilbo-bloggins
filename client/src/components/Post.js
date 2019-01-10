import React from 'react'

const Post = (props) => {
    const { post } = props
    return (
        <li><a href={post.url}>{post.title}</a></li>
    )
}

export default Post