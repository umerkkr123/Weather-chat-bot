const { formatWeatherResponse } = require('../helper/formatWeather')
require('dotenv').config();
const axios = require('axios');

const weatherRouter = async (req, res) => {
    try {
        const intent = (req.body.queryResult?.intent?.displayName !== undefined)
            ? req.body.queryResult.intent.displayName
            : req.body.intent;

        const city = (req.body.queryResult?.parameters !== undefined)
            ? req.body.queryResult.parameters.city
            : req.body.city;
        let responseText = '';

        if (intent === 'GetCurrentWeather') {
            const response = await axios.get(`${process.env.OPENWEATHER_BASE_URL}/weather`, {
                params: {
                    q: city,
                    appid: process.env.OPENWEATHER_API_KEY
                }
            });
            responseText = formatWeatherResponse(response.data);
        }
        else if (intent === 'GetWeatherForecast') {
            const response = await axios.get(`${process.env.OPENWEATHER_BASE_URL}/forecast`, {
                params: {
                    q: city,
                    appid: process.env.OPENWEATHER_API_KEY
                }
            });
            responseText = formatWeatherResponse(response.data, true);
        }

        res.send({
            fulfillmentText: responseText
        });
    } catch (error) {
        console.error('Error:', error);
        res.send({
            fulfillmentText: 'Sorry, I encountered an error while fetching the weather information.'
        });
    }
}

module.exports = { weatherRouter }