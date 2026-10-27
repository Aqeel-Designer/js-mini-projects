const weatherForm = document.querySelector(".weatherForm");      //we are using classes so we have used querselector
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
weatherBackground.src = "/Day8/videos/default2.mp4";
const apiKey = "3093e5c7e45e6a4607e251a45a63c0f9";

weatherForm.addEventListener("submit", async event =>{            //the event is submit because we used form in html , submit gives form the data , we made this function async becuase we have to use await when we call the get weatherdata function
    event.preventDefault();    //forms have a default method to reload when submitted, so we use this to prevent that

    const city = cityInput.value.toLowerCase().trim();   //get the city from the form
    if(city){
        try{
            const weatherdata = await getWeatherData(city);  //we use await here because we have to wait till we get the data (city) from the getweatherdata function
            displayWeatherInfo(weatherdata);    //we call this to display weather info after successfully getting the data
        }
        catch(error){
            console.error(error);
            displayErrorMessage(error);
        }
    }
    else {
        displayErrorMessage("Please enter a City Name");    //if no city use this error message(gets argument from the function at the end)
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    console.log(response);
    return await response.json();    //if no error , return the json format object, this data will go to the event listener as it is getting the city
}

function displayWeatherInfo(data){        //data is a json file
    const {name: city , main: {temp,humidity}, weather:[{description , id}] } = data  //this is object destructuring, we are doing it to get the desired data from the JSON robject returned from the API
    changeBackground(id);
    card.textContent = "";  //reset the card data
    card.style.display = "flex";

    const CityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    CityDisplay.textContent = city;
    CityDisplay.classList.add("CityDisplay");

    tempDisplay.textContent = `${temp.toFixed(1)}°C`;;
    tempDisplay.classList.add("tempDisplay");

    humidityDisplay.textContent = `Humidity: ${humidity}`;
    humidityDisplay.classList.add("humidityDisplay");

    descDisplay.textContent = description;
    descDisplay.classList.add("descDisplay");

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji");

    card.append(CityDisplay);  //adding to card
    card.append(tempDisplay);
    card.append(humidityDisplay);
    card.append(descDisplay);
    card.append(weatherEmoji);

}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >=200 && weatherId <300) :
            return "⛈️";
        case (weatherId >=300 && weatherId <400) :
            return "🌧️";
        case (weatherId >=500 && weatherId <600) :
            return "☁️";
        case (weatherId >=600 && weatherId <700) :
            return "❄️";
        case (weatherId >=700 && weatherId <800) :
            return "🌫️";
        case (weatherId === 800) :
            return "☀️";
        case (weatherId >=801 && weatherId <810) :
            return "⛅";
        default :
            return "❓";
    }
}

function changeBackground(weatherId) {

    let backgroundVideo = "";

    switch (true) {
        // Thunderstorm
        case weatherId >= 200 && weatherId < 300:
            backgroundVideo = "/Day8/videos/thunderstorm.mp4";
            break;
        // Drizzle
        case weatherId >= 300 && weatherId < 400:
            backgroundVideo = "/Day8/videos/drizzle.mp4";
            break;
        // Rain
        case weatherId >= 500 && weatherId < 600:
            backgroundVideo = "/Day8/videos/rain.mp4";
            break;
        // Snow
        case weatherId >= 600 && weatherId < 700:
            backgroundVideo = "/Day8/videos/snow.mp4";
            break;
        // Fog
        case weatherId >= 700 && weatherId < 800:
            backgroundVideo = "/Day8/videos/fog.mp4";
            break;
        // Clear sky
        case weatherId === 800:
            backgroundVideo = "/Day8/videos/sunny1.mp4";
            break;
        // Clouds
        case weatherId >= 801 && weatherId < 810:
            backgroundVideo = "/Day8/videos/cloudy.mp4";
            break;

        default:
            backgroundVideo = "/Day8/videos/default.mp4";
    }


    // Change the video source
    weatherBackground.src = backgroundVideo;

    // Restart the video from the beginning
    weatherBackground.load();
    weatherBackground.play();
}

function displayErrorMessage(message){
    const errormessage = document.createElement("p");    //creates a html p tag for the error message
    errormessage.textContent = message;
    errormessage.classList.add("errorDisplay");             //add a class for css

    card.textContent = "";                          //if there is old card data, make it empty
    card.style.display = "flex";                    //change display from none to flex
    card.appendChild(errormessage);                 //add the error message at the end of card
}