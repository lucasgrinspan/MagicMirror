# Magic Mirror
This is a Magic Mirror created using a Raspberry Pi, HTML, CSS, and Javascript

### Contents
1. [Setup](#Setup)
2. [Installation](#Installation)
3. [Settings](#Settings)
4. [Attributions](#Attributions)

## Setup


## Installation


## Settings
The settings let you customize some parts of the display and are found in lines 1-33 of main.js.
### Parameters
* `ZIP_CODE`: This is used for the weather information. Takes in a string variable.
* `BIRTHDAY_MONTH` and `BIRTHDAY_DAY`: The mirror wishes you happy birthday on the date inputted here. Takes in an int variables.
* `TEMP_LOW_THRESHOLD` and `TEMP_HIGH_THRESHOLD`: Use these to determine at what temperature the mirror warns you of extreme weather. For example, temperature below the `TEMP_LOW_THRESHOLD` will warn you "The weather will be around [temp] today. Remember to take a jacket!". Takes an int.
* `CRYPTO_1` and `CRYPTO_2`: Use these to determine which cryptocurrencies are tracked by the mirror. Takes in a string of the ticker symbol of the cryptocurrency.
* `STOCK_1 ` and `STOCK_2`: Use these to set which stocks are tracked by the mirror. Takes in a string of the ticker symbol of the stock.
* `NUMBER_OF_TOP_HEADLINES`: Use this to set the number of top headlines displayed from all news sources. Takes an int.
* `NUMBER_OF_SECOND_CATEGORY_HEADLINES`: Use this to set the number of headlines displayed only from a specific category. Takes an int.
* `SECOND_CATEGORY`: Use this to determine the category that the mirror will display headlines from. Takes a string variable. Possible options are: `business`, `entertainment`, `general`, `health`, `science`, `sports`, or `technology`

## Attributions
* Weather icons from [Weather Icons](http://erikflowers.github.io/weather-icons/)
* Newspaper icons from [Font Awesome](https://fontawesome.com/)
* Weather information from [OpenWeatherMap](https://openweathermap.org/)
* News information from [News API](https://newsapi.org/)
* Cryptocurrency information from [CoinMarketCap](https://coinmarketcap.com/)
* Stock market information from [AlphaVantage](https://www.alphavantage.co/)