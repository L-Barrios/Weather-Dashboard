let nameOfCity = document.querySelector("#name-of-city")
let dispWeather = document.getElementById("#disp-weather")
let searchBtn = document.getElementById("search-btn");
city = [];

function weatherFetch(city) {

    fetch(
        // make a fetch request to the weather API
        'https://api.openweathermap.org/data/2.5/weather?q='
        +city +
        '&units=imperial&appid=8bed639fd98c9152d287e65173b6a1c7'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            

            let searchCity = document.querySelector("#search-city")

            searchCity.innerHTML = '<h2> ' + response.name + ' (' + new Date().toLocaleString() + ')</h2><img src="http://openweathermap.org/img/w/' + response.weather[0].icon + '.png" />'


            // additional data

            let temp = document.querySelector("#temperature")
            cityTemp.innerHTML = "Temperature: " + response.main.temp + " °F"

            let humid = document.querySelector("#humid")
            humid.innerHTML = "Humidity: " + response.main.humidity + "%"

            let wind = document.querySelector("#wind")
            wind.innerHTML = "Wind Speed: " + response.wind.speed + " MPH"

            let weather = document.querySelector("#weather")
            weather.innerHTML = "Current Weather: " + response.weather[0].description + '<img src="http://openweathermap.org/img/w/' + response.weather[0].icon + '.png" />'



            return latLon(response.coord.lat, response.coord.lon)

        }
        )
        .then(function (response) {
            return response.json();

        })




        // 5 day forecast one call fetch response & UV index

        .then(function (response) {
            console.log(response);

            let uvIndex = document.querySelector("#uv")
            uvIndex.innerHTML = "UV Index: " + response.current.uvi

                //Low index
            if (response.current.uvi <= 2) {
            
                uvIndex.classList.remove("bad")
                uvIndex.classList.remove("moderate")
                uvIndex.classList.add("good")
                

                //Mod Index
            } else if (response.current.uvi > 3 && response.current.uvi < 7) {
                
                uvIndex.classList.remove("bad")
                uvIndex.classList.remove("good")
                uvIndex.classList.add("moderate")


                //High Index//
            } else if (response.current.uvi > 7) {

                uvIndex.classList.add("bad")
                uvIndex.classList.remove("good")
                uvIndex.classList.remove("moderate")
            }


            // Code for the 5 day forecast

            // day one temperature
            
            let tempDayOne= document.querySelector("#temperature-one")
            .innerHTML = "Temperature: " + response.daily[0].temp.day + " °F" + '<img src="http://openweathermap.org/img/w/' + response.daily[0].weather[0].icon + '.png" />'
           
           
            // day one humidity
            let humidOne = document.querySelector("#humidity-one")
            humidOne.innerHTML = "Humidity: " + response.daily[0].humidity + " %"
            
            
            // day one wind speed
            let windOne = document.querySelector("#wind-one")
            windOne.innerHTML = "Wind Speed: " + response.daily[0].wind_speed + " MPH"
            
            
            
            // day one UV index
            let UvOne = document.querySelector("#uv-one")
            UvOne.innerHTML = "UV Index: " + response.daily[0].uvi

            

            function dayForecast(index, date) {

                let day = document.querySelector("#date-" + date)
                day.innerHTML = '<h4>' + new Date(response.daily[index].dt * 1000).toLocaleDateString() + "</h4>"

                let tempDay  = document.querySelector("#temperature-" + date)
                tempDay.innerHTML = "Temperature: " + response.daily[index].temp.day + " °F" + '<img src="http://openweathermap.org/img/w/' + response.daily[index].weather[0].icon + '.png" />'
                // day two humidity
                let humidDay = document.querySelector("#humidity-" + date)
                humidDay.innerHTML = "Humidity: " + response.daily[index].humidity + " %"
                // day Two wind speed
                let windyDay = document.querySelector("#wind-" + date)
                windyDay.innerHTML = "Wind Speed: " + response.daily[index].wind_speed + " MPH"
                // day Two UV index
                let UvDay = document.querySelector("#uv-" + date)
                UvDay.innerHTML = "UV Index: " + response.daily[index].uvi

            }

            dayForecast(1, 2)
            dayForecast(2, 3)
            dayForecast(3, 4)
            dayForecast(4, 5)  
        })
        .catch(function (error) {
            console.log(error);
        });
}

// uv index latitude and longitude

function latLon(lat, lon) {
    return fetch(

        "https://api.openweathermap.org/data/2.5/onecall?"

        +

        "lat=" + lat +

        "&lon=" + lon +

        "&units=imperial&appid=8bed639fd98c9152d287e65173b6a1c7"



    )

}

// function to add to local storage on button press

function pressBtn() {

    console.log(nameOfCity.value)


    weatherFetch(nameOfCity.value);

    let cityInput = document.getElementById("city-name")
    city.push(cityInput.value)

    localStorage.setItem('nameOfCity', JSON.stringify(city))
    weatherFetch(cityInput.value)

    
let hisCity = function () {
    hisCity = document.querySelector("#city-ul")
    hisCity.textContent = ""
        let cityList = JSON.parse(localStorage.getItem("cityName"))
    console.log(cityList)
    var i, len, text;
    for (i = 0, len = cityList.length, text = ''; i < len; i++) {

        text = cityList[i];
        let cities = document.createElement("li")
        cities.addEventListener("click", function (event) {
            weatherFetch(event.target.textContent)
        })
        cities.textContent = text
        hisCity.appendChild(cities)
    }

}
hisCity();

}





searchBtn.addEventListener("click", buttonPress)
