$("#search-btn").on("click", function () {

    var city = $(this).siblings(".form-control").val();
    getCity(city);
    var key = "cities"
    var existCity = localStorage.getItem(key);
    if (existCity === null) {
        localStorage.setItem(key, JSON.stringify([city]))

    }
    else {

        var cityArr = JSON.parse(existCity);
        if (cityArr.indexOf(city) != -1) {
            return;
        }
        cityArr.push(city);
        localStorage.setItem(key, JSON.stringify(cityArr));
    }
});
// localStorage.getItem(key,);

function getCity(city) {

    // var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=7c352849c8e0a97299331906dbac363a`
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7c352849c8e0a97299331906dbac363a&units=metric`

    fetch(requestUrl)

        .then(function (response) {
            return response.json()
        })

        .then(function (data) {

            var dateCGiven = document.querySelector(".current-date");
            var cityCGiven = document.querySelector(".current-city-name");
            var iconCGiven = document.querySelector(".current-emoji");
            var tempCGiven = document.querySelector(".current-temp");
            var humidCGiven = document.querySelector(".current-humidity");
            var windCGiven = document.querySelector(".current-wind-speed");

            var normalTime = dayjs.unix(data.dt).format("MMM-DD,YYYY");

            dateCGiven.textContent = normalTime;
            cityCGiven.textContent = data.name;
            iconCGiven.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            tempCGiven.textContent = data.main.temp;
            humidCGiven.textContent = data.main.humidity;
            windCGiven.textContent = data.wind.speed;

            // console.log(data);

            latCord = data.coord.lat;
            lonCord = data.coord.lon;

            // console.log(latCord, lonCord);
            get5Day(latCord, lonCord);
        })

    }
function get5Day(latCord, lonCord) {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+latCord+'&lon='+lonCord+'&appid=7c352849c8e0a97299331906dbac363a&units=metric'

    fetch(requestUrl)

        .then(function(response){
            return response.json()
        })

        .then(function(data){
            var allDates= document.querySelectorAll(".Dates");
            var allIcons= document.querySelectorAll(".emojis");
            var allWinds= document.querySelectorAll(".winds");
            var allHumidity=document.querySelectorAll(".humidity");
            var allTemp= document.querySelectorAll(".temps");
            
            var dateCount=0
            for (var i= 0; i < allDates.length;i++){
            allDates[i].textContent=dayjs(data.list[dateCount].dt_txt).format("MMM-D, YYYY");
            allIcons[i].src = `https://openweathermap.org/img/wn/${data.list[dateCount].weather[0].icon}.png`;
            // allWinds[i].textContent=data.list[dateCount].wind.speed;
            // allHumidity[i].textContent=data.list[dateCount].main.humidity;
            // allTemp[i].textContent=data.list[dateCount].main.temp;
 
            dateCount+=8;
          console.log(allDates)
        }


            
        })




}





//event.target get the text content