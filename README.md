# 06 Server-Side APIs: Weather Dashboard

#### https://mulys001.github.io/Weather-Dashboard

Developers are often tasked with retrieving data from another application's API and using it in the context of their own. 
Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. 

My challenge was to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

For this development project I used a combination of html and javascript, utilising JQuery and Moment.js script libraries
and Bootstrap and fontawesome for styling.

To fetch the weather details I used openweather.api, with several api calls for the required details to be populated.
[Note - API key has been published for marking purposes and will be removed once marked]

#### My Weather Dashboard:
![Weather_Dashboard](assets/Weather-1.jpg)

## User Story
```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria
```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast


```
