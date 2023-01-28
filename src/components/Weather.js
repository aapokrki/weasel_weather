import PropTypes from 'prop-types'
import './Weather.css'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faTemperatureEmpty,
  faTemperatureHalf,
  faTemperatureHigh,
  faTemperatureQuarter,
  faTemperatureThreeQuarters,
} from '@fortawesome/free-solid-svg-icons'
const Weather = ({ dateString, temperature, precipitation }) => {
  const date = new Date(dateString)

  const printDay = () => {
    const day = date.getDate()

    // Check if day ends with 1 2 or 3
    if (day % 10 === 1 && day !== 11) {
      return `${day}st`
    }
    if (day % 10 === 2 && day !== 12) {
      return `${day}nd`
    }
    if (day % 10 === 3 && day !== 13) {
      return `${day}rd`
    }
    return `${day}th`
  }

  const printIcon = () => {
    if (precipitation > 5) {
      return (
        <FontAwesomeIcon icon={faCloudShowersHeavy} className='weather-icon' />
      )
    }
    if (precipitation >= 0.5) {
      if (temperature > 0) {
        return <FontAwesomeIcon icon={faCloudRain} className='weather-icon' />
      }
      if (temperature < 0) {
        return <FontAwesomeIcon icon={faSnowflake} className='weather-icon' />
      }
    }

    if (precipitation < 0.5) {
      if (temperature > 20) {
        return (
          <FontAwesomeIcon icon={faTemperatureHigh} className='weather-icon' />
        )
      }
      if (temperature > 10) {
        return (
          <FontAwesomeIcon
            icon={faTemperatureThreeQuarters}
            className='weather-icon'
          />
        )
      }
      if (temperature > 1) {
        return (
          <FontAwesomeIcon icon={faTemperatureHalf} className='weather-icon' />
        )
      }
      if (temperature > -5) {
        return (
          <FontAwesomeIcon
            icon={faTemperatureQuarter}
            className='weather-icon'
          />
        )
      }
      if (temperature > -20) {
        return (
          <FontAwesomeIcon icon={faTemperatureEmpty} className='weather-icon' />
        )
      }

      return <FontAwesomeIcon icon={faSnowflake} className='weather-icon' />
    }
  }

  return (
    <Container className='card'>
      <Row>
        <Col>{printIcon()}</Col>
        <Col>
          <p className='data'>{printDay()}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <b className='label'>Temperature</b>
        </Col>
        <Col>
          <b className='data'>{temperature}°C</b>
        </Col>
      </Row>
      <Row>
        <Col>
          <b className='label'>Precipitation</b>
        </Col>
        <Col>
          <b className='data'> {precipitation}mm</b>
        </Col>
      </Row>
    </Container>
  )
}
Weather.propTypes = {
  temperature: PropTypes.number,
  dateString: PropTypes.string,
  precipitation: PropTypes.number,
}
export default Weather
