const apiKey = "0af1390a101090e0243ecaadfa42bd0f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
async function checkWeather(city){
    const response = await fetch(apiUrl + "&q=" + city + `&appid=${apiKey}`);
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none"
    }else {
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        var data = await response.json();
        //to get the date and day of the city searched
        const timezoneOffset = data.timezone; 
        const now = new Date(); 
        const utcTimestamp = now.getTime(); 
        const localTimestamp = utcTimestamp + (timezoneOffset * 1000); 
        const options = {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZone: data.timezone_id 
        };
        const localDateString = new Date(localTimestamp).toLocaleDateString("en-US", options); 
        document.querySelector(".date").innerHTML = localDateString;
        //
        document.querySelector("#condition").innerHTML = data.weather[0].description;
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        if (!data.rain) {
            document.querySelector("#rainfall").innerHTML = "";
        } 
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png";
            if (data.rain) {
            document.querySelector("#rainfall").innerHTML = data.rain["1h"] + "mm rainfall in the last hour";
            } 
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
    }
}
}
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});
checkWeather("kansas");