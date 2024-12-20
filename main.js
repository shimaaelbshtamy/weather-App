let todayName = document.getElementById("todayName");
let dayNumber = document.getElementById("dayNumber");
let dataMonth = document.getElementById("dataMonth");
let locationDay = document.getElementById("locationDay");
let dayTemp = document.getElementById("dayTemp");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let imgToday = document.getElementById("imgToday");
let customDay = document.getElementById("customDay");
let search = document.getElementById("search");
let windDirection = document.getElementById("windDirection");

let tomorrowData = document.getElementsByClassName("tomorrowData");
let nextDay = document.getElementsByClassName("nextDay");
let nextMainTemp = document.getElementsByClassName("nextMainTemp");
let nextImg = document.getElementsByClassName("nextImg");
let nextTemp = document.getElementsByClassName("nextTemp");
let nexCondition = document.getElementsByClassName("nexCondition");
let menu = document.querySelector("#menu-btn");
let list = document.querySelector(".list");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  list.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  menu.classList.remove("active");
};

let date = new Date();
console.log(date.getDate());

console.log(date.toLocaleDateString("en-US", { weekday: "long" }));
console.log(date.toLocaleDateString("en-US", { month: "long" }));

async function getWeatherData(cityName) {
  // استخدام backticks ` ` بدلاً من ' ' لكي يعمل التوسيع بشكل صحيح
  let weatherResponse = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=f63431aa0565407b96c22553241912&q=${cityName}&days=3`
  );
  let weatherData = await weatherResponse.json();
  console.log(weatherData);
  return weatherData;
}

function displayTodayData(data) {
  if (!data || !data.location || !data.current) {
    console.error("Invalid weather data format:", data);
    return;
  }

  locationDay.innerHTML = data.location.name;
  dayTemp.innerHTML = `${data.current.temp_c}°C`;

  let iconUrl = data.current.condition.icon;
  if (!iconUrl.startsWith("http")) {
    iconUrl = `https:${iconUrl}`;
  }
  let todayDate = new Date();

  todayName.innerHTML = todayDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  dayNumber.innerHTML = todayDate.getDate();
  dataMonth.innerHTML = todayDate.toLocaleDateString("en-US", {
    month: "long",
  });

  imgToday.setAttribute("src", iconUrl);
  customDay.innerHTML = data.current.condition.text;

  humidity.innerHTML = `${data.current.humidity}%`;
  wind.innerHTML = `${data.current.wind_kph} km/h`;
  windDirection.innerHTML = data.current.wind_dir;
}

function displayNextData(data) {
  let forecastData = data.forecast.forecastday;

  if (forecastData && forecastData.length > 1) {
    for (let i = 0; i < 2; i++) {
      if (forecastData[i + 1] && forecastData[i + 1].date) {
        let nexDate = new Date(forecastData[i + 1].date);
        nextDay[i].innerHTML = nexDate.toLocaleDateString("en-US", {
          weekday: "long",
        });
      } else {
        console.error(`Forecast data for day ${i + 1} is missing or invalid.`);
      }
    }
  } else {
    console.error("Not enough forecast data available.");
  }
}

async function startApp(city = "cairo") {
  let weatherData = await getWeatherData(city);
  if (!weatherData.error) {
    displayTodayData(weatherData);
    displayNextData(weatherData);
  }
}

startApp();

search.addEventListener("input", function () {
  startApp(search.value);
});

// function displayNextData(data){
//   let forecastData = data.forecast.forcastday
//   for (let i = 0; i < 2; i++) {
//     nextTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
//     nextMainTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
//     forecastData[i].setAttribute("src",forecastData[i+1].day.condition.icon)
//     nexCondition[i].innerHTML=forecastData[i+1].day.condition.text

//   }
// }
