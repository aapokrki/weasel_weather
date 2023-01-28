import PropTypes from 'prop-types'

const Weather = ({ weatherData }) => {
  return (
    <div>
      <div>{weatherData.latitude}</div>
    </div>
  )
}

Weather.propTypes = {
  weatherData: PropTypes.object,
}
export default Weather
