# Magic Mirror
This is a Magic Mirror created using a Raspberry Pi, HTML, CSS, and Javascript. The available modules are time, date, current weather, weather forecast, cryptocurrency tickers, stock tickers, and news headlines. 
![Magic Mirror](https://github.com/lucasgrinspan/MagicMirror/blob/master/Images/Screenshot.png)
## Setup

#### Materials
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
#### Construction
1. Take the monitor and remove all of the plastic cover, including the bezel to expose the metal frame and electronics.
2. Measure the height and width of the screen to determine the frame dimensions
3. Plug in the HDMI and power cable into the back of the monitor, and then measure the depth. This lets you know the depth of the frame
4. Cut your wood planks to the appropriate length, leaving a few extra centimeters so that the planks can connect at the corners
5. Use adhesive, brackets, or both to connect the wood at the joints.
6. Cut the molding wood to the same length as the planks and use adhesive or screws to attach it to the front of the frame.
This is how my frame ended up.
![Frame](https://github.com/lucasgrinspan/MagicMirror/blob/master/Images/Frame.png)
7. Once the frame is sturdy, check to see if the monitor fits into it.
8. Cut the mirror to the right size to fit the frame. Use a jig saw or a dremel to cut the mirror. Leave the plastic covering on the mirror and make sure to cut quickly through the mirror so that the heat doesn't melt the plastic.
9. Once the mirror is cut to the correct size, place it into the frame and make sure it fits.
10. Place the monitor behind the mirror and use the brackets to fasten it into place.
11. Use velcro or tape to place the Raspberry Pi and the cables into the frame.
12. Connect the monitor power cable and the Raspberry Pi power cable into the power strip and place it within the frame.
13. Use tape or velcro to fasten the power strip.
14. Turn on the Raspberry Pi and the monitor, plug everything in, and make sure it works.
This is how my wiring ended up.
![Wiring](https://github.com/lucasgrinspan/MagicMirror/blob/master/Images/Wiring.png)

#### Installation
1. Follow [these instructions](https://www.raspberrypi.org/documentation/remote-access/ssh/) to set up SSH for the Raspberry Pi. This is so that you can control the Pi without having to move the mirror. This is useful for future maintenance.
2. Download this project onto your main computer or your Raspberry Pi by cloning the project (`git clone https://github.com/lucasgrinspan/MagicMirror`).
     * Open main.js in the code and navigate to the settings at the beginning of the file.
     * You will have to register for API keys to recieve the information.
     * Register at [News API](https://newsapi.org), [OpenWeatherMap](https://openweathermap.org/api), and [AlphaVantage](https://www.alphavantage.co). You don't have to register for the crypto information.
     * Change the zip code to your current zip code to recieve local weather information.
     * Change the birthday month and birthday day to recieve a happy birthday wish on your birthday.
     * Configure the other settings if you'd like.
3. Once configured, transfer the files to the Raspberry Pi if you cloned the project onto your main computer. You can do this by using `scp` by `scp -r MagicMirror/ pi_user@pi_ip:~` substituting in your username and IP for the Raspberry Pi. Run this command from the directory containing the MagicMirror director. If you downloaded this project on the Raspberry Pi, you can skip this step.
4. You can automatically configure and setup the MagicMirror by running `sudo ./install_magic_mirror` from the MagicMirror directory. If you wish to do it manually, here are the steps:
    * Run `sudo apt-get install unclutter`. This will hide the mouse cursor when not in use.
    * Run `mv ~/MagicMirror/startup.sh /home/pi`. This will move the script that starts the MagicMirror program into your home directory.
    * Add the line `DISPLAY=:0 ./startup.sh` to your .bashrc file in your home directory. You can use a text editor or you can use the command `echo "DISPLAY=:0 ./startup.sh" >> .bashrc` from the home directory to add it. 
    * Depending if you want a clockwise or counterclockwise rotation on your monitor, you will have to add either `display_rotate=1` or `display_rotate=3` to your /boot/config.txt file. Note that the line must be added at the beginning of the file. You can do this using a text editor installed on the Raspberry Pi or use the command `sudo sed -i "4i display_rotate=x" /boot/config.txt` Replace the "x" with the desired orientation.
    * Reboot the Raspberry Pi by typing `sudo reboot now` to complete the changes. The program will start once it reboots.
5. The program will now automatically start everytime the Raspberry Pi turns on.

## Notes
* If you want to turn of the Raspberry Pi safely, go to the terminal or SSH into the terminal and type `sudo shutdown now`. Wait until the green LED turns off to unplug the Pi.
* To uninstall the Magic Mirror, navigate to the MagicMirror directory and run `sudo ./uninstall_magic_mirror`. This will remove unclutter, the startup script, the modifications to the .bashrc file, the modifications to /boot/config.txt, and finally delete the folder. 

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
