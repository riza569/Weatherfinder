const cityInput=document.querySelector(".cityInput")
const weatherForm=document.querySelector(".weatherForm")
const card=document.querySelector(".card-container")
const apikey="7b6b43f38e7f87073472b4cd1e33d413";

weatherForm.addEventListener("submit",async event=>{
  event.preventDefault()
  const cityname=cityInput.value;
  if(cityname){
    try{
      const weatherData=await getWeatherData(cityname)
      displayWeatherInfo(weatherData)
    }
    catch(error){
      console.error(error)
      displayErrormessage(error)
    }
  }
  else{
    displayErrormessage("type a proper city")
  }
})

async function getWeatherData(city){
      const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
      const response=await fetch(apiurl)
      if(!response.ok){
          throw new Error("couldn't fetch the city")
      }
      return await response.json()

}


function displayWeatherInfo(data){
    const {name:city,
      main:{temp,humidity},
      weather:[{description,id}]} =data
      card.textContent="";
      card.style.display="flex"
      const cityDisplay=document.createElement("h1")
      const tempdisplay=document.createElement("p")
      const humiditydisplay=document.createElement("p")
      const descdisplay=document.createElement("p")
      const weatheremoji=document.createElement("p")

      cityDisplay.textContent=city;
      cityDisplay.classList.add("cityDisplay")
      card.appendChild(cityDisplay)

      tempdisplay.textContent=`${(temp-273.15).toFixed(1)}`;
      tempdisplay.classList.add("tempDisplay")
      card.appendChild(tempdisplay)

      humiditydisplay.textContent=`Humidity: ${humidity}%`;
      humiditydisplay.classList.add("humidityDisplay")
      card.appendChild(humiditydisplay)
      
      descdisplay.textContent=description;
      descdisplay.classList.add("descDisplay")
      card.appendChild(descdisplay)

      weatheremoji.textContent=getWeatheremoji(id)
      weatheremoji.classList.add("imgDisplay")
      card.appendChild(weatheremoji)


}

function getWeatheremoji(weatherid){
  switch(true){
    case (weatherid>=200 && weatherid<300):
      return "⛈";

    case (weatherid>=300 && weatherid<400):
      return "⛈";

    case (weatherid>=500 && weatherid<600):
      return "⛈";

    case (weatherid>=600 && weatherid<700):
      return "🌨";

    case (weatherid>=700 && weatherid<800):
      return "💨";

    case (weatherid===800):
      return "☀";

    case (weatherid>=801 && weatherid<810):
      return "☁";

    default:
      return "🥱"
  }

}
function displayErrormessage(message){
    const error=document.createElement("p")
    error.textContent=message
    error.classList.add("errorDisplay")
    card.textContent=""
    card.style.display="flex"
    card.appendChild(error)
}




