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

            var normalTime = dayjs.unix(data.dt).format("MMM-DD, YYYY");

            dateCGiven.textContent = normalTime;

            console.log(data)

            var lat
          var long
        
        
        get5Day(lat,long)
        })


}


function get5Day(lat, long) {
var requestUrl=//lat long


}