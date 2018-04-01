import React, { PureComponent } from 'react'
import Comments from './comments'

class Article extends PureComponent {
    render() {
        const { article, isOpen, toggleOpen } = this.props
        console.log('---', 'rendering article')
        return (
            <div>
                <h2>{article.title}</h2>
                <button onClick = {() => toggleOpen(article.id)}>{isOpen ? 'close' : 'open'}</button>
                {this.getBody()}
            </div>
        )
    }

    getBody() {
        const { article, isOpen } = this.props
        if (!isOpen) return null

        return (
            <div>
                <section>
                    {article.text}
                </section>
                <Comments comments = { article.comments || [] } />
            </div>
        )
    }
}

export default Article