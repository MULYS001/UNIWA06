
// API Key
var apiKey = "1458a78571c3d5ce768b8669f729341f";
var searchTerm = $("#search-term");
var searchEl = $("#searchBtn");

//on click event for search button
$("input");
searchEl.on("click", function (event) {
  event.preventDefault();
  searchTerm = $(this).val();
  console.log(searchTerm)
})




console.log(searchTerm)
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + "Hong Kong" + "&appid=" + apiKey + "&units=metric";

function currentWeather(){
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  console.log(response)

  // City Name
  var currentCity = (response.name);
  console.log("City: " + currentCity)

  // Date
  var date = moment().format("DD/MM/YYYY");
  console.log("Date: " + date)


  var dateField = new Date(response.dt * 1000);
  console.log(dateField)
  // Temperature
  var temp = (response.main.temp).toFixed(2);
  console.log("Temperature: " + temp)

  // Humiditiy  
  var humid = (response.main.humidity);
  console.log("Humidity: " + humid)

  // Wind speed 
  var wind = (response.wind.speed);
  console.log("Wind Speed: " + wind)


  // Icon representing weather conditions  
  var icon = (response.weather[0].icon);
  var weatherIcon = $("<img>");
  weatherIcon.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
  weatherIcon.attr("alt", "Weather conditions");


  // writing to display
  $("#cityName").prepend(currentCity + " (" + date + ")");
  $("#cityName").append(weatherIcon);
  $("#todayTemp").append("Temperature: " + temp + " ℃");
  $("#todayHumid").append("Humidity: " + humid);
  $("#todayWind").append("Wind Speed: " + wind + " kph");



  function uvIndexRating() {
    // UV Index- when viewing shows a colour that indicates fav, mod or severe
    var lat = (response.coord.lat);
    var long = (response.coord.lon);
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?" + "&lat=" + lat + "&lon=" + long + "&appid=" + apiKey;

    $.ajax({
      url: uvURL,
      type: "GET"

    }).then(function (response) {
      let uvIndexEl = (response.value)
      console.log(uvIndexEl)

      $("#todayUV").append("UV Index: " + uvIndexEl)

      // setting colour of UV Index
      function indexColor() {
       
        if (uvIndexEl >0 && uvIndexEl < 3) {
          $("#todayUV").addClass("low");
        }
        else if (uvIndexEl > 2.99 && uvIndexEl < 6 ) {
          $("#todayUV").addClass("moderate");
        }
        else if (uvIndexEl > 5.99 && uvIndexEl < 8) {
          $("#todayUV").addClass("high");
        }
        else if (uvIndexEl > 8)
          $("#todayUV").addClass("very-high");
      }
      indexColor();
    })

  }
  uvIndexRating();

})
}
currentWeather();


// UV Index - when viewing shows a colour that indicates fav, mod or severe