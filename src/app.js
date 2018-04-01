import React, {Component} from 'react'
import ArticleList from './components/article-list'
import Chart from './components/chart'
import UserForm from './components/user-form'
import Select from 'react-select'
import Calendar from './components/calendar'
import 'react-select/dist/react-select.css'

class App extends Component {
    state = {
        selected: null,
        selectedDateFrom: undefined,
        selectedDateTo: undefined
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
                <div>Date range: {this.getDateRangeText()}</div>
                <Calendar handleDateChange = {this.handleDateChange}/>
                <Chart articles = {articles} />
                <ArticleList articles = {articles}/>
            </div>
        )
    }

    handleSelectChange = selected => this.setState({ selected })

    handleDateChange = ({ from, to }) => {
        this.setState({
            selectedDateFrom: from,
            selectedDateTo: to
        })
    }

    getDateRangeText() {
        let resString = ''

        resString += ( this.getDateRangeFrom() || 'from')
        resString += ' - '
        resString += ( this.getDateRangeTo() || 'to')

        return resString
    }

    getDateRangeFrom() {
        return this.state.selectedDateFrom !== undefined ? this.state.selectedDateFrom.toLocaleDateString() : undefined
    }

    getDateRangeTo() {
        return this.state.selectedDateTo !== undefined ? this.state.selectedDateTo.toLocaleDateString() : undefined
    }
}

export default App
