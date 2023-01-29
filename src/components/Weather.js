import PropTypes from 'prop-types'
import './Weather.css'
import { Container, Row, Col } from 'react-bootstrap'
import {} from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/free-solid-svg-icons'
import { WEATHERCODES } from '../utils'

const Weather = ({
  dateString,
  temperature,
  precipitation,
  weatherCode,
  tempTimeline,
  precTimeline,
}) => {
  const date = new Date(dateString)

  const printDate = () => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    return `${day}.${month}`
  }

  const printTimeline = () => {
    console.log(tempTimeline)
    return tempTimeline.map((temp, hour) => {
      if (hour % 4 === 0) {
        return (
          <Col className='timelinedata' key={hour}>
            <div>
              {Math.round(
                (tempTimeline.slice(hour, hour + 4).reduce((a, b) => a + b, 0) /
                  4) *
                  10
              ) / 10}
              °C
            </div>
            <div>
              {Math.round(
                precTimeline.slice(hour, hour + 4).reduce((a, b) => a + b, 0) *
                  10
              ) / 10}
              mm
            </div>
            <p>
              {hour}-{hour + 4}
            </p>
          </Col>
        )
      }
    })
  }

  return (
    <Container className='card'>
      <Row>
        <Col>
          <h2 className='weathercode'>{WEATHERCODES[weatherCode]}</h2>
        </Col>
        <Col>
          <p className='data'>{printDate()}</p>
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
      <Row className='timeline'>{printTimeline()}</Row>
    </Container>
  )
}
Weather.propTypes = {
  temperature: PropTypes.number,
  dateString: PropTypes.string,
  precipitation: PropTypes.number,
  weatherCode: PropTypes.number,
  tempTimeline: PropTypes.array,
  precTimeline: PropTypes.array,
}
export default Weather
