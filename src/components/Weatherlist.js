import PropTypes from 'prop-types'
//import { useState } from 'react'
import Weather from './Weather'

const Weatherlist = ({ weatherData, showMore }) => {
  //const [showMore, setShowMore] = useState(false)
  const days = [1, 2, 3]
  console.log(weatherData)

  // Get average temperature of a specific day from now
  const getFutureWeather = (dayFromNow) => {
    const indexGap = [dayFromNow * 24, (dayFromNow + 1) * 24]
    console.log(indexGap[1] - indexGap[0])
    const hourlyWeather = weatherData.hourly.temperature_2m.slice(
      indexGap[0],
      indexGap[1]
    )
    const weatherAverage =
      Math.round(
        (hourlyWeather.reduce((a, b) => a + b, 0) / hourlyWeather.length) * 10
      ) / 10

    // Round weatherAverage to 1 decimal
    return weatherAverage
  }

  return (
    <div>
      <Weather
        key={weatherData.daily.time[0]}
        dateString={weatherData.daily.time[0]}
        temperature={weatherData.current_weather.temperature}
        precipitation={weatherData.daily.precipitation_sum[0]}
      />
      {showMore ? (
        days.map((day) => (
          <Weather
            key={weatherData.daily.time[day]}
            dateString={weatherData.daily.time[day]}
            temperature={getFutureWeather(day)}
            precipitation={weatherData.daily.precipitation_sum[day]}
          />
        ))
      ) : (
        <div></div>
      )}
    </div>
  )
}

Weatherlist.propTypes = {
  weatherData: PropTypes.object,
  showMore: PropTypes.bool,
}
export default Weatherlist
