import axios from "axios";



export const getWeather = (city) => {
    const url = (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APIKEY}`)
    const response =  axios.get(url)
    return response.data
}

