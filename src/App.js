import './App.css'
import { ButtonGroup, Container, Col, Row, ToggleButton } from 'react-bootstrap'
import Weatherlist from './components/Weatherlist'
import weatherService from './services/weatherService'
import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { locations } from './utils'

const App = () => {
  const [currentLocation, setCurrentLocation] = useState(locations[0])
  const [weatherData, setWeatherData] = useState(null)
  const [statusMessage, setStatusMessage] = useState('Loading...')
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    weatherService
      .getCurrentWeather(currentLocation.coordinates)
      .then((data) => setWeatherData(data))
      .catch(() => setStatusMessage('Could not load weather data'))
  }, [])

  const handleLocationChange = (event) => {
    const updatedLocation = locations.find(
      (location) => location.id === event.target.value
    )
    setCurrentLocation(updatedLocation)
    setCurrentWeatherData(updatedLocation.coordinates)
  }

  const setCurrentWeatherData = async (location) => {
    try {
      const updatedWeatherData = await weatherService.getCurrentWeather(
        location
      )

      setWeatherData(updatedWeatherData)
    } catch (error) {
      setWeatherData(null)
      setStatusMessage('Could not load weather data')
    }
  }

  return (
    <Container className='root'>
      <Row xs='auto'>
        <Col>
          <Container className='datacontainer buttons'>
            <ButtonGroup vertical>
              {locations.map((location, idx) => (
                <ToggleButton
                  key={location.id}
                  id={`radio-${idx}`}
                  type='radio'
                  variant='primary'
                  name='radio'
                  value={location.id}
                  checked={currentLocation.id === location.id}
                  onChange={handleLocationChange}
                >
                  {location.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Container>
        </Col>
        <Col>
          <Container className='datacontainer weather'>
            <div>
              Current weather / 3 days
              <Form.Switch
                id='showPrediction'
                onChange={() => setShowMore(!showMore)}
              />
            </div>
            <h1>{currentLocation.name}</h1>
            {weatherData != null ? (
              <Weatherlist
                key={currentLocation.id}
                weatherData={weatherData}
                showMore={showMore}
              ></Weatherlist>
            ) : (
              <div>{statusMessage}</div>
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default App
