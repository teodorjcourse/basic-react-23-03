import React, { Component } from 'react'
import Comment from './comment'
import Expander from './decorators/expander'

class CommentList extends Component {
    render() {
        const { comments, toggleItem, unfoldComments } = this.props
        const commentsCount = comments.length || 0
        const buttonText = commentsCount > 0 ? (unfoldComments ? 'Hide Comments' : 'Show Comments') : 'Comments'

        return (
            <div>
                <button onClick={toggleItem}>{buttonText} | {commentsCount} </button>
                <ul>
                    {unfoldComments ? this.getComments() : '...'}
                </ul>
            </div>
        )
    }

    getComments() {
        const { comments } = this.props

        return comments.map(({id, user, text}) => {
            return (
                <li key={id}>
                    <Comment user={user} text={text}/>
                </li>
            )
        })
    }
}


export default Expander(CommentList)