//SETTINGS ===========================================
const STOCK_API_KEY = "[PUT KEY HERE]";
const NEWS_API_KEY = "[PUT KEY HERE]";
const WEATHER_API_KEY = "[PUT KEY HERE]";

const ZIP_CODE = "12345";

//User's birthday month and day
const BIRTHDAY_MONTH = 1;
const BIRTHDAY_DAY = 1;

//The thresholds determine at what temperature the mirror warns you of weather
//For example: if the weather is below TEMP_LOW_THRESHOLD, then the mirror
//will point out the cold weather
const TEMP_LOW_THRESHOLD = 65;
const TEMP_HIGH_THRESHOLD = 85;

//Cryptocurrency tickers
const CRYPTO_1 = "BTC";
const CRYPTO_2 = "ETH";

//Stock tickers
const STOCK_1 = "QQQ";
const STOCK_2 = "SPY";

//The first option determines the number of top headlines from all news sources
//The second option determines the number of headlines from all news sources from a
//specific category, which can be set by the third option
const NUMBER_OF_TOP_HEADLINES = 2;
const NUMBER_OF_SECOND_CATEGORY_HEADLINES = 2;
const SECOND_CATEGORY = "business";

//SETTINGS END ========================================

//function to get JSON from API
function Get(url){
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET", url, false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

//Display date =======================================
//Setup dates for various modules
var date = new Date();
var yesterday = new Date();
var overYesterday = new Date();
var tomorrow = new Date();
var overmorrow = new Date();
var overovermorrow = new Date();
yesterday.setDate(date.getDate() - 1);
overYesterday.setDate(date.getDate() - 2);
tomorrow.setDate(date.getDate() + 1);
overmorrow.setDate(date.getDate() + 2);
overovermorrow.setDate(date.getDate() + 3);

//Calculate current date
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var month = months[date.getMonth()];
var day = date.getDate();
var dayWeeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var dayWeek = dayWeeks[date.getDay()];
var docDate = document.getElementById("date");
docDate.innerHTML = dayWeek + ", " + month + " " + String(day);

//Display time =======================================
var hours = date.getHours();
var minutes = date.getMinutes();
var formattedTime = String(hours) +":";
//Format time to add 0 in front of minute single digits 
if (minutes < 10) {
    formattedTime += "0" + String(minutes);
} else {
    formattedTime += String(minutes);
}
document.getElementById("time").innerHTML = formattedTime;

//Display greeting =======================================
var docGreeting = document.getElementById("greeting");
//Change greeting depending on time of day and holidays
if (hours > 5 && hours < 12) {
    docGreeting.innerHTML = "Good morning!"
} else if (hours >= 12 && hours < 18) {
    docGreeting.innerHTML = "Good afternoon!"
} else {
    docGreeting.innerHTML = "Good evening!"
}
if (month == 11 && day == 25) {
    docGreeting.innerHTML = "Merry Christmas"
} else if (month == 9 && day == 31) {
    docGreeting.innerHTML = "Happy Halloween"
} else if (month == BIRTHDAY_MONTH - 1 && day == BIRTHDAY_DAY) {
    docGreeting.innerHTML = "Happy Birthday!"
}
try {
    //Display weather =========================================
    var weatherJSON = JSON.parse(Get("https://api.openweathermap.org/data/2.5/weather?zip=" + ZIP_CODE + ",us&units=imperial&APPID=" + WEATHER_API_KEY));
    
    //Forecast info given every 3 hours
    var forecastJSON = JSON.parse(Get("https://api.openweathermap.org/data/2.5/forecast?zip=" + ZIP_CODE + ",us&units=imperial&APPID=" + WEATHER_API_KEY));
    
    //Create divider for the weather module
    document.getElementById("weather").innerHTML = "<hr class='divider'>" + document.getElementById("weather").innerHTML;
    
    //Set up dates for forecast events
    var todayString = date.toDateString();
    var tomorrowString = tomorrow.toDateString();
    var overmorrowString = overmorrow.toDateString();
    var overovermorrowString = overovermorrow.toDateString();

    //Set up weather variables for forecast
    var rainForecastsToday = 0;
    var forecastsToday = 0;
    var tomorrowConditions = [];
    var tomorrowCondID = [];
    var overmorrowConditions = [];
    var overmorrowCondID = [];
    var overovermorrowConditions = [];
    var overovermorrowCondID = [];
    var lowOfDay = 1000;
    var highOfDay = 0;
    var highs = [0, 0, 0];
    var lows = [1000, 1000, 1000];
    var sunriseTime = new Date(weatherJSON.sys.sunrise * 1000);
    var sunriseComp = [sunriseTime.getHours(), sunriseTime.getMinutes()];
    var sunsetTime = new Date(weatherJSON.sys.sunset * 1000);
    var sunsetComp = [sunsetTime.getHours(), sunsetTime.getMinutes()];
    var rainSet = false;
    var timeOfRain = 0;

    //Iterate through the forecast and gather the data into arrays
    for (var i = 0; i < forecastJSON.list.length; i++) {
        
        //Give in UTC time
        var newDate = new Date(forecastJSON.list[i].dt * 1000);
        
        //toDateString() converts to local time
        var newDateString = newDate.toDateString();
        
        //Gather data from forecast if it is about today
        if (todayString == newDateString) {
            //Find low/high of today
            if (forecastJSON.list[i].main.temp_max >= highOfDay) {
                highOfDay = forecastJSON.list[i].main.temp_max;
            }
            if (forecastJSON.list[i].main.temp_min <= lowOfDay) {
                lowOfDay = forecastJSON.list[i].main.temp_min;
            }
            /* 
            * To calculate chance of rain for the rest of the day, 
            * count the number of times the 3 hour forecasts say there
            * will be rain and divide that by the total number of 3 hour 
            * forecasts for the day to get a percentage
            */
            forecastsToday++;
            if (forecastJSON.list[i].rain != undefined) {
                rainForecastsToday++;
                if (!rainSet) {
                    timeOfRain = newDate.getHours();
                    rainSet = true;
                }
            } 
        //Get data from forecast for tomorrow
        } else if (tomorrowString == newDateString) {
            //Push the weather condition into the conditions array
            tomorrowCondID.push(forecastJSON.list[i].weather[0].id);
            //Find the min and max of the temperature for display
            if (forecastJSON.list[i].main.temp_max > highs[0]) {
                highs[0] = forecastJSON.list[i].main.temp_max;
            }
            if (forecastJSON.list[i].main.temp_min < lows[0]) {
                lows[0] = forecastJSON.list[i].main.temp_min;
            }
        //Repeat for overmorrow and overovermorrow
        } else if (overmorrowString == newDateString) {
            overmorrowCondID.push(forecastJSON.list[i].weather[0].id);
            if (forecastJSON.list[i].main.temp_max > highs[1]) {
                highs[1] = forecastJSON.list[i].main.temp_max;
            }
            if (forecastJSON.list[i].main.temp_min < lows[1]) {
                lows[1] = forecastJSON.list[i].main.temp_min;
            }
        } else if (overovermorrowString == newDateString) {
            overovermorrowCondID.push(forecastJSON.list[i].weather[0].id);
            if (forecastJSON.list[i].main.temp_max > highs[2]) {
                highs[2] = forecastJSON.list[i].main.temp_max;
            }
            if (forecastJSON.list[i].main.temp_min < lows[2]) {
                lows[2] = forecastJSON.list[i].main.temp_min;
            }
        }
    }
    //Finds mode of array so that the "average" condition can be calculated
    //By Emissary https://stackoverflow.com/a/20762713
    function mode(arr){
        return arr.sort((a,b) =>
            arr.filter(v => v===a).length
            - arr.filter(v => v===b).length
        ).pop();
    }
    forecastCondID = [mode(tomorrowCondID), mode(overmorrowCondID), mode(overovermorrowCondID)];
    //Get HTML elements from doc
    var docForecastIcons = document.getElementsByClassName("forecast-icon");
    var docLows = document.getElementsByClassName("low");
    var docHighs = document.getElementsByClassName("high");
    var docDayOfWeek = document.getElementsByClassName("day-of-week");

    for (var i = 0; i < docForecastIcons.length; i++) {
        //Use the average conditions to determine the icon to be used
        var forecastIcon = "wi wi-owm-" + forecastCondID[i];
        docForecastIcons[i].className = "forecast-icon " + forecastIcon;
        //display the lows and the highs
        docLows[i].innerHTML = "| " + lows[i].toFixed(0);
        docHighs[i].innerHTML = highs[i].toFixed(0);
        //display the day of the week
        docDayOfWeek[i].innerHTML = dayWeeks[(date.getDay() + 1 + i) > 6 ? ((date.getDay() + 1 + i) - 7) : (date.getDay() + 1 + i)];
    }

    //Calculate chance of rain by finding probability of rain at any given hour
    var chanceOfRainToday = (100 * rainForecastsToday / forecastsToday).toFixed(0);
    
    //Determine wether to use the day icon or night icon for the weather
    var dayOrNight = "day-";
    if (hours < sunriseComp[0] || ((hours == sunriseComp[0]) && (minutes < sunriseComp[1]))) {
        dayOrNight = "night-"
    } else if (hours > sunsetComp[0] || ((hours == sunsetComp[0]) && (minutes < sunsetComp[1]))) {
        dayOrNight = "night-"
    }

    var weatherIconID = weatherJSON.weather['0'].id;
    var weatherIcon = "wi wi-owm-" + dayOrNight + weatherIconID;
    var cityName = weatherJSON.name;
    var weatherDescription = weatherJSON.weather['0'].description;
    var currentTemp = weatherJSON.main.temp;

    //Capitalize first letter of each word in the weather description
    var descripArr = weatherDescription.split(' ');
    weatherDescription = "";
    for (var i = 0; i < descripArr.length; i++) {
        descripArr[i] = descripArr[i].charAt(0).toUpperCase() + descripArr[i].substr(1);
        weatherDescription += descripArr[i] + " ";
    }

    //Display values
    document.getElementById("header-chance-of-rain").innerHTML = "Chance of rain: " + chanceOfRainToday + "%";
    document.getElementById("weather-header-icon").className = weatherIcon;
    document.getElementById("location").innerHTML = cityName;
    document.getElementById("condition").innerHTML = weatherDescription;
    document.getElementById("weather-header-temp").innerHTML = currentTemp.toFixed(0) + "°";

    //Display weather warning
    var docWarning = document.getElementById("weather-warning");
    if (lowOfDay < TEMP_LOW_THRESHOLD) {
        docWarning.innerHTML = "The low today will be around " + lowOfDay + "°. Remember a jacket!";
    }
    if (highOfDay > TEMP_HIGH_THRESHOLD) {
        docWarning.innerHTML = "It's gonna reach " + highOfDay + "°. Take shorts!"
    }
    if (rainSet) {
        docWarning.innerHTML = "Remember your umbrella, it'll rain around " + String(timeOfRain) + ":00";
    }

    //Display tickers =======================================
    //Function to round prices
    function round(number, precision) {
        var shift = function (number, precision) {
          var numArray = ("" + number).split("e");
          return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
        };
        return shift(Math.round(shift(number, +precision)), -precision);
    }

    //Find ID of each crypto listing to use for the coinmarketcap API
    var cryptoListingJSON = JSON.parse(Get("https://api.coinmarketcap.com/v2/listings/"));
    var cryptoListing = cryptoListingJSON.data;
    var crypto1ID = 0;
    var crypto2ID = 0;
    for (var i = 0; i < cryptoListing.length; i++) {
        if (CRYPTO_1 == cryptoListing[i].symbol) {
            crypto1ID = cryptoListing[i].id;
        }
        if (CRYPTO_2 == cryptoListing[i].symbol) {
            crypto2ID = cryptoListing[i].id;
        }
    }

    //Get data from sources
    var crypto1 = JSON.parse(Get("https://api.coinmarketcap.com/v2/ticker/" + crypto1ID + "/"));
    var crypto2 = JSON.parse(Get("https://api.coinmarketcap.com/v2/ticker/" + crypto2ID + "/"));
    var stock1 = JSON.parse(Get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + STOCK_1 + "&outputsize=compact&apikey=" + yes_KEY));
    var stock2 = JSON.parse(Get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + STOCK_2 + "&outputsize=compact&apikey=" + yes_KEY));

    var docCurrency = document.getElementsByClassName("currency");

    //Setup timestamps for the stock data
    var timestampDay = String(date.getFullYear()) + "-" + ((String(date.getMonth().length) == 2) ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1))) + "-" + ((String(date.getDate()).length == 2) ? (date.getDate()) : ("0" + (date.getDate())));
    var timestampYesterday = String(yesterday.getFullYear()) + "-" + ((String(yesterday.getMonth()).length == 2) ? (yesterday.getMonth() + 1) : ("0" + (yesterday.getMonth() + 1))) + "-" + ((String(yesterday.getDate()).length == 2) ? (yesterday.getDate()) : ("0" + (yesterday.getDate())));
    var timestampOverYesterday = String(overYesterday.getFullYear()) + "-" + ((String(overYesterday.getMonth()).length == 2) ? (overYesterday.getMonth() + 1) : ("0" + (overYesterday.getMonth() + 1))) + "-" + ((String(overYesterday.getDate()).length == 2) ? (overYesterday.getDate()) : ("0" + (overYesterday.getDate())));

    tickers = document.getElementsByClassName("ticker");
    prices = document.getElementsByClassName("price");
    changes = document.getElementsByClassName("change");
    
    //crypto 1
    tickers[0].innerHTML = crypto1.data.symbol + " ";
    prices[0].innerHTML = crypto1.data.quotes.USD.price.toLocaleString('en', {style: 'currency', currency: 'USD'}).slice(1);
    changes[0].innerHTML = "(" + String(crypto1.data.quotes.USD.percent_change_24h.toFixed(2)) + "%)";
    docCurrency[0].innerHTML = "$";
    
    //crypto 2
    tickers[1].innerHTML = crypto2.data.symbol + " ";
    prices[1].innerHTML = crypto2.data.quotes.USD.price.toLocaleString('en', {style: 'currency', currency: 'USD'}).slice(1);
    changes[1].innerHTML = "(" + String(crypto2.data.quotes.USD.percent_change_24h.toFixed(2)) + "%)";
    docCurrency[1].innerHTML = "$";
    
    //stock 1
    //Checks if stock information is out for the day (market opens at 9:30)
    if ((hours < 9) || (hours == 9 && minutes < 30)) {
        timestampDay = timestampYesterday;
        timestampYesterday = timestampOverYesterday;
    }
    tickers[2].innerHTML = stock1['Meta Data']['2. Symbol'] + " ";
    prices[2].innerHTML = round(stock1['Time Series (Daily)'][timestampDay]["4. close"], 2).toLocaleString('en', {style: 'currency', currency: 'USD'}).slice(1);
    var stockChange = 100 * (parseFloat(stock1['Time Series (Daily)'][timestampDay]["4. close"]) - parseFloat(stock1['Time Series (Daily)'][timestampYesterday]["4. close"])) / parseFloat(stock1['Time Series (Daily)'][timestampYesterday]["4. close"]);
    stockChange = stockChange.toFixed(2);
    changes[2].innerHTML = "(" + stockChange + "%)";
    docCurrency[2].innerHTML = "$";

    //stock 2
    tickers[3].innerHTML = stock2['Meta Data']['2. Symbol'] + " ";
    prices[3].innerHTML = round(stock2['Time Series (Daily)'][timestampDay]["4. close"], 2).toLocaleString('en', {style: 'currency', currency: 'USD'}).slice(1);
    stockChange = 100 * (parseFloat(stock2['Time Series (Daily)'][timestampDay]["4. close"]) - parseFloat(stock2['Time Series (Daily)'][timestampYesterday]["4. close"])) / parseFloat(stock2['Time Series (Daily)'][timestampYesterday]["4. close"]);
    stockChange = stockChange.toFixed(2);
    changes[3].innerHTML = "(" + stockChange + "%)";
    docCurrency[3].innerHTML = "$";

    //Colors the percent change depending on if it was negative or positive
    for (var i = 0; i < changes.length; i++) {
        var price = parseFloat(changes[i].innerHTML.slice(1, -2));
        if (price > 0.0) {
            changes[i].style.color = "#99ff84"; //green
        } else if (price < 0.0) {
            changes[i].style.color = "#ff4949"; //red
        } else if (price == 0.0) {
            changes[i].style.color = "white";
        }
    }

    //Display news headlines =======================================
    var newsJSON = JSON.parse(Get("https://newsapi.org/v2/top-headlines?country=us&apiKey=" + NEWS_API_KEY));
    var newsCategoryJSON = JSON.parse(Get("https://newsapi.org/v2/top-headlines?country=us&category=" + SECOND_CATEGORY + "&apiKey=" + NEWS_API_KEY));
    var docHeadlines = document.getElementById("news-wrapper");
    
    //Draw divider for news module
    docHeadlines.innerHTML = "<hr class='divider' style='margin-bottom: 10px;'>"
    
    //Display the top headlines
    for (var i = 0; i < NUMBER_OF_TOP_HEADLINES; i++) {
        docHeadlines.innerHTML += "<li class='headline'><span class='fa-li'><i class='far fa-newspaper'></i></span>" + newsJSON.articles[i].title + "</li>";
    }

    //Display the headlines from the selected category
    for (var i = 0; i < NUMBER_OF_SECOND_CATEGORY_HEADLINES; i++) {
        docHeadlines.innerHTML += "<li class='headline'><span class='fa-li'><i class='far fa-newspaper'></i></span>" + newsCategoryJSON.articles[i].title + "</li>";
    }
} catch (e) {
    //Determine if network error occurred
    document.getElementById("error-text").innerHTML = "Connection lost";
}
