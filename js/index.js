/**
 * Created by zapatacajas on 12/06/2016.
 */
var raining = "https://images.unsplash.com/photo-1444384851176-6e23071c6127?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=d7251085aac491c0719a8a2624e9d42e";
var sunny = "https://images.unsplash.com/photo-1459980874200-cfea332e86ca?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=e07e9d6f4f272e4c0d06a5a2914288cd";
var cloudy = "https://images.unsplash.com/photo-1447523264591-68112eb55c23?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=03edf887ebb77cdda57c035140984778";
var thunderstorm = "https://images.unsplash.com/photo-1447829172150-e5deb8972256?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=8f16ff0419362d842e41375d92ff8cf4";
var snowy = "https://images.unsplash.com/photo-1455156218388-5e61b526818b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=9de134c5ff33f7f0db4c158a96734a36";
var night = "https://images.unsplash.com/photo-1417870839255-a23faa90c6b0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=654492fe9bfa91deeb978ce623d36df2";
var mist = "https://images.unsplash.com/photo-1422198630954-189d8eb6dab3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=15b48db00071a10334b09d289196f02b";
var imgArr = [night, raining, sunny, cloudy, thunderstorm, snowy, mist];

$(document).ready(function() {

  function celToFa(cel) {
    var fa;

    fa = (cel * 1.8) + 32;

    return Math.round(fa);
  }

  function getLatLong() {

    $.getJSON("https://api.unsplash.com/photos/?client_id=54d61cb88ca32dcc2e6da4d41c4652f7d513ce0c91e5b0ba9787fdcec8aae740");

    $.get("http://ipinfo.io/json", function(data) {
      var iploc = data.loc;

      var arrIpLoc = iploc.split(",");
      var latitude = arrIpLoc[0];
      var longitude = arrIpLoc[1];
      console.log(arrIpLoc);

      $.get("https://maps.googleapis.com/maps/api/geocode/json", {
        latlng: iploc
      }, function(dataGoogle) {

        var niceAddress = dataGoogle.results[1].formatted_address;
        console.log(niceAddress);
        $("#niceAddress").html(niceAddress);

        $.get("http://api.openweathermap.org/data/2.5/weather", {
          units: "metric",
          lat: latitude,
          lon: longitude,
          appid: "f97bedad584f3e6e10b7da9b9d815853"
        }, function(dataWeather) {

          if (dataWeather.weather[0].icon === "01n") {
            $('html').css('background-image', 'url(' + imgArr[0] + ')');
          } else if (dataWeather.weather[0].description.toLowerCase().indexOf("cloud") >= 0) {
            $('html').css('background-image', 'url(' + imgArr[3] + ')');

          } else if (dataWeather.weather[0].description.toLowerCase().indexOf("rain") >= 0) {
            $('html').css('background-image', 'url(' + imgArr[1] + ')');

          } else if (dataWeather.weather[0].icon === "01d") {
            $('html').css('background-image', 'url(' + imgArr[2] + ')');

          } else if (dataWeather.weather[0].description.toLowerCase().indexOf("thunderstorm") >= 0) {
            $('html').css('background-image', 'url(' + imgArr[4] + ')');

          } else if (dataWeather.weather[0].description.toLowerCase().indexOf("snow") >= 0) {
            $('html').css('background-image', 'url(' + imgArr[5] + ')');

          } else if (dataWeather.weather[0].description.toLowerCase().indexOf("mist") >= 0) {
            $('html').css('background-image', 'url(' + imgArr[6] + ')');

          } else {
            $('html').css('background-color', 'grey');

          }

          console.log(dataWeather);

          $("#icon").attr("src", "http://openweathermap.org/img/w/" + dataWeather.weather[0].icon + ".png");
          $("#description").text(dataWeather.weather[0].description);
          $("#windSpeed").text("SW " + dataWeather.wind.speed + " Knots");
          $("#tempC").text(Math.round(dataWeather.main.temp) + " C°");
          var far = celToFa(dataWeather.main.temp);
          $("#tempF").text(far + " F°");

        });

      });

    });

  }

  getLatLong();

  $("#converter").on("click", function() {

    $(this).text(function(i, text) {
      return text === "Change to Fahrenheit" ? "Change to Celsius" : "Change to Fahrenheit";
    });

    $(".temperature").toggle("slow");

  });

});