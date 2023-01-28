import axios from 'axios'

const getCurrentWeather = async (coordinates) => {
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.x}&longitude=${coordinates.y}&hourly=temperature_2m,precipitation&models=best_match&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_hours&current_weather=true&timezone=Europe%2FBerlin`
  )
  console.log('asdasd')

  return response.data
}

export default { getCurrentWeather }
