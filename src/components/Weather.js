import PropTypes from 'prop-types'

const Weather = ({ weatherData }) => {
  console.log(weatherData)
  return (
    <div>
      <h2>{weatherData.current_weather.temperature} °C</h2>
      <h2>{weatherData.current_weather.temperature}</h2>
    </div>
  )
}

Weather.propTypes = {
  weatherData: PropTypes.object,
}
export default Weather
