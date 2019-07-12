// Capitalize
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Format price
export function formatPrice(number) {
  const fnumber = parseFloat(number);
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(fnumber);
}

// Get wind direction
export function windDirection(degree) {
  const sectors = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

  degree += 22.5;

  if (degree < 0) {
    degree = 360 - Math.abs(degree) % 360;
  } else {
    degree = degree % 360;
  }

  const which = parseInt(degree / 45, 10);
  return sectors[which];
}

// Get weather icon class
export function getWeatherIcon(code) {
  const weatherIcons = {
    '01d': 'pe-is-w-sun-1',
    '02d': 'pe-is-w-partly-cloudy-1',
    '03d': 'pe-is-w-partly-cloudy-2',
    '04d': 'pe-is-w-mostly-cloudy-2',
    '09d': 'pe-is-w-rain-1',
    '10d': 'pe-is-w-rain-day',
    '11d': 'pe-is-w-severe-thunderstorm',
    '13d': 'pe-is-w-snow-day-2',
    '50d': 'pe-is-w-mist',
    '01n': 'pe-is-w-moon-1',
    '02n': 'pe-is-w-partly-cloudy-2',
    '03n': 'pe-is-w-partly-cloudy-2',
    '04n': 'pe-is-w-mostly-cloudy-2',
    '09n': 'pe-is-w-rain-1',
    '10n': 'pe-is-w-rain-full-moon',
    '11n': 'pe-is-w-severe-thunderstorm',
    '13n': 'pe-is-w-snow-full-moon-1',
    '50n': 'pe-is-w-mist',
  }

  return weatherIcons[code];
}

// Get stocks data
export async function getStocks(symbols) {
  let stocks = undefined;

  const stocks_call = await fetch(`//www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${symbols},&apikey=${process.env.REACT_APP_STOCKS_API_KEY}`).then(res => {
    if(res.ok) {
      return res;
    } else {
      throw Error(`Request rejected with status ${res.status}`);
    }
  }).catch(console.error)

  if (stocks_call !== undefined) {
    stocks = await stocks_call.json()
  }

  return stocks
}

// Get weather data
export async function getWeather(city, country, days) {
  let forecast = undefined;

  const forecast_call = await fetch(`//api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&cnt=${days}&units=metric`).then(res => {
    if(res.ok) {
      return res;
    } else {
      throw Error(`Request rejected with status ${res.status}`);
    }
  }).catch(console.error)

  if (forecast_call !== undefined) {
    forecast = await forecast_call.json()
  }

  return forecast
}