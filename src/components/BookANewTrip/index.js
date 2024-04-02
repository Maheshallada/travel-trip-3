import {Component, useContext} from 'react'
import {Link} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {FaExclamationCircle} from 'react-icons/fa'
import DetailsContext from '../../context/DetailsContext'
import TripPlanSteps from '../TripPlanSteps'
import Confirmation from '../Confirmation'

import Header from '../Header'

import './index.css'

const displaySectionConstants = {
  your_details: 'Your Details',
  date_selection: 'Date Selection',
  guests: 'Guests',
  travel_assistance: 'Travel Assistance',
  confirmation: 'Confirmation',
  success: 'Success',
}

const travelAssistanceList = [
  {value: 'car', displayText: 'Car'},
  {value: 'flight', displayText: 'Flight'},
  {value: 'bus', displayText: 'Bus'},
  {value: 'train', displayText: 'Train'},
]

class BookANewTrip extends Component {
  static contextType = DetailsContext

  state = {
    displaySection: displaySectionConstants.your_details,
    name: '',
    startLocation: '',
    endLocation: '',
    isNameCheck: true,
    isStartLoc: true,
    isEndLoc: true,
    dateInput1: '',
    dateInput2: '',
    isdate1Check: true,
    isdate2Check: true,
    isendDateCheck: true,
    isDateOrderValid: true,
    adultCount: 1,
    childrenCount: 0,
    infantCount: 0,
    optionValue: 'Car',
    isCheck: false,
  }

  // componentDidMount() {
  //   const {userName, startLoc, endLoc, addItem} = this.context
  //   this.addItem = addItem
  //   this.setState({
  //     name: userName,
  //     startLocation: startLoc,
  //     endLocation: endLoc,
  //   })
  // }
  onchangeName = event => {
    this.setState(prevState => ({
      name: event.target.value,
      isNameCheck: true,
    }))
  }

  onchangeStartLocation = event => {
    this.setState(prevState => ({
      startLocation: event.target.value,
      isStartLoc: true,
    }))
  }

  onchangEndLocation = event => {
    this.setState(prevState => ({
      endLocation: event.target.value,
      isEndLoc: true,
    }))
  }

  onclickYourDetailsNext = () => {
    const {name, startLocation, endLocation} = this.state
    console.log(name)
    console.log(startLocation)
    this.setState({
      displaySection: 'Date Selection',
      name,
      startLocation,
      endLocation,
    })
  }

  renderYourDetailsView = () => {
    const {
      name,
      startLocation,
      endLocation,
      isNameCheck,
      isStartLoc,
      isEndLoc,
    } = this.state

    const errorMsg = 'Enter your name'
    const errorMsg1 = 'Enter your start location'
    const errorMsg2 = 'Enter your end location'

    return (
      <div className="user-deta-con">
        <Header />
        <div className="user-main-con">
          <TripPlanSteps currentStep={1} />
          <form className="user-form-con">
            <div className="user-details-con">
              <h1 className="user-heading">Your Details</h1>
              <p className="user-para">Enter your name and location details</p>
            </div>
            <div className="user-search-con">
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="name" className="user-label-ele">
                  Name
                </label>
                <br />
                <div
                  className={
                    this.state.isNameCheck
                      ? 'input-parent'
                      : 'input-parent-error'
                  }
                >
                  <input
                    type="text"
                    placeholder="Enter Name"
                    onChange={this.onchangeName}
                    value={name}
                    id="name"
                    onFocus={() => {
                      if (this.state.name === '') {
                        this.setState({isNameCheck: false})
                      }
                    }}
                    className={
                      this.state.isNameCheck
                        ? 'user-details-input'
                        : 'user-details-input-error'
                    }
                  />
                  {!isNameCheck && <FaExclamationCircle className="icon" />}
                </div>
                {!this.state.isNameCheck && <p>{errorMsg}</p>}

                <label htmlFor="startLocation" className="user-label-ele">
                  Start Location
                </label>
                <br />
                <div
                  className={
                    this.state.isStartLoc
                      ? 'input-parent'
                      : 'input-parent-error'
                  }
                >
                  <input
                    type="text"
                    placeholder="Enter Start Location"
                    value={startLocation}
                    id="startLocation"
                    onChange={this.onchangeStartLocation}
                    onFocus={() => {
                      if (this.state.startLocation === '') {
                        this.setState({isStartLoc: false})
                      }
                    }}
                    className={
                      this.state.isStartLoc
                        ? 'user-details-input'
                        : 'user-details-input-error'
                    }
                  />
                  {!isStartLoc && <FaExclamationCircle className="icon" />}
                </div>
                {!this.state.isStartLoc && <p>{errorMsg1}</p>}
                <label htmlFor="endLocation" className="user-label-ele">
                  End Location
                </label>
                <br />
                <div
                  className={
                    this.state.isEndLoc ? 'input-parent' : 'input-parent-error'
                  }
                >
                  <input
                    type="text"
                    placeholder="Enter End Location"
                    value={endLocation}
                    id="endLocation"
                    onChange={this.onchangEndLocation}
                    onFocus={() => {
                      if (this.state.endLocation === '') {
                        this.setState({isEndLoc: false})
                      }
                    }}
                    className={
                      this.state.isEndLoc
                        ? 'user-details-input'
                        : 'user-details-input-error'
                    }
                  />
                  {!isEndLoc && <FaExclamationCircle className="icon" />}
                </div>
                {!this.state.isEndLoc && <p>{errorMsg2}</p>}

                {name.length > 0 &&
                startLocation.length > 0 &&
                endLocation.length > 0 ? (
                  <button
                    type="button"
                    onClick={this.onclickYourDetailsNext}
                    className="user-button"
                  >
                    Next
                  </button>
                ) : (
                  <button className="user-button">Next</button>
                )}
              </form>
            </div>
          </form>
        </div>
      </div>
    )
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
      this.setState({displaySection: 'Guests'})
    }
  }

  onclickDatePrevious = () => {
    const {name, startLocation} = this.state
    console.log(name)
    console.log(startLocation)
    this.setState({displaySection: 'Your Details'})
  }

  onclickEmptyDateNext = () => {
    const {dateInput1, dateInput2} = this.state
    if (dateInput1.length < 1 && dateInput2.length < 1) {
      this.setState({isdate1Check: false, isdate2Check: false})
    }
    if (dateInput1.length < 1 && dateInput2.length > 1) {
      this.setState({isdate1Check: false})
    }
    if (dateInput2.length < 1 && dateInput1.length > 1) {
      this.setState({isdate2Check: false})
    }
  }

  renderDateSelectionView = () => {
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
                    id="startDate"
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
                  <button
                    type="button"
                    className="date-button1"
                    onClick={this.onclickDatePrevious}
                  >
                    Previous
                  </button>

                  {dateInput1.length > 0 && dateInput2.length > 0 ? (
                    <button
                      type="button"
                      className="date-button2"
                      onClick={this.handleClickNext}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="date-button2"
                      onClick={this.onclickEmptyDateNext}
                    >
                      Next
                    </button>
                  )}
                </div>
              </form>
            </div>
          </form>
        </div>
      </div>
    )
  }

  onclickGuestPrevious = () => {
    this.setState({displaySection: 'Date Selection'})
  }

  onclickGuestNext = () => {
    this.setState(prevState => ({
      displaySection: 'Travel Assistance',
      isCheck: prevState.isCheck,
    }))
  }

  onclickAdultDec = () => {
    if (this.state.adultCount > 1) {
      this.setState(prevState => ({adultCount: prevState.adultCount - 1}))
    }
  }

  onclickAdultInc = () => {
    this.setState(prevState => ({adultCount: prevState.adultCount + 1}))
  }

  onclickChildrenDec = () => {
    if (this.state.childrenCount > 0) {
      this.setState(prevState => ({childrenCount: prevState.childrenCount - 1}))
    }
  }

  onclickChildrenInc = () => {
    this.setState(prevState => ({childrenCount: prevState.childrenCount + 1}))
  }

  onclickInfantDec = () => {
    if (this.state.infantCount > 0) {
      this.setState(prevState => ({infantCount: prevState.infantCount - 1}))
    }
  }

  onclickInfantInc = () => {
    this.setState(prevState => ({infantCount: prevState.infantCount + 1}))
  }

  renderGuestView = () => {
    const {adultCount, childrenCount, infantCount} = this.state
    return (
      <div className="guest-con">
        <Header />
        <div className="guest-main-con">
          <TripPlanSteps currentStep={3} />

          <form className="guest-form-con">
            <div className="guest-details-con">
              <h1 className="guest-heading">Guests</h1>
              <p className="guest-para">Select your guests</p>
            </div>
            <div className="guest-search-con">
              <div className="guest-form" onSubmit={this.submitForm}>
                <div className="guest-name-con">
                  <div>
                    <p className="heading1">Adults</p>
                    <p className="guest-para1">Age 13 or above</p>
                  </div>
                  <div className="button-con">
                    <button
                      type="button"
                      className="button1"
                      onClick={this.onclickAdultDec}
                    >
                      -
                    </button>
                    <p className="one-number">{adultCount}</p>
                    <button
                      type="button"
                      className="button1"
                      onClick={this.onclickAdultInc}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <hr width="355px;" color="#cbd5e1" />
              <div className="guest-form" onSubmit={this.submitForm}>
                <div className="guest-name-con">
                  <div>
                    <p className="heading1">Children</p>
                    <p className="guest-para1">Age 2-12</p>
                  </div>
                  <div className="button-con">
                    <button
                      type="button"
                      className="button1"
                      onClick={this.onclickChildrenDec}
                    >
                      -
                    </button>
                    <p className="one-number">{childrenCount}</p>
                    <button
                      type="button"
                      className="button1"
                      onClick={this.onclickChildrenInc}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <hr width="355px;" color="#cbd5e1" />
                  <div className="guest-form" onSubmit={this.submitForm}>
                    <div className="guest-name-con">
                      <div>
                        <p className="heading1">Infants</p>
                        <p className="guest-para1">Under 2</p>
                      </div>
                      <div className="button-con">
                        <button
                          type="button"
                          className="button1"
                          onClick={this.onclickInfantDec}
                        >
                          -
                        </button>
                        <p className="one-number">{infantCount}</p>
                        <button
                          type="button"
                          className="button1"
                          onClick={this.onclickInfantInc}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="guest-button-con">
                    <button
                      type="button"
                      className="guest-button1"
                      onClick={this.onclickGuestPrevious}
                    >
                      Previous
                    </button>

                    <button
                      type="button"
                      className="guest-button2"
                      onClick={this.onclickGuestNext}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

  onclickTravelAssisPrevious = () => {
    this.setState(prevState => ({
      displaySection: 'Guests',
      isCheck: prevState.isCheck,
    }))
  }

  onclickTravelAssisNext = () => {
    this.setState({displaySection: 'Confirmation'})
  }

  onchangeOption = event => {
    this.setState({optionValue: event.target.value})
  }

  onchangeCheckBox = () => {
    this.setState(prevState => ({isCheck: !prevState.isCheck}))
  }

  displayButton = () => (
    <div className="travel-button-con">
      <button
        type="button"
        className="travel-button1"
        onClick={this.onclickTravelAssisPrevious}
      >
        Previous
      </button>

      <button
        type="button"
        className="travel-button2"
        onClick={this.onclickTravelAssisNext}
      >
        Next
      </button>
    </div>
  )

  displayForm = () => {
    const {optionValue} = this.state

    return (
      <>
        <label className="travel-select-label">Travel Assistance</label>
        <select
          onChange={this.onchangeOption}
          className="travel-select-con"
          value={this.state.optionValue}
        >
          {travelAssistanceList.map(item => (
            <option className="option-ele" value={item.displayText}>
              {item.displayText}
            </option>
          ))}
        </select>
        <div className="travel-button-con">
          <button
            type="button"
            className="travel-button1"
            onClick={this.onclickTravelAssisPrevious}
          >
            Previous
          </button>

          <button
            type="button"
            className="travel-button2"
            onClick={this.onclickTravelAssisNext}
          >
            Next
          </button>
        </div>
      </>
    )
  }

  renderTravelAssistanceView = () => {
    const {isCheck} = this.state
    return (
      <div className="travel-con">
        <Header />
        <div className="travel-main-con">
          <TripPlanSteps currentStep={4} />
          <form
            className="travel-form-con"
            onSubmit={this.onclickTravelAssisNext}
          >
            <div className="travel-details-con">
              <h1 className="travel-heading">Travel Assistance</h1>
              <p className="travel-para">Select Your Travel Assistance</p>
            </div>
            <div className="travel-search-con">
              <div className="travel-checkbox">
                <input
                  id="Travel Assistance"
                  type="checkbox"
                  onChange={this.onchangeCheckBox}
                />
                <label
                  className="travel-checkbox-label"
                  htmlFor="Travel Assistance"
                >
                  Travel Assistance Needed
                </label>
              </div>
              {isCheck ? this.displayForm() : this.displayButton()}
            </div>
          </form>
        </div>
      </div>
    )
  }

  onclickCancel = () => {
    this.setState({
      displaySection: displaySectionConstants.your_details,
      name: '',
      startLocation: '',
      endLocation: '',
      isNameCheck: true,
      isStartLoc: true,
      isEndLoc: true,
      dateInput1: '',
      dateInput2: '',
      isdate1Check: true,
      isdate2Check: true,
      isendDateCheck: true,
      isDateOrderValid: true,
      adultCount: 1,
      childrenCount: 0,
      infantCount: 0,
      optionValue: 'Car',
      isCheck: false,
    })
  }

  onclickConfirmationButton = () => {
    const {
      name,
      startLocation,
      endLocation,
      dateInput1,
      dateInput2,
      adultCount,
      childrenCount,
      infantCount,
      optionValue,
    } = this.state

    const {onclickConfirm} = this.context

    const data = {
      userName: name,
      startLoc: startLocation,
      endLoc: endLocation,
      startDate: dateInput1,
      endDate: dateInput2,
      guestCount: adultCount + childrenCount + infantCount,
      travelAss: optionValue,
    }
    this.onclickConfirm = onclickConfirm
    this.onclickConfirm({data})

    this.setState({
      displaySection: 'Success',
      name: '',
      startLocation: '',
      endLocation: '',
      isNameCheck: true,
      isStartLoc: true,
      isEndLoc: true,
      dateInput1: '',
      dateInput2: '',
      isdate1Check: true,
      isdate2Check: true,
      isendDateCheck: true,
      isDateOrderValid: true,
      adultCount: 1,
      childrenCount: 0,
      infantCount: 0,
      optionValue: 'Car',
      isCheck: false,
    })
  }

  renderConfirmationView = () => {
    const {
      name,
      startLocation,
      endLocation,
      dateInput1,
      dateInput2,
      adultCount,
      childrenCount,
      infantCount,
      optionValue,
    } = this.state

    return (
      <form className="confirm-con">
        <Header />
        <div className="confirm-main-con">
          <TripPlanSteps currentStep={5} />

          <form className="confirm-form-con">
            <h1 className="confirm-heading">Confirmation</h1>
            <p className="confirm-para">Confirm your details</p>

            <div className="confirm-search-con">
              <div className="confirm-details-list">
                <div className="confirm-details-output">
                  <p className="confirm-details-head ">Name: </p>
                </div>
                <p className="confirm-details-final">{name}</p>
              </div>
              <div className="confirm-details-list">
                <div className="confirm-details-output">
                  <h1 className="confirm-details-head">Start Location: </h1>
                </div>
                <h1 className="confirm-details-final">{startLocation}</h1>
              </div>
              <div className="confirm-details-list">
                <div className="confirm-details-output">
                  <h1 className="confirm-details-head">End Location: </h1>
                </div>
                <h1 className="confirm-details-final">{endLocation}</h1>
              </div>
              <div className="confirm-details-list">
                <div className="confirm-details-output">
                  <h1 className="confirm-details-head">Start Date: </h1>
                </div>
                <h1 className="confirm-details-final">{dateInput1}</h1>
              </div>
              <div className="confirm-details-list">
                <div className="confirm-details-output">
                  <h1 className="confirm-details-head"> End Date: </h1>
                </div>
                <h1 className="confirm-details-final">{dateInput2}</h1>
              </div>
              <div className="confirm-details-list">
                <div className="confirm-details-output">
                  <h1 className="confirm-details-head"> Guests: </h1>
                </div>
                <h1 className="confirm-details-final">
                  {adultCount + childrenCount + infantCount}
                </h1>
              </div>
              <div className="confirm-details-list">
                <div className="confirm-details-output">
                  <h1 className="confirm-details-head">Travel Assistance:</h1>
                </div>
                <h1 className="confirm-details-final">{optionValue}</h1>
              </div>
              <div className="confirm-button-con">
                <button
                  className="confirm-button1"
                  onClick={this.onclickCancel}
                  type="button"
                >
                  Cancel
                </button>

                <button
                  className="confirm-button2"
                  onClick={this.onclickConfirmationButton}
                  type="button"
                >
                  Confirm
                </button>
              </div>
            </div>
          </form>
        </div>
      </form>
    )
  }

  onclickNewTrip = () => {
    this.setState({displaySection: 'Your Details'})
  }

  renderSuccessView = () => (
    <div className="success-con">
      <Header />
      <div className="success-form-con">
        <TripPlanSteps currentStep={6} />
        <div className="success-greeting-background">
          <div className="greeting-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png"
              className="tick-image"
            />
            <h1 className="heading-success">Awesome!</h1>
            <p className="para-success">Your booking has been confirmed.</p>

            <button
              className="button-ele"
              onClick={this.onclickNewTrip}
              type="button"
            >
              Book a new trip
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  render() {
    const {displaySection} = this.state
    switch (displaySection) {
      case displaySectionConstants.your_details:
        return this.renderYourDetailsView()
      case displaySectionConstants.date_selection:
        return this.renderDateSelectionView()
      case displaySectionConstants.guests:
        return this.renderGuestView()
      case displaySectionConstants.travel_assistance:
        return this.renderTravelAssistanceView()
      case displaySectionConstants.confirmation:
        return this.renderConfirmationView()
      case displaySectionConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
    // return <>{this.displayView()}</>
  }
}
export default BookANewTrip
