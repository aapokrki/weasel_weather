import axios from 'axios'

const getCurrentWeather = async (coordinates) => {
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.x}&longitude=${coordinates.y}&hourly=temperature_2m,precipitation&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&current_weather=true&timezone=Europe%2FBerlin`
  )
  return response.data
}

export default { getCurrentWeather }
