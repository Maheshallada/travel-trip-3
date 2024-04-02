import {Component} from 'react'
import {Link} from 'react-router-dom'
import DetailsContext from '../../context/DetailsContext'
import TripPlanSteps from '../TripPlanSteps'
import Header from '../Header'

import './index.css'

class Date extends Component {
  static contextType = DetailsContext

  state = {
    dateInput1: '',
    dateInput2: '',
    isdate1Check: true,
    isdate2Check: true,
    isendDateCheck: true,
    isDateOrderValid: true,
  }

  componentDidMount() {
    const {startDate, endDate, addDateItem} = this.context
    this.addDateItem = addDateItem
    this.setState({
      dateInput1: startDate,
      dateInput2: endDate,
    })
  }

  onChangeDateInput1 = event => {
    this.setState({dateInput1: event.target.value, isdate1Check: true})
  }

  onChangeDateInput2 = event => {
    this.setState({dateInput2: event.target.value, isdate2Check: true})
  }

  validateDates = () => {
    const {dateInput1, dateInput2} = this.state
    if (dateInput1 > dateInput2) {
      this.setState({isDateOrderValid: false})
      return false
    }
    return true
  }

  handleClickNext = () => {
    if (this.validateDates()) {
      const {dateInput1, dateInput2} = this.state
      this.addDateItem({dateInput1, dateInput2})
      this.props.history.push('/guests')
    }
  }

  displayView = () => {
    const {dateInput1, dateInput2, isDateOrderValid} = this.state
    const errorMsg = 'Select Start Date'
    const errorMsg1 = 'Select End Date'
    const dateErrorMsg = 'The end date cannot be less than the start date'

    return (
      <div className="date-con">
        <Header />
        <div className="date-main-con">
          <TripPlanSteps currentStep={2} />

          <form className="date-form-con">
            <div className="date-details-con">
              <h1 className="date-heading">Date Selection</h1>
              <p className="date-para">Select your Start and End date</p>
            </div>
            <div className="date-search-con">
              <form>
                <label htmlFor="startDate" className="date-label-ele">
                  Start Date
                </label>
                <br />
                <div>
                  <input
                    type="date"
                    value={dateInput1}
                    onChange={this.onChangeDateInput1}
                    id="startdate"
                    placeholder="dd/mm/yyyy"
                    onFocus={() => {
                      if (this.state.dateInput1 === '') {
                        this.setState({isdate1Check: false})
                      }
                    }}
                    className={
                      this.state.isdate1Check
                        ? 'date-details-input'
                        : 'date-details-input-error'
                    }
                  />
                </div>
                {!this.state.isdate1Check && <p>{errorMsg}</p>}

                <label htmlFor="endDate" className="date-label-ele">
                  End Date
                </label>
                <br />
                <input
                  type="date"
                  value={dateInput2}
                  id="endDate"
                  onChange={this.onChangeDateInput2}
                  placeholder="dd/mm/yyyy"
                  onFocus={() => {
                    if (this.state.dateInput2 === '') {
                      this.setState({isdate2Check: false})
                    }
                  }}
                  className={
                    this.state.isdate2Check
                      ? 'date-details-input'
                      : 'date-details-input-error'
                  }
                />
                {!this.state.isdate2Check && <p>{errorMsg1}</p>}
                {!isDateOrderValid && <p>{dateErrorMsg}</p>}
                <div className="date-button-con">
                  <Link to="/userdetails">
                    <button type="submit" className="date-button1">
                      Previous
                    </button>
                  </Link>
                  {dateInput1.length > 0 && dateInput2.length > 0 ? (
                    <button
                      type="button"
                      className="date-button2"
                      onClick={this.handleClickNext}
                    >
                      Next
                    </button>
                  ) : (
                    <button className="date-button2">Next</button>
                  )}
                </div>
              </form>
            </div>
          </form>
        </div>
      </div>
    )
  }

  render() {
    return <>{this.displayView()}</>
  }
}
export default Date
