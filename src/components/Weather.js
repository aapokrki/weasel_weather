import PropTypes from 'prop-types'
import './Weather.css'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
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
    if (temperature > 0) {
      return <FontAwesomeIcon className='icon' icon={faCloud} />
    }

    return <FontAwesomeIcon className='icon' icon={faCloud} />
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
