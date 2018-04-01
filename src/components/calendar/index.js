import React, { Component } from 'react'
import moment from 'moment'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import './style.css'

import { formatDate, parseDate } from 'react-day-picker/moment'


// The code below almost completely taken from с http://react-day-picker.js.org/examples/input-from-to
class Calendar extends Component {
    constructor(props) {
        super(props)

        this.handleFromChange = this.handleFromChange.bind(this)
        this.handleToChange = this.handleToChange.bind(this)

        this.state = {
            from: undefined,
            to: undefined,
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    focusTo() {
        this.timeout = setTimeout(() => this.to.getInput().focus(), 0)
    }

    showFromMonth() {
        const { from, to } = this.state

        if (!from) {
            return
        }

        if (moment(to).diff(moment(from), 'months') < 2) {
            this.to.getDayPicker().showMonth(from)
        }
    }

    handleFromChange(from) {
        this.setState({ from }, () => {
            if (!this.state.to) {
                this.focusTo()
            }
        })
    }
    handleToChange(to) {
        this.setState({ to }, this.showFromMonth)

        this.props.handleDateChange({from: this.state.from, to: to})
    }

    render () {
        const { from, to } = this.state
        const modifiers = { start: from, end: to }
        return (
            <div className="InputFromTo">
                <DayPickerInput
                    value={from}
                    placeholder="From"
                    // format="LL"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    dayPickerProps={{
                        selectedDays: [from, { from, to }],
                        disabledDays: { after: to },
                        toMonth: to,
                        modifiers,
                        numberOfMonths: 2,
                    }}
                    onDayChange={this.handleFromChange}
                />

                {' - '}

                <span className="InputFromTo-to">
                    <DayPickerInput
                        ref={el => (this.to = el)}
                        value={to}
                        placeholder="To"
                        // format="LL"
                        formatDate={formatDate}
                        parseDate={parseDate}
                        dayPickerProps={{
                            selectedDays: [from, { from, to }],
                            disabledDays: { before: from },
                            modifiers,
                            month: from,
                            fromMonth: from,
                            numberOfMonths: 2,
                        }}
                        onDayChange={this.handleToChange}
                    />
                </span>
            </div>

        )
    }
}

export default Calendar