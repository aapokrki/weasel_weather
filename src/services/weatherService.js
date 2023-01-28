import axios from 'axios'

const getCurrentWeather = async (coordinates) => {
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.x}&longitude=${coordinates.y}&hourly=temperature_2m&daily=weathercode&current_weather=true&timezone=Europe%2FBerlin`
  )
  return response.data
}

export default { getCurrentWeather }
