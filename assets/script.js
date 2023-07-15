var key = "cities"
displayHistory()  //this function starts after when you click in history
$(".history-btn").on("click", function () {
    getCity($(this).text()) 
})//starts when u click the search button
$("#search-btn").on("click", function () {

    var city = $(this).siblings(".form-control").val();
    getCity(city);
    // store city in local storage
    var existCity = localStorage.getItem(key);
    if (existCity === null) {
        localStorage.setItem(key, JSON.stringify([city]))
    }
    else {
        //return if there in already that city in storage
        var cityArr = JSON.parse(existCity);
        if (cityArr.indexOf(city) != -1) {
            return;
        } //pops last city if longer then 6
        if (cityArr.length == 6) {
            cityArr.pop()
        }
        cityArr.unshift(city);

        localStorage.setItem(key, JSON.stringify(cityArr));
    }
    displayHistory()
});// send city name to history
function displayHistory() {
    var searchHistory = JSON.parse(localStorage.getItem(key)) || [];
    var btnEls = document.querySelectorAll(".history-btn");
    
    for (var i = 0; i < searchHistory.length; i++) {
        var city = searchHistory[i];
        btnEls[i].textContent = city;
        btnEls[i].classList.remove("hidden");
    }

}
function getCity(location) {


    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=7c352849c8e0a97299331906dbac363a&units=imperial`
    //fetch daily weather info
    fetch(requestUrl)

        .then(function (response) {
            return response.json()
        })

        .then(function (data) {
            //all querySelector for need data
            var dateCGiven = document.querySelector(".current-date");
            var cityCGiven = document.querySelector(".current-city-name");
            var iconCGiven = document.querySelector(".current-emoji");
            var tempCGiven = document.querySelector(".current-temp");
            var humidCGiven = document.querySelector(".current-humidity");
            var windCGiven = document.querySelector(".current-wind-speed");
            //convert data format
            var normalTime = dayjs.unix(data.dt).format("MMM-DD,YYYY");
            //textContent data to html
            dateCGiven.textContent = normalTime;
            cityCGiven.textContent = data.name;
            iconCGiven.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            tempCGiven.textContent = data.main.temp;
            humidCGiven.textContent = data.main.humidity;
            windCGiven.textContent = data.wind.speed;

            latCord = data.coord.lat;
            lonCord = data.coord.lon;
            //get lat and lon number
            get5Day(latCord, lonCord);
        })

}       //input lat and long to get 5 day forecast every 3 hour
function get5Day(latCord, lonCord) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latCord + '&lon=' + lonCord + '&appid=7c352849c8e0a97299331906dbac363a&units=imperial'
    //fetch data
    fetch(requestUrl)

        .then(function (response) {
            return response.json()
        })
            //all querySelectorAll for data
        .then(function (data) {
            var allDates = document.querySelectorAll(".Dates");
            var allIcons = document.querySelectorAll(".emojis");
            var allWinds = document.querySelectorAll(".winds");
            var allHumidity = document.querySelectorAll(".humidities");
            var allTemp = document.querySelectorAll(".temps");
            //for statement to extract data and add to html
            var dateCount = 0
            for (var i = 0; i < allDates.length; i++) {
                allDates[i].textContent = dayjs(data.list[dateCount].dt_txt).format("MMM-D, YYYY");
                allIcons[i].src = `https://openweathermap.org/img/wn/${data.list[dateCount].weather[0].icon}.png`;
                allWinds[i].textContent = data.list[dateCount].wind.speed;
                allHumidity[i].textContent = data.list[dateCount].main.humidity;
                allTemp[i].textContent = data.list[dateCount].main.temp;
                //8th array multiples ever 3 hour make it 24 hours
                dateCount += 8;

            }



        })




}





