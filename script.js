let inputEle = document.getElementById("location");
let tempEle = document.getElementById("temp-value");
let locEle = document.getElementById("locate");
let weatherdesc = document.getElementById("weather-desc");
let btnEle = document.getElementById("btn");
let icon = document.getElementById("icon");

const apiKey = "1c4c32449f23544d7c456a9444047863";

function getIconName(weatherDesc) {
  const desc = weatherDesc.toLowerCase();
  if (desc.includes("clear")) return "clear_day";
  if (desc.includes("cloud")) return "cloud";
  if (desc.includes("rain")) return "rainy";
  if (desc.includes("snow")) return "ac_unit";
  if (desc.includes("storm") || desc.includes("thunder")) return "thunderstorm";
  if (desc.includes("mist") || desc.includes("fog")) return "foggy";
  return "weather_partly_cloudy"; // default fallback
}


btnEle.onclick = function () {
  if (inputEle.value.trim() === "") {
    alert("Please enter some location");
  } else {
    let loc = inputEle.value.trim();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Location not found");
        }
        return res.json();
      })
      .then((data) => {
        const { name } = data;
        const { feels_like } = data.main;
        const { description } = data.weather[0];

        // Update text values
        tempEle.innerHTML = `<span>${Math.floor(feels_like)}</span><span>&#176;</span><span>C</span>`;
        locEle.innerText = name;
        weatherdesc.innerText = description;

        // ✅ Update icon based on weather description
        const iconName = getIconName(description);
        icon.textContent = iconName;

     const timezoneOffset = data.timezone; // seconds
        const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        const localTime = new Date(utc + 1000 * timezoneOffset);

        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day = days[localTime.getDay()];
        const date = localTime.toLocaleDateString();
        const time = localTime.toLocaleTimeString();

        document.getElementById("datetime").innerText = `${day}, ${date} ${time}`;

      })
      .catch(() => {
        alert("Enter a valid location");
      });

    inputEle.value = "";
  }
};


