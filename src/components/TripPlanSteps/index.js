import {Component} from 'react'

import './index.css'

const TripPlanSteps = props => {
  const {currentStep} = props
  const stepsList = [
    {stepId: 'YOUR_DETAILS', displayText: 'Your Details'},
    {stepId: 'DATE_SELECTION', displayText: 'Date Selection'},
    {stepId: 'GUESTS', displayText: 'Guests'},
    {stepId: 'TRAVEL_ASSISTANCE', displayText: 'Travel Assistance'},
    {stepId: 'CONFIRMATION', displayText: 'Confirmation'},
  ]
  const planSteps = [
    {
      stepNo: 1,
      stepName: 'Your Details',
    },
    {
      stepNo: 2,
      stepName: 'Date Selection',
    },
    {
      stepNo: 3,
      stepName: 'Guests',
    },
    {
      stepNo: 4,
      stepName: 'Travel Assistance',
    },
    {
      stepNo: 5,
      stepName: 'Confirmation',
    },
  ]
  return (
    <div className="trip-list-con">
      <ul className="trip-details-list">
        {planSteps.map(item =>
          item.stepNo === currentStep ? (
            <div className="trip-ele-con">
              <div className="trip-plan-step-selected">
                <p className="number-selected">{item.stepNo}</p>
              </div>
              <li className="trip-list-ele-selected ">{item.stepName}</li>
            </div>
          ) : item.stepNo < currentStep ? (
            <div className="trip-ele-con">
              <div className="trip-plan-step-completed">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png"
                  alt={item.stepName}
                  className="tick-img"
                />
              </div>
              <li className="trip-list-ele">{item.stepName}</li>
            </div>
          ) : (
            <div className="trip-ele-con">
              <div className="trip-circle-con">
                <p className="number">{item.stepNo}</p>
              </div>
              <li className="trip-list-ele">{item.stepName}</li>
            </div>
          ),
        )}
      </ul>
    </div>
  )
}
export default TripPlanSteps
