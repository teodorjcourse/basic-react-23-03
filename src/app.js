import React, {Component} from 'react'
import ArticleList from './components/article-list'
import Chart from './components/chart'
import UserForm from './components/user-form'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class App extends Component {
    state = {
        selected: null
    }

    render() {
        const { articles } = this.props
        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        return (
            <div className="App">
                <UserForm />
                <Select options = {options} value = {this.state.selected} onChange = {this.handleSelectChange} multi/>
                <Chart articles = {articles} />
                <ArticleList articles = {articles}/>
            </div>
        )
    }

    handleSelectChange = selected => this.setState({ selected })
}

export default App
