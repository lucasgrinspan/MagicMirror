# Magic Mirror
This is a Magic Mirror created using a Raspberry Pi, HTML, CSS, and Javascript

### Contents
1. [Setup](## Setup)
2. [Installation](## Installation)
3. [Settings](## Settings)
4. [Attributions](## Attributions)

## Setup

### Materials
* Wood planks for the frame
* [Raspberry Pi Zero W](https://www.raspberrypi.org/) (Although any Raspberry Pi would work)
* Monitor
* See through mirror (I used [this one](https://www.amazon.com/gp/product/B01G4MQ3WQ/ref=oh_aui_detailpage_o06_s01?ie=UTF8&psc=1))
* Adhesives or brackets to assemble the frame
* Mini HDMI and power cable
* USB to Mini USB adapter
* 2-Outlet power strip

These are the steps I took to build Mirror
### Construction
1. Take the monitor and remove all of the plastic cover, including the bezel to expose the metal frame and electronics.
2. Measure the height and width of the screen to determine the frame dimensions
3. Plug in the HDMI and power cable into the back of the monitor, and then measure the depth. This lets you know the depth of the frame
4. 
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
