# Magic Mirror
This is a Magic Mirror created using a Raspberry Pi, HTML, CSS, and Javascript

### Contents
1. [Setup](##Setup)
2. [Installation](##Installation)
3. [Settings](##Settings)
4. [Attributions](##Attributions)

## Setup

### Materials
* Wood planks for the frame
* Molding wood
* [Raspberry Pi Zero W](https://www.raspberrypi.org/) (Although any Raspberry Pi would work)
* Monitor
* See through mirror (I used [this one](https://www.amazon.com/gp/product/B01G4MQ3WQ/ref=oh_aui_detailpage_o06_s01?ie=UTF8&psc=1))
* Adhesives or brackets to assemble the frame
* Brackets to hold the monitor in place
* Mini HDMI and power cable
* USB to Mini USB adapter
* 2-Outlet power strip

These are the steps I took to build Mirror
### Construction
1. Take the monitor and remove all of the plastic cover, including the bezel to expose the metal frame and electronics.
2. Measure the height and width of the screen to determine the frame dimensions
3. Plug in the HDMI and power cable into the back of the monitor, and then measure the depth. This lets you know the depth of the frame
4. Cut your wood planks to the appropriate length, leaving a few extra centimeters so that the planks can connect at the corners
5. Use adhesive, brackets, or both to connect the wood at the joints.
6. Cut the molding wood to the same length as the planks and use adhesive or screws to attach it to the front of the frame.
7. Once the frame is sturdy, check to see if the monitor fits into it.
8. Cut the mirror to the right size to fit the frame. Use a jig saw or a dremel to cut the mirror. Leave the plastic covering on the mirror and make sure to cut quickly through the mirror so that the heat doesn't melt the plastic.
9. Once the mirror is cut to the correct size, place it into the frame and make sure it fits.
10. Place the monitor behind the mirror and use the brackets to fasten it into place.
11. Use velcro or tape to place the Raspberry Pi and the cables into the frame.
12. Connect the monitor power cable and the Raspberry Pi power cable into the power strip and place it within the frame.
13. Use tape or velcro to fasten the power strip
14. Turn on the Raspberry Pi and the monitor, plug everything in, and make sure it works

## Installation
1. Follow [these instructions](https://www.raspberrypi.org/documentation/remote-access/ssh/) to set up SSH for the Raspberry Pi. This is so that you can control the Pi without having to move the mirror. This is useful for future maintenance.
2. Download the code from this repo and place it into your favorite folder in the Raspberry Pi.
3. If you want the mirror to be vertical instead of horizontal, open the terminal and type `sudo nano /boot/config.txt`. 
⋅⋅⋅* This will open the file used by the Raspberry Pi for the display configuration. 
⋅⋅⋅* Add `display_rotate=1` or `display_rotate=3`, depending if you want a clockwise rotation or a counter clockwise rotation. 
⋅⋅⋅* On your keyboard, press Ctrl-O, then 'y', then Enter to save the file
⋅⋅⋅* Press Ctrl-X to quit the text editor
4. In order to hide the cursor on the Raspberry Pi, type `sudo apt-get install unclutter`. This installs a program that hides the cursor when not in use.
5. In order to hide the Raspbian taskbar, right click the Taskbar, select "Panel Settings", click the "Advanced" tab, then check "Minimize panel when not in use".
6. In order to hide the Chromium toolbar, 
7. In order to start index.html on boot, type

Note: if you want to turn of the Raspberry Pi safely, go to the terminal or SSH into the terminal and type `sudo shutdown now`. Wait until the green LED turns off to unplug the Pi. 

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
