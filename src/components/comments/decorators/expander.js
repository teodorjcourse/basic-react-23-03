import React from 'react'

export default ComponentToBeDecorated => class DecoratedComponent extends React.Component {
    state = {
        unfoldComments: this.props.unfoldComments||false
    }

    handleButtonClick = ev => this.setState({
        unfoldComments: !this.state.unfoldComments
    })

    render() {
        return <ComponentToBeDecorated {...this.props}
                                  unfoldComments = {this.state.unfoldComments}
                                  toggleItem = {this.handleButtonClick}
        />
    }
}