import React, { PureComponent } from 'react'

class Comment extends PureComponent {
    render() {
        const { user, text } = this.props

        return (
            <div>
                <h2>{user}</h2>
                <section>{text}</section>
            </div>
        )
    }
}

export default Comment
