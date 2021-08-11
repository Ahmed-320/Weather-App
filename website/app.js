/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
const tempUnit = 'metric';
let unitSympol = '';
const apiKey = `795cc34f309b2734662e732ed8f508cd&units=${tempUnit}`;

// unit check switch
switch(tempUnit){
    case 'metric':
        unitSympol = '°C';
        break;
    case 'imperial':
        unitSympol = '°F';
        break;
    default:
        unitSympol = 'K';
        break;
}

// html element variables
const submitBtn = document.getElementById('generate');
const temperature = document.getElementById('temp');
const date = document.getElementById('date');
const content = document.getElementById('content');
const cityName = document.getElementById('city');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

// get request to fetch weather data
const postData = async (baseURL, zipCode, countryCode, apiKey)=>{
    const response = await fetch(`${baseURL}zip=${zipCode},${countryCode}&appid=${apiKey}`);
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

// post request to send weather and user data to server
const sendData = async (url = '', data ={})=>{
    const response = await fetch(url, {
        method : 'POST',
        credentials : 'same-origin',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    });
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

// get request to return data from server
const returnData = async (url = '')=>{
    const response = await fetch(url);
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

// event listener for Generate button
submitBtn.addEventListener('click', ()=>{
    const countryCode = document.getElementById('countryCode').value;
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    postData(baseURL, zipCode, countryCode, apiKey)
    .then(data =>{
        sendData('/sendData', {temp:data.main.temp, date:newDate, feelings:feelings, cityName:data.name});
        uiUpdate();
    });
    
});

// update UI function
function uiUpdate(){
    returnData('/returnData')
    .then(data=>{
        temperature.innerHTML = `Temperature : ${data['projectData'].temp} ${unitSympol}`;
        date.innerHTML = `Today is : ${data['projectData'].date}`;
        content.innerHTML = `You are feeling : 
                                ${data['projectData'].feelings}`;
        cityName.innerHTML = `City : ${data['projectData'].cityName}`;
    });
}
