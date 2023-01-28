import './App.css'
import { ButtonGroup, Container, Button, Col, Row } from 'react-bootstrap'
import Weather from './components/Weather'
import weatherService from './services/weatherService'
import { useState, useEffect } from 'react'
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
    getCurrentWeatherData(updatedLocation.coordinates)
  }

  const getCurrentWeatherData = async (location) => {
    try {
      const updatedWeatherData = await weatherService.getCurrentWeather(
        location
      )
      console.log(updatedWeatherData)
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
              {locations.map((location) => (
                <Button
                  key={location.id}
                  value={location.id}
                  onClick={handleLocationChange}
                >
                  {location.name}
                </Button>
              ))}
            </ButtonGroup>
          </Container>
        </Col>
        <Col>
          <Container className='datacontainer weather'>
            {weatherData != null ? (
              <Weather
                key={currentLocation.id}
                weatherData={weatherData}
              ></Weather>
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
