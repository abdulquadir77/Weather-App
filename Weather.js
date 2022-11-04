document.getElementById("button").addEventListener("click", getData);

async function getData(event) {
  event.preventDefault();
  let city_name = document.getElementById("search").value;
  let forecast_url = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&units=metric&cnt=7&appid=3a6238a3da5d42b99d0ca1f45d0fee6d`;
  let res = await fetch(forecast_url);
  let data = await res.json();
  todayData(data);
  sevenDaysForcast(data);
}

function todayData(data) {
  document.getElementById("temp-data").innerHTML = null;
  let city_name = document.getElementById("search").value;
  let city = document.createElement("h1");
  city.innerText = data.city.name || data.name;

  var img_value = data.list[0].weather[0].icon;
  let img = document.createElement("img");
  img.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" + img_value + "@2x.png"
  );

  let desc = document.createElement("h3");
  desc.innerText = data.list[0].weather[0].description;

  let temp = document.createElement("p");
  temp.innerText = "Temp:" + " " + data.list[0].main.temp;

  let min_temp = document.createElement("p");
  min_temp.innerText =
    "Min Temp:" + " " + data.list[0].main.temp_min + " " + "°C";

  let max_temp = document.createElement("p");
  max_temp.innerText =
    "Max Temp:" + " " + data.list[0].main.temp_max + " " + "°C";

  let wind = document.createElement("p");
  wind.innerText = "Wind Speed:" + " " + data.list[0].wind.speed;

  let sun_rise = document.createElement("p");
  sun_rise.innerText = "Sun Rise:" + " " + data.city.sunrise;

  let sun_set = document.createElement("p");
  sun_set.innerText = "Sun Set:" + " " + data.city.sunset;

  document
    .getElementById("temp-data")
    .append(city, img, desc, temp, min_temp, max_temp, wind, sun_rise, sun_set);

  let x = document.getElementById("gmap_canvas");
  x.src = `https://maps.google.com/maps?q=${
    "champua" || city_name
  }&z=13&ie=UTF8&iwloc=&output=embed`;
}

function sevenDaysForcast(fordata) {
  document.getElementById("s-forecast").innerHTML = "";
  let days = ["Today", "Tomorrow", "Tue", "Wed", "Thr", "Fri", "Sat"];
  let i = 0;
  let date = new Date();
  let getday = date.getDay();

  fordata.list.forEach(function (el) {
    let div = document.createElement("div");
    div.setAttribute("id", "card");

    let daysappend = document.createElement("h1");

    console.log(getday);
    daysappend.innerText = days[i];
    i++;

    let img_value = el.weather[0].icon;
    let icon = document.createElement("img");
    icon.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + img_value + "@2x.png"
    );

    let weather_name = document.createElement("p");
    weather_name.innerText = el.weather[0].main;

    let min_max = document.createElement("p");
    min_max.innerText =
      el.main.temp_min + "°C" + " " + "-" + el.main.temp_max + " " + "°C";

    div.append(daysappend, icon, weather_name, min_max);
    document.getElementById("s-forecast").append(div);
  });
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(success);

  function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    getWeatherOnLocation(crd.latitude, crd.longitude);
  }
}

async function getWeatherOnLocation(lat, lon) {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3a6238a3da5d42b99d0ca1f45d0fee6d`;
  let res = await fetch(url);
  let data = await res.json();
  console.log(data.name);
  //todayData(data.name);
}
