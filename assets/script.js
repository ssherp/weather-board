$("#search-btn").on("click",function(){
var city = $(this).siblings(".form-control").val();
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
localStorage.getItem(key,)

