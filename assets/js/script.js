$("#search-button").on("click", function(event) {
    event.preventDefault();
    var city = $("#search-input").val();
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=b8373b3fe2c318bbddad2464aefa9025";
  

    $.ajax({
        url: queryUrl,
        method: "GET"
      })
        .then(function(response) {
            console.log(response)
            // city name
            var cityArea = response.city;
            // creating array with the 5 next days
            var days = [
            day1 = response.list[0].dt_txt,
            day2 = response.list[8].dt_txt,
            day3 = response.list[16].dt_txt,
            day4 = response.list[24].dt_txt,
            day5 = response.list[32].dt_txt
            ]

            for (var i = i; i < days.length; i++){

            }
            //var wind = response.list[i].wind

            //var temperature = response.list[i].main[1];
            
            cityArea = $("<div>")
            cityArea.text(city);
            var today = $("#today")
            today.append(cityArea)
            
            
})
})



// date
// icon representation
// temperature
// wind speed

// persistent data: buttons with cities