import PropTypes from 'prop-types'
//import { useState } from 'react'
import Weather from './Weather'

const Weatherlist = ({ weatherData, showMore }) => {
  const days = [1, 2]

  const getIndexGap = (dayFromNow) => [dayFromNow * 24, (dayFromNow + 1) * 24]

  // Get average temperature of a specific day from now
  const getFutureWeather = (dayFromNow) => {
    const indexGap = getIndexGap(dayFromNow)
    const hourlyWeather = weatherData.hourly.temperature_2m.slice(
      indexGap[0],
      indexGap[1]
    )

    const weatherAverage =
      // Get weather average from hourly estimates and round it by 1 decimal
      Math.round(
        (hourlyWeather.reduce((a, b) => a + b, 0) / hourlyWeather.length) * 10
      ) / 10

    return weatherAverage
  }

  const getHourlyTemperature = (dayFromNow) => {
    //console.log(weatherData)
    const indexGap = getIndexGap(dayFromNow)
    const hourlyWeather = weatherData.hourly.temperature_2m.slice(
      indexGap[0],
      indexGap[1]
    )
    return hourlyWeather
  }
  const getHourlyPrecipitation = (dayFromNow) => {
    //console.log(weatherData)
    const indexGap = getIndexGap(dayFromNow)
    const hourlyPrec = weatherData.hourly.precipitation.slice(
      indexGap[0],
      indexGap[1]
    )
    return hourlyPrec
  }

  return (
    <div>
      <Weather
        key={weatherData.daily.time[0]}
        dateString={weatherData.daily.time[0]}
        temperature={weatherData.current_weather.temperature}
        precipitation={weatherData.daily.precipitation_sum[0]}
        weatherCode={weatherData.current_weather.weathercode}
        tempTimeline={getHourlyTemperature(0)}
        precTimeline={getHourlyPrecipitation(0)}
      />
      {showMore ? (
        days.map((day) => (
          <Weather
            key={weatherData.daily.time[day]}
            dateString={weatherData.daily.time[day]}
            temperature={getFutureWeather(day)}
            precipitation={weatherData.daily.precipitation_sum[day]}
            weatherCode={weatherData.daily.weathercode[day]}
            tempTimeline={getHourlyTemperature(day)}
            precTimeline={getHourlyPrecipitation(day)}
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
