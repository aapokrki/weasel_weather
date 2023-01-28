import PropTypes from 'prop-types'
import './Weather.css'
import { Container, Row, Col } from 'react-bootstrap'
import {} from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/free-solid-svg-icons'
import { WEATHERCODES } from '../utils'

const Weather = ({ dateString, temperature, precipitation, weatherCode }) => {
  const date = new Date(dateString)

  const printDay = () => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    return `${day}.${month}`
  }

  //const printDescription = () => {}

  return (
    <Container className='card'>
      <Row>
        <Col>
          <p style={{ margin: '7px' }}>{WEATHERCODES[weatherCode]}</p>
        </Col>
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
  weatherCode: PropTypes.number,
}
export default Weather
