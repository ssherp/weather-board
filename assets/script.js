





$("#search-btn").on("click",function(){
    
var city = $(this).siblings(".form-control").val();
getCity(city);
var key = "cities"
var existCity = localStorage.getItem(key);
if (existCity===null){
    localStorage.setItem(key,JSON.stringify([city]))
}
else{
    
    var cityArr=JSON.parse(existCity);
    if(cityArr.indexOf(city)!=-1){
        return;
    }
cityArr.push(city);
localStorage.setItem(key,JSON.stringify(cityArr));
}
});
// localStorage.getItem(key,);

function getCity(city){

// var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=7c352849c8e0a97299331906dbac363a`
var requestUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7c352849c8e0a97299331906dbac363a&units=metric`

fetch (requestUrl)

.then(function(response){
var dateGiven=document.querySelectorAll(".date");
var cityGiven=document.querySelectorAll(".city-name");
var iconGiven=document.querySelectorAll(".emoji");
var tempGiven=document.querySelectorAll("temp");
var humidGiven=document.querySelectorAll("humidity");
var windGiven=document.querySelectorAll("wind-speed");
 dateGiven
console.log(response.json())
console.log($(this))
})}