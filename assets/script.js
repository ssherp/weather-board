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

var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=7c352849c8e0a97299331906dbac363a`

fetch (requestUrl)

.then(function(response){

console.log(response.json())
})}