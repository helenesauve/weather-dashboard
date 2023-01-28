$("#search-button").on("click", function (event) {
  event.preventDefault();
  var city = $("#search-input").val();
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=b8373b3fe2c318bbddad2464aefa9025";

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // city name
    var cityArea = response.city.name;
    cityArea = $("<div>");
    cityArea.text(city);
    
    var today = $("#today");
    var forecast = $("#forecast");
    today.append("<h2>" + city + " " + moment().format("MMMM Do YYYY") + "</h2>");

    // adding wind on the page
    var wind = response.list[0].wind.speed;
    // wind = $("<div>");

    // adding temperature on the page
    var temperature = (response.list[0].main.temp);
    console.log(response.list[0].main.temp)


    var humidity = (response.list[0].main.humidity);

    today.append("<h3>" + "Temp: " + temperature +  " kelvin" + "</h3>")
    today.append("<h3>" + "Wind: "+ wind + "KPH" + "</h3>")
    today.append("<h3>" + "Humidity: " + humidity + "%" + "</h3>")
    // today.append("<h3>" + "Humidity:" + JSON.stringify(humidity) + "</h3>")
   
    // creating array with the 5 next days
    var days = [
      (day1 = response.list[0].dt_txt),
      (day2 = response.list[8].dt_txt),
      (day3 = response.list[16].dt_txt),
      (day4 = response.list[24].dt_txt),
      (day5 = response.list[32].dt_txt),
    //   (day6 = response.list[40].dt_txt)
    ];

    console.log(response.list[0].wind)

    //for each day, display day using moment.js
    //display temp, wind, humidity
    for (var i = i; i < days.length; i++) {
        var wind = response.list[i].wind;
        var temperature = response.list[i].main.temp;

      
    //   forecast.append(wind);
    //   forecast.append(temperature);
    }
  });
});

// date
// icon representation
// temperature
// wind speed

// persistent data: buttons with cities
