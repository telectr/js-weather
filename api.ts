export async function geocode(q: string, auth: string) {
    const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=1&appid=${auth}`)
    const json = await res.json()
    return json[0]
}

export async function getCurrentWeather(lat: number, lon: number, auth: string, units="metric") {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${auth}`)
    const json = await data.json()
    return {
        location: json.name,
        temp: json.main.temp,
        feels_like: json.main.feels_like,
        visibility: json.visibility / 1000,
        wind_speed: json.wind.speed
    }
}