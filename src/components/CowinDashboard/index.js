import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusContants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    last7DaysVaccination: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
    apiStatus: apiStatusContants.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiStatus: apiStatusContants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      const {
        last7DaysVaccination,
        vaccinationByAge,
        vaccinationByGender,
      } = updatedData
      const updatedLast7DaysVaccination = last7DaysVaccination.map(each => ({
        dose1: each.dose_1,
        dose2: each.dose_2,
        vaccineDate: each.vaccine_date,
      }))
      this.setState({
        vaccinationByAge,
        vaccinationByGender,
        last7DaysVaccination: updatedLast7DaysVaccination,
        apiStatus: apiStatusContants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-view-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderInProgressView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {
      last7DaysVaccination,
      vaccinationByGender,
      vaccinationByAge,
    } = this.state
    return (
      <>
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderFinalResultView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContants.inProgress:
        return this.renderInProgressView()
      case apiStatusContants.failure:
        return this.renderFailureView()
      case apiStatusContants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="container">
        <div className="top-container">
          <div className="logo-contain">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              className="website-logo"
              alt="website logo"
            />
            <h1 className="logo-heading">Co-WIN</h1>
          </div>
          <h1 className="heading">CoWIN Vaccination In India</h1>
        </div>
        {this.renderFinalResultView()}
      </div>
    )
  }
}

export default CowinDashboard
