import PropTypes from 'prop-types'
import './Weather.css'
import { Container, Row, Col, Collapse } from 'react-bootstrap'
import {} from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/free-solid-svg-icons'
import { WEATHERCODES } from '../utils'
import { useState } from 'react'

const Weather = ({
  dateString,
  temperature,
  precipitation,
  weatherCode,
  tempTimeline,
  precTimeline,
}) => {
  const [open, setOpen] = useState(false)
  const date = new Date(dateString)

  const printDate = () => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    return `${day}.${month}`
  }

  // Print weather timeline of the day with 4 hour intervals
  const printTimeline = () => {
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
      <button
        className='expandtimeline'
        onClick={() => setOpen(!open)}
        aria-controls='example-collapse-text'
        aria-expanded={open}
      >
        ⌄
      </button>
      <Collapse in={open}>
        <Row className='timeline'>{printTimeline()}</Row>
      </Collapse>
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
