import './App.css'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import DetailsContext from './context/DetailsContext'

import Login from './components/Login'
import Home from './components/Home'
import BookANewTrip from './components/BookANewTrip'
import Date from './components/Date'
import Guests from './components/Guests'
import Travelassistance from './components/Travelassistance'
import Confirmation from './components/Confirmation'
import Success from './components/Success'
import Mytrips from './components/Mytrips'
import Notfound from './components/Notfound'
import ProtectedRoute from './components/ProtectedRoute'

// Note: Use the lists in your code to pass the test cases
const stepsList = [
  {stepId: 'YOUR_DETAILS', displayText: 'Your Details'},
  {stepId: 'DATE_SELECTION', displayText: 'Date Selection'},
  {stepId: 'GUESTS', displayText: 'Guests'},
  {stepId: 'TRAVEL_ASSISTANCE', displayText: 'Travel Assistance'},
  {stepId: 'CONFIRMATION', displayText: 'Confirmation'},
]

const travelAssistanceList = [
  {value: 'car', displayText: 'Car'},
  {value: 'flight', displayText: 'Flight'},
  {value: 'bus', displayText: 'Bus'},
  {value: 'train', displayText: 'Train'},
]

// Replace your code here
class App extends Component {
  state = {
    myTrips: [],
    data: {},
  }

  // addItem = ({name}, {startLocation}, {endLocation}) => {
  //   console.log(name)
  //   console.log(startLocation)
  //   this.setState({
  //     userName: name,
  //     startLoc: startLocation,
  //     endLoc: endLocation,
  //   })
  // }
  // addDateItem = ({dateInput1, dateInput2}) => {
  //   console.log(dateInput1)
  //   console.log(dateInput2)
  //   this.setState({
  //     startDate: dateInput1,
  //     endDate: dateInput2,
  //   })
  // }
  // addGuestCount = ({adultCount, childrenCount, infantCount}) => {
  //   console.log(adultCount + childrenCount + infantCount)
  //   this.setState(prevState => ({
  //     guestCount:
  //       prevState.guestCount + adultCount + childrenCount + infantCount,
  //     adultTotal: adultCount,
  //     childrenTotal: childrenCount,
  //     infantTotal: infantCount,
  //   }))
  // }
  addTravelAss = ({data}) => {
    this.setState({
      data,
    })
  }

  onclickConfirm = ({data}) => {
    const {myTrips} = this.state
    console.log(myTrips)
    console.log(data)
    data.id = uuidv4()
    const updateList = [...myTrips, data]
    console.log(updateList)
    this.setState({
      myTrips: updateList,
      userName: '',
      startLoc: '',
      endLoc: '',
      startDate: '',
      endDate: '',
      adultTotal: 1,
      childrenTotal: 0,
      infantTotal: 0,
      guestCount: 0,
    })
  }

  deleteTrip = id => {
    console.log(id)
    const {myTrips} = this.state
    const updateList = myTrips.filter(item => item.id !== id)
    this.setState({myTrips: updateList})
  }

  // cancelTrip = () => {
  //   this.setState({
  //     userName: '',
  //     startLoc: '',
  //     endLoc: '',
  //     startDate: '',
  //     endDate: '',
  //     adultTotal: 1,
  //     childrenTotal: 0,
  //     infantTotal: 0,
  //   })
  // }
  render() {
    const {myTrips, data} = this.state
    return (
      <DetailsContext.Provider
        value={{
          myTrips,
          onclickConfirm: this.onclickConfirm,
          data,
          deleteTrip: this.deleteTrip,
          addTravelAss: this.addTravelAss,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/book-a-new-trip"
            component={BookANewTrip}
          />
          <ProtectedRoute exact path="/my-trips" component={Mytrips} />

          <Route exact path="/not-found" component={Notfound} />
          <Redirect to="not-found" />
        </Switch>
      </DetailsContext.Provider>
    )
  }
}
export default App
