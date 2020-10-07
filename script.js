
// API Key and search variables
var apiKey = "1458a78571c3d5ce768b8669f729341f";
var searchEl = $("#searchBtn");
var searchedCities = [];

//on click event for search button --------------------//
searchEl.on("click", function (event) {
  event.preventDefault();
  var searchTerm = $("#search-term").val();
  searchedCities.push(searchTerm);
  currentWeather(searchTerm);
  refreshHistory();
})

// Function to refresh history and append as buttons on screen ------------------------------//
function refreshHistory() {
  $("#searchedCities").html("");
  for (s = 0; s < searchedCities.length; s++) {
    var newButton = $("<button>").attr("style", "width: 60%; margin: 2px; text-align: left;");
    $("#searchedCities").append(newButton);
    $("#searchedCities").append($("<br>"));
    newButton.text(searchedCities[s]);
    newButton.click(function () {
      currentWeather($(this).text());
    });
  }; 
}

$(document).ready(function () {
  refreshHistory();
});
//----------------------------------------------------------------------------------------//
// Function to get weather forecast 
function currentWeather(city) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric"

  // Ajax call to return values for weather forecast
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    // Variables 
    var currentCity = (response.name);
    var date = moment().format("DD/MM/YYYY");
    var temp = (response.main.temp).toFixed(2);
    var humid = (response.main.humidity);
    var wind = (response.wind.speed);

    // Icon representing weather conditions  
    var icon = (response.weather[0].icon);
    var weatherIcon = $("<img>");
    weatherIcon.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
    weatherIcon.attr("alt", "Weather conditions");

    function renderMain() {// writing to display
      $("#cityName").empty().prepend(currentCity + " (" + date + ")").append(weatherIcon);;
      $("#todayTemp").empty().append("Temperature: " + temp + " ℃");
      $("#todayHumid").empty().append("Humidity: " + humid + " %");
      $("#todayWind").empty().append("Wind Speed: " + wind + " m/sec");
    }
    // Function for UV Index- when viewing shows a colour that indicates fav, mod or severe, and for 5 day forecast -------//
    function uvIndexRating() {
      var lat = (response.coord.lat);
      var long = (response.coord.lon);
      var uvURL = "https://api.openweathermap.org/data/2.5/uvi?" + "&lat=" + lat + "&lon=" + long + "&appid=" + apiKey;
      var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long
        + "&exclude=current,minutely,hourly,alerts" + "&units=metric" + "&appid=" + apiKey + "&results=5";

      //  ajax call for UV Index
      $.ajax({
        url: uvURL,
        type: "GET"

      }).then(function (response) {
        let uvIndexEl = (response.value)

        $("#todayUV").empty().removeClass();
        $("#todayUV").append(uvIndexEl)

        // setting colour of UV Index
        function indexColor() {
          if (uvIndexEl > 0 && uvIndexEl <= 2.99) {
            $("#todayUV").addClass("low");
          }
          else if (uvIndexEl > 3 && uvIndexEl <= 5.99) {
            $("#todayUV").addClass("moderate");
          }
          else if (uvIndexEl > 6 && uvIndexEl <= 7.99) {
            $("#todayUV").addClass("high");
          }
          else if (uvIndexEl > 8)
            $("#todayUV").addClass("very-high");
        }
        indexColor();
      }) //------------------------------------------------------------------------------------------------------------------------//

      // ajax call for 5 day forecast ---------------------------------//
      $.ajax({
        url: forecastURL,
        method: "GET"
      }).then(function (response) {

        // function to set 5 day forecast 
        function forecast() {
          for (var i = 1; i < 6; i++) {

            forecastDay = $("#" + i);
            forecastDay.empty()
            //  forecast date
            var dateField = response.daily[i].dt * 1000;
            var simpleDate = moment(dateField).format("DD/MM/YYYY");
            forecastDay.append(simpleDate + "</br>").attr("bold");

            // weather icon
            var icon = (response.daily[i].weather[0].icon);
            var weatherIcon = $("<img>");
            weatherIcon.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
            weatherIcon.attr("alt", "Weather conditions");
            forecastDay.append(weatherIcon);

            // temperature
            var forecastMax = response.daily[i].temp.max;
            var forecastMin = response.daily[i].temp.min;
            forecastDay.append("</br>" + "Max: " + forecastMax + "</br>");
            forecastDay.append("Min: " + forecastMin + "</br>");

            // humidity
            var forecastHumid = response.daily[i].humidity;
            forecastDay.append("Humidity: " + forecastHumid + "%" + "</br>");
          }
        } forecast()
      });
      //-------------------------------------------------------------//
    }
    uvIndexRating();
    renderMain();

  });
}