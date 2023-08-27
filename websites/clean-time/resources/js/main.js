window.onload = function () {
	setdate();
};

var t = setInterval(setdate, 1000);
var t = setInterval(getWeather_today, 120000);
var t = setInterval(getWeather_tomorrow, 120000);

var lat;
var lon;
var txt;
var position;

function showPosition(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;

	console.log("Lat:" + lat + " Lon:" + lon);

	getWeather_today();
	getWeather_tomorrow();
}

function getGeolocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
		document.getElementById("button").style.display = "none";
	} else {
		alert("Geolocation is not supported by this browser.");
		console.log("Geolocation is not supported by this browser.");
	}
}

function getWeather_today() {
	var api_adress_today = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=yahaha&units=metric";

	var request = new XMLHttpRequest();

	request.open("GET", api_adress_today, true);

	request.onload = function () {
		var data = JSON.parse(this.response);

		var icon_name_today = data.weather[0].icon;
		var max_temp_today = data.main.temp_max + "°";
		var min_temp_today = data.main.temp_min + "°";

		var icon_url_today = "https://openweathermap.org/img/wn/" + icon_name_today + "@2x.png";

		document.getElementById("weather_icon_today").src = icon_url_today;
		document.getElementById("weather_icon_today").style.display = "block";
		document.getElementById("today").style.display = "block";
		document.getElementById("weather_temp_today_max").innerHTML = max_temp_today;
		document.getElementById("weather_temp_today_min").innerHTML = min_temp_today;
	};

	request.send();
}

function getWeather_tomorrow() {
	var api_adress_tomorrow = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=yahaha&units=metric&cnt=9";

	var request = new XMLHttpRequest();

	request.open("GET", api_adress_tomorrow, true);

	request.onload = function () {
		var data = JSON.parse(this.response);

		var icon_name_tomorrow = data.list[8].weather[0].icon;
		var max_temp_tomorrow = data.list[8].main.temp_max + "°";
		var min_temp_tomorrow = data.list[8].main.temp_min + "°";

		var icon_url_tomorrow = "https://openweathermap.org/img/wn/" + icon_name_tomorrow + "@2x.png";

		document.getElementById("weather_icon_tomorrow").src = icon_url_tomorrow;
		document.getElementById("weather_icon_tomorrow").style.display = "block";
		document.getElementById("tomorrow").style.display = "block";
		document.getElementById("weather_temp_tomorrow_max").innerHTML = max_temp_tomorrow;
		document.getElementById("weather_temp_tomorrow_min").innerHTML = min_temp_tomorrow;
	};

	request.send();
}

function setdate() {
	var today = new Date();

	//var date = today.getDate() + today.getMonth() + today.getFullYear
	//var time = today.getHours() + ":" + today.getMinutes()

	var month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";

	var monthFull = month[today.getMonth()];

	var date = ("0" + today.getDate()).slice(-2) + " " + /*(("0"+(today.getMonth()+1)).slice(-2))*/ monthFull + " " + today.getFullYear();
	var time = ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2);

	document.getElementById("html_date").innerHTML = date;
	document.getElementById("html_time").innerHTML = time;
}
