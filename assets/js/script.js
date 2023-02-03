// displays each searched city in the history section
function renderButtons() {
  var searchedCities = JSON.parse(localStorage.getItem("searched")) || [];
  console.log(searchedCities);
  if (searchedCities === null) {
    localStorage.setItem("searched", JSON.stringify([]));
    return;
  }
  for (let i = 0; i < searchedCities.length; i++) {
    console.log(searchedCities[i]);
    var newCity = $("<button>");
    newCity.text(searchedCities[i]);
    $(".list-group").append(newCity);
    newCity.click(function () {
      searchWeather(this.innerHTML);
    });
  }
}

// function that adds new value to array in local storage
function addToStorage(newValue) {
  var searchedCities = JSON.parse(localStorage.getItem("searched"));
  if (searchedCities.includes(newValue)) {
    return;
  }
  searchedCities.push(newValue);
  localStorage.setItem("searched", JSON.stringify(searchedCities));
}

function searchWeather(value) {
  // emptying space for new data to appear
  $("#today").empty();
  $("#forecast").empty();
  var queryUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    value +
    "&appid=b8373b3fe2c318bbddad2464aefa9025";
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // city name
    var cityArea = response.city.name;
    addToStorage(cityArea);
    
    var today = $("#today");
    var forecast = $("#forecast");
    today.css({
      border: "1px solid black",
      padding: "5px",
    });
    today.append(
      "<h2>" +
        response.city.name +
        " " +
        "(" +
        moment().format("MMMM Do YYYY") +
        ")" +
        "</h2>"
    );

    // creating variables for icon, temp, wind, icon and humidity
    var icon = $("<img>");
    var iconUrl =
      "https://openweathermap.org/img/wn/" +
      response.list[0].weather[0].icon +
      ".png";
    icon.attr("src", iconUrl);

    var temperature = Number(response.list[0].main.temp);
    temperature = Math.round(temperature - 273.15);

    var wind = response.list[0].wind.speed;
    var humidity = response.list[0].main.humidity;

    today.append("<h6>" + "Temp: " + temperature + " °C" + "</h6>");
    today.append(icon);
    today.append("<h6>" + "Wind: " + wind + "KPH" + "</h6>");
    today.append("<h6>" + "Humidity: " + humidity + "%" + "</h6>");

    // Forecast area

    // creating array with the next 5 days

    var days = [
      (day1 = response.list[7].dt_txt.split(" ")[0]),
      (day2 = response.list[15].dt_txt.split(" ")[0]),
      (day3 = response.list[23].dt_txt.split(" ")[0]),
      (day4 = response.list[31].dt_txt.split(" ")[0]),
      (day5 = response.list[39].dt_txt.split(" ")[0]),
    ];

    

    for (var i = 0; i < days.length; i++) {
      // the 5 Days Forecast text apepars
      dayBlock = $("<div>");
      dayBlock.css({
        "background-color": "#00416A",
        color: "#FFFFFF",
        padding: "10px",
        border: "solid white",
      });

      var iconForecast = $("<img>");
      var iconForecastUrl = "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png";
      iconForecast.attr("src", iconForecastUrl)

      var temperatureForecast = Number(response.list[i].main.temp);
      temperatureForecast = Math.round(temperatureForecast - 273.15);
      var windForecast = response.list[i].wind.speed;
      var humidityForecast = response.list[i].main.humidity;


      dayBlock.append(days[i]);
      dayBlock.append(iconForecast);
      dayBlock.append(
        "<h6>" + "Temp: " + temperatureForecast + " °C" + "</h6>"
      );
      dayBlock.append("<h6>" + "Wind: " + windForecast + "KPH" + "</h6>");
      dayBlock.append("<h6>" + "Humidity: " + humidityForecast + "%" + "</h6>");

      forecast.append(dayBlock);
    }
  });
}

// when the search button is clicked, function renderButtons runs
$("#search-button").on("click", function (event) {
  event.preventDefault();
  renderButtons();
  var city = $("#search-input").val();
  searchWeather(city);
});

renderButtons();
