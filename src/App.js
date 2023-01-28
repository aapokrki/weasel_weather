import './App.css'
import { ButtonGroup, Container, Col, Row, ToggleButton } from 'react-bootstrap'
import Weatherlist from './components/Weatherlist'
import weatherService from './services/weatherService'
import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'

const locations = [
  {
    'name': 'Tampere',
    'id': '634964',
    'coordinates': {
      'x': 61.5,
      'y': 23.79,
    },
  },
  {
    'name': 'Helsinki',
    'id': '658225',
    'coordinates': {
      'x': 60.17,
      'y': 24.95,
      //'y': null,
    },
  },
  {
    'name': 'Turku',
    'id': '633679',
    'coordinates': {
      'x': 60.17,
      'y': 22.28,
    },
  },
  {
    'name': 'Lahti',
    'id': '643760',
    'coordinates': {
      'x': 60.98,
      'y': 25.66,
    },
  },
]

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

    console.log(updatedLocation)
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
